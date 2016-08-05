var mysql = require('mysql');
var FB = require('fb');
var timeZone = require('./timezone.js');
var schedule = require('node-schedule');

var dt = timeZone.getTimeZone(8);
var strdate1 = dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate() + " " + dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
var connection = mysql.createConnection({
    host: 'us-cdbr-azure-west-c.cloudapp.net',
    user: 'b90ac6e941f130',
    password: '39fdabee',
    database: 'facebook_bots_sql'
});

// let sql = "SELECT * FROM `pofeed` WHERE `po_time`='"+strdate1+"'";
// var sql = "UPDATE `pofeed` SET `content`='success' WHERE `po_time`<='" + strdate1 + "'";
// console.log(sql);
// connection.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log('changed ' + result.changedRows + ' rows');
// });

var sql = "SELECT * FROM `pofeed` WHERE `po_time`<='" + strdate1 + "'";
connection.query(sql, function (err, rows, fields) {
    if (err) throw err;
    for (var i = 0; i < rows.length; i++) {
        console.log(rows[i].FB_id + ' ' + rows[i].token);
    }
    // console.log('The solution is: ', rows[0].solution);
});

connection.end(function (err) {
    if (err) {
        console.log('connection closed.');
    }
});