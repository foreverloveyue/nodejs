let express=require('express');
// 解析post的中间件
let bodyParser=require('body-parser');
// session
let session=require('express-session');
let app=express();
app.listen(3000);
//模板引擎
app.set('view engine','xtpl');
//模板目录
app.set('views','./views');
//静态资源
app.use(express.static('./public'));

// 解析post数据的中间件
app.use(bodyParser.urlencoded({extended:false}));

// 处理session的中间件
app.use(session({
    secret:'yanzi',
    resave:false,
    saveUninitialized:false
}));

app.use('/admin',(req,res,next)=>{
    if(!req.session.loginfo&&req.url!='/login'){
          return res.redirect('/login');
    }
    next();
})

let admin = require('./routes/admin');
let home = require('./routes/home');

app.use('/admin', admin);

app.use('/', home);
