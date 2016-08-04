const mysql = require('./dbcon.js');
const timeZone = require('./timezone.js');

setInterval(function () {
    console.log('The answer to life, the universe, and everything!');
    let dt = timeZone.getTimeZone(8);
    let strdate1 = dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate() + " " + dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();

    let dt2 = new Date();
    dt2.setTime(dt.getTime() + 1000 * 60);
    let strdate2 = dt2.getFullYear() + "-" + (dt2.getMonth() + 1) + "-" + dt2.getDate() + " " + dt2.getHours() + ":" + dt.getMinutes() + ":" + dt2.getSeconds();
    console.log(strdate1);
    console.log(strdate2);
    // let sql = "SELECT * FROM `pofeed` WHERE `po_time`='"+strdate1+"'";
    let sql = "UPDATE `pofeed` SET `content`='success' WHERE `po_time`>='" + strdate1 + "' AND `po_time`<='" + strdate2 + "'";
    mysql.getUpdate(sql);
}, 1000 * 60);