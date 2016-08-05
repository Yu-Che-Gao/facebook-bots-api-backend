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

        FB.setAccessToken('EAACEdEose0cBABLU7p2kCzyBMVrA7bsT7hcHd6ZArgSTWjFZBaKYM23ojVzToyuj6kOLRPlcoftPjZAssdU0dpId0G4ZA8OmQYFZAzLe0xeJQ4Nq0dvf85hvQB8ZAkLxZAeStZCcUUtK0mmNDsHiJAWzTGhBtXNg63Wq3OU8ZAh2U4QZDZD');
        FB.api('me/feed', 'post', { message: myMessage }, function (response) {
            if (!response || response.error) {
                console.log(!response ? 'error occurred' : response.error);
                return;
            }

            console.log('already publish, Post Id: ' + response.id);
            connection.query("DELETE FROM `pofeed` WHERE `id`='" + rows[i].id + "'", function (err, result) {
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