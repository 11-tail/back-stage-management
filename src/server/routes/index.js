 var express = require('express');
 var bodyParser = require('body-parser');
 var router = express.Router();
 var db=require('../public/js/base.js');
 var token=require('../libs/token.js');
/* GET home page. */
router.post('/',bodyParser.urlencoded({ extended: false }),async (req,res)=>{
    console.log(req)
  let {name,password} = req.body;
  password = isNaN(password) ? password : password*1;//一定要转为数字
  let data;
  try{
      data=await db.find('user',{name,password});//获取所有商品信息
  }catch(err){
      data=err;
  }
  res.send({
      data,
      token:token.createToken({
        name,
        password
      },60)
    });
});

router.post('/autoLogin',async(req,res,next)=>{
    
   
    res.send({
        status:token.checkToken(req.headers.token)
    })
})
 module.exports = router;
