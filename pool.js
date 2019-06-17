//创建mysql连接池
const mysql = require('mysql');
var pool = mysql.createPool({
  host: 'swlixjwdqiss.mysql.sae.sina.com.cn',
  user: 'root',
  password: '123456',
  port: '10324',
  database: 'bigwork',
  connectionLimit: 10
});
module.exports = pool;




