var express = require('express');
var router = express.Router();

var db = require('../config/db');
var sql = require('mssql');

var result;

/* GET home page. */
router.get('/', function (req, res, next) {

  sql.connect(db, function (err) {
    if (err)
      console.log(err);

    var request = new sql.Request();
    request.query("select * from UserList", function (err, result) {

      if (err) {
        console.log(err)
        res.send(err);
      }
      // var rowsCount = result.rowsAffected;
      sql.close();
      res.render('index', {
        route: 'home',
        data: result.recordset
      });

    }); // request.query
  }); // sql.conn
}); // get /


/* GET Edit page. */
router.get('/edit/:id/', function (req, res, next) {

  sql.connect(db, function (err) {
    if (err)
      console.log(err);

    var request = new sql.Request();
    request.input('id', sql.Int, req.params.id)
    request.query("select * from UserList where id=@id", function (err, result) {

      if (err) {
        console.log(err)
        res.send(err);
      }
      // var rowsCount = result.rowsAffected;
      sql.close();
      res.render('edit', {
        route: 'edit',
        data: result.recordset[0]
      });

    }); // request.query
  }); // sql.conn
});


/* POST Edit page. */
router.post('/update', function (req, res, next) {

  sql.connect(db, function (err) {
    if (err)
      console.log(err);

    var request = new sql.Request();
    request.input('id', sql.Int, req.body.id)
      .input('username', sql.NVarChar(50), req.body.username)
      .input('pwd', sql.NVarChar(50), req.body.pwd)
      .input('email', sql.NVarChar(50), req.body.email)
      .query('update UserList set username=@username,pwd=@pwd,email=@email where id=@id', function (err, result) {

        if (err) {
          console.log(err);
          res.send(err);
        }
        sql.close();
        res.redirect('/');
      });
  });
});

/* GET Add page. */
router.get('/add', function (req, res, next) {
  res.render('add', {
    route: 'add',
  });
});


/* POST Add page. */
router.post('/add', function (req, res, next) {

  sql.connect(db, function (err) {
    if (err)
      console.log(err);

    var request = new sql.Request();
    request.input('userid', sql.NVarChar(50), req.body.userid)
      .input('pwd', sql.NVarChar(50), req.body.pwd)
      .input('username', sql.NVarChar(50), req.body.username)
      .input('email', sql.NVarChar(50), req.body.email)
      .query('insert into UserList (userid, pwd, username, email) values (@userid, @pwd, @username, @email)', function (err, result) {

        if (err) {
          console.log(err);
          res.send(err);
        }
        sql.close();
        res.redirect('/');
      });
  });
});

/* GET Delete page. */
router.get('/delete/:id', function (req, res, next) {

  sql.connect(db, function (err) {
    if (err)
      console.log(err);

    var request = new sql.Request();
    request.input('id', sql.Int, req.params.id)
      .query('delete from UserList where id=@id', function (err, result) {

        if (err) {
          console.log(err);
          res.send(err);
        }
        sql.close();
        res.redirect('/');
      });
  });
});
module.exports = router;