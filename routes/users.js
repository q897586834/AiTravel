const express = require("express");
const router = express.Router();
const pool = require("../pool");

router.post("/check", (req, res) => {
  var uname = req.body.uname;
  var upwd = req.body.upwd;
  var upwdconfirm = req.body.upwdconfirm;
  var sql = 'SELECT uname FROM user where uname=?';
  pool.query(sql, [uname], (err, result) => {
    if (result.length > 0) {
      res.send("-1");
    } else if (!uname) {
      res.send("-2");
    } else if (!upwd) {
      res.send("-3")
    } else if(upwdconfirm!=upwd){
      res.send("-4");
    }else if (result.length == 0) {
      res.send("1");
    }
  });
})
  router.post("/go", (req, res) => {
    var obj = req.body;
    var uname = obj.uname;
    var upwd = obj.upwd;
    console.log(uname);
    var sql = 'INSERT INTO user VALUES(NULL,?,?,NULL,NULL,NULL,NULL)';
    pool.query(sql, [uname, upwd], (err, result) => {
      if (err) throw err;
      res.send(`<script>location.href='http://travel.applinzi.com/user_login.html'</script>`);
    });
  })

  router.post("/signin",(req,res)=>{
    var {uname,upwd}=req.body;
    var sql="select * from user where uname=? and upwd=?";
    pool.query(sql,[uname,upwd],(err,result)=>{
      if(err) console.log(err);
      res.writeHead(200,{
        "Content-Type":"application/json;charset=utf-8"
      });
      if(result.length>0){
        req.session.uid=result[0].uid;
      //  uid=result[0].uid;
        console.log("登录成功session"+req.session.uid);
       res.write(JSON.stringify({ok:1}))
      // res.write(JSON.stringify({ok:1,uid:uid}))
      }else
        res.write(JSON.stringify({
          ok:0, msg:"用户名或密码错误"
        }))
      res.end();
    })
  })
  // router.get("/islogin",(req,res)=>{
  //  console.log("检查session"+req.session.uid);
  //   if(req.session.uid!==undefined){
  //     var uid=req.session.uid;
  //     var sql="select * from user where uid=?";
  //     pool.query(sql,[uid],(err,result)=>{
  //       if(err) console.log(err);
  //       res.send({ok:1,uname:result[0].uname,uid:uid})
  //     })
  //   }else{
  //     res.send({ok:0})
  //   }
  // })
  // router.get("/signout",(req,res)=>{
  //  req.session.uid=undefined;
  //  res.send();
  // })
  router.get("/search",(req,res)=>{
    var uname=req.query.uname;
    var sql = " select uname,user_name,phone,address from user where uname=?";
    
    pool.query(sql,[uname],(err,result)=>{
        if(err)throw err;
        res.send({code:1,msg:result});
    })
})
router.post("/update",(req,res)=>{
  var uname=req.body.uname;//新闻编号
  var user_name=req.body.user_name;
  var phone=req.body.phone;
  var address=req.body.address;
  console.log(req.body);
  console.log(address);
  var sql = " UPDATE user SET user_name = ?,phone=?,address=? WHERE uname = ?";
  pool.query(sql,[user_name,phone,address,uname],(err,result)=>{
      if(err)
      throw err;
      console.log()
      if(result.affectedRows>0){
          res.send({code:1,msg:"添加成功"});
      }else{
        res.send({code:-1,msg:"添加失败"});
      }  
  })
})
module.exports = router;