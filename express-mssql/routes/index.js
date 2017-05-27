var express = require('express');
var router = express.Router();

var db = require('../config/db');
var sql = require('mssql');

var result;

/* GET home page. */
router.get('/', function (req, res, next) {

  sql
    .connect(db, function (err) {

      if (err)
        console.log(err);

      var request = new sql.Request();
      request.query("select * from UserList", function (err, result) {

        if (err) {
          console.log(err)
          res.send(err);
        }
        // var rowsCount = result.rowsAffected;
        sql.close()
        res.render('index', {
          title: 'Express With MSSQL',
          data: result.recordset
        });

      }); // request.query
    }); // sql.conn
}); // get /

module.exports = router;