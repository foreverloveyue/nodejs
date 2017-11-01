let mysql=require('mysql');
// md5加密
let md5=require('md5');
let db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123',
    database:'blog'
})
db.md5=md5;
module.exports=db;
