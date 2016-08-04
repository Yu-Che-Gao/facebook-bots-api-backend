const mysql = require('mysql');

function getConn() {
  let db = mysql.createConnection({
    host: 'us-cdbr-azure-west-c.cloudapp.net',
    user: 'b90ac6e941f130',
    password: '39fdabee',
    database: 'facebook_bots_sql',
    port: 3306
  });

  db.connect();

  console.log("dbconn start.");

  return db;
}

function getQuery(sql) {
  let db = getConn();

  db.query(sql, function (err, results) {
    if (err) {
      console.log("mysql getQuery error");
    } else {
      console.log(results);
    }

  });

  db.end();
}

function getInsert(sql) {
  let db = getConn();

  db.query(sql, function (err) {
    if (err) {
      console.log("mysql getInsert error");
      console.log(err);
    }
  });

  db.end();
}

function getUpdate(sql) {
  let db = getConn();

  db.query(sql, function (err) {
    if (err) {
      console.log("mysql getUpdate error");
    }
  });

  db.end();
}

function getDelete(sql) {
  let db = getConn();

  db.query(sql, function (err) {
    if (err) {
      console.log("mysql getDelete error");
    }
  });

  db.end();
}

exports.getQuery = getQuery;
exports.getInsert = getInsert;
exports.getUpdate = getUpdate;
exports.getDelete = getDelete;