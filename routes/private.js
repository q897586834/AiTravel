const express=require("express");
const router=express.Router();
const pool=require("../pool");

router.post("/go", (req, res) => {
        var obj = req.body;
        var name = obj.name;
        var count = obj.count;
        var phone = obj.phone;
        var money = obj.money;
        var email = obj.email;
        var data = obj.data;
        var destination = obj.destination;
        var day = obj.day;
        var remarks = obj.remarks;
        var message = obj.message;
         var sql="INSERT INTO `bigwork`.`dingzhi` (`id`,`name`, `count`, `phone`, `money`, `email`, `data`, `destination`, `day`, `remarks`, `message`) VALUES (NULL,?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
        pool.query(sql,[name,count,phone,money,email,data,destination,day,remarks,message],(err,result)=>{
          if(err) console.log(err);
          res.send("<script>alert('提交成功!');location.href='http://travel.applinzi.com/private.html'</script>")
        })
})

module.exports=router;