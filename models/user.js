let db = require('./db');
// 插入用户
exports.insert = function (data, cb) {
    let query = 'insert into users set ?';
    // 密文处理
    data.pass = db.md5(data.pass);
    db.query(query, data, (err) => {
        if (err) {
            return cb(err);
        }
        //没有错误
        cb(null);
    });
}
//验证登录
exports.auth = function (email, password, cb) {
    let query = 'select * from users where email=?';
    db.query(query, email, (err, rows) => {
        if (err) {
            return cb(err);
        }
        // console.log(rows);
        if (rows[0].pass == db.md5(password)) {
            return cb(null, rows[0]);
        }
        //登录失败
        cb({
            msg: '用户或密码错误！'
        });
    })
}
exports.find = (id, cb) => {

    let query = 'select * from users where id = ?';

    db.query(query, id, (err, rows) => {
        if (err) {
            return cb(err);
        }
        cb(null, rows);
    })
}

exports.update = function (id, data, cb) {
    let query = 'update users set ? where id = ?';
    db.query(query, [data, id], (err) => {
        if (err) {
            return cb(err);
        }

        cb(null);
    })
}