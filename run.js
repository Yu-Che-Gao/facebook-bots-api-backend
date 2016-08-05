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
        var myToken = rows[i].token;
        var myMessage = rows[i].content;

        FB.setAccessToken('EAACEdEose0cBAFN0OFCZCF8oVfP0p7huhEz2peXcZC6xTRZBKb3Ea9aYd8QCqZAB4tz6hpRZC8vGMM3ynMZBUknZCIQDy0wNIzjCZBQ2XSlE5pJREsAdMI90iZBgME0j9rmOZCgtZBkAbwGiwvZB7eNqUZAYxQcsmHE2iyOtE6XYzifJfegZDZD');
        FB.api('me/feed', 'post', { message: myMessage }, function (response) {
            if (!response || response.error) {
                console.log(!response ? 'error occurred' : response.error);
                return;
            }
            console.log('Post Id: ' + response.id);
        });
    }
});

connection.end(function (err) {
    if (err) {
        console.log('connection closed error.');
    }
});