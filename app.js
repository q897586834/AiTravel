//使用express构建web服务器 --11:25
const express = require('express');
const bodyParser = require('body-parser');
const session=require("express-session");
const cors=require("cors");
/*引入路由模块*/
const index=require("./routes/index");
const details=require("./routes/details");
const products=require("./routes/products");
const users=require("./routes/users");
const private=require("./routes/private");
const comment=require("./routes/comment");
var app = express();
app.use(cors({
    origin:["http://127.0.0.1:3001"],
    credentials:true
}))
//var server = app.listen(3000);
app.listen(process.env.PORT || 5050)

//使用body-parser中间件
app.use(bodyParser.urlencoded({extended:false}));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
}))

//托管静态资源到public目录下
app.use(express.static(__dirname+'/public'));
/*使用路由器来管理路由*/
app.use("/index",index);
app.use("/details",details);
app.use("/products",products);
app.use("/users",users);
app.use("/private",private);
app.use("/comment",comment);
               //.get("/")
//http://localhost:3000/index/

