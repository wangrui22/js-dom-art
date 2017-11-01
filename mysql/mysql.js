var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '6ckj1s',
    database: 'med_img_cache_db'
});
connection.connect();
connection.query('Select * from img_tbl', function(err, res, fields) {
    if(err) {
        console.log(err);
        throw err;
    }
    for (var i = 0; i< res.length; ++i) {
        console.log(res[i]);
    }
});