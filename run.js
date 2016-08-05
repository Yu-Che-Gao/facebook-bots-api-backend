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

var sql = "SELECT * FROM `pofeed` WHERE `po_time`<='" + strdate1 + "'";
connection.query(sql, function (err, rows, fields) {
    if (err) throw err;
    for (var i = 0; i < rows.length; i++) {
        console.log(rows[i].FB_id + ' ' + rows[i].token);
        var myID = rows[i].id;
        var myToken = rows[i].token;
        var myMessage = rows[i].content;

        FB.setAccessToken('EAACEdEose0cBAEAbihM1LA98iU1mGJ2v1hAr3mdQBv5jnNVGD7zXXVUQc3DX10xrs18qPE7mfIkqPQTPZCo6Qno6EydG5AtW7Elhw09RmwJlZA1nKvzlF76UK7azfnAw1f1YHTZCwmVJOQFfAmVIf2MfYJbL6NQJGDg7GUQSgZDZD');
        FB.api('me/feed', 'post', { message: myMessage }, function (response) {
            if (!response || response.error) {
                console.log(!response ? 'error occurred' : response.error);
                return;
            }

            console.log('already publish, Post Id: ' + response.id);
            connection.query("DELETE FROM `pofeed` WHERE `id`='" + myID + "'", function (err, result) {
                if (err) throw err;
                console.log('deleted ' + result.affectedRows + ' rows');
            });
        });
    }
});

connection.end(function (err) {
    if (err) {
        console.log('connection closed error.');
    }
});