"use strict";

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

//WF3Xhi73BH6dXiOr
//mavoiem
var express = require('express');

var mongoose = require('mongoose');

var cors = require('cors');

var RegisterModel = require('./API/Register');

var cookieParser = require('cookie-parser');

var UserDetailModal = require('./API/UserDetail'); //post


var authRoute = require('./routes/auth');

var app = express(); //get

var userRoute = require('./routes/user');

app.use(express.json());
app.use(cors());
app.use(cookieParser()); //connect

mongoose.connect('mongodb+srv://mavoiem:WF3Xhi73BH6dXiOr@cap2api.evksd.mongodb.net/Cap2API?retryWrites=true&w=majority'); //authentication

app.post('/register', function (req, res) {
  RegisterModel.create(req.body).then(function (regis) {
    return res.json(regis);
  })["catch"](function (err) {
    return res.json(err);
  });
});
app.post('/login', function (req, res) {
  var _req$body = req.body,
      username = _req$body.username,
      password = _req$body.password;
  RegisterModel.findOne({
    username: username
  }).then(function (user) {
    console.log(user);

    if (user) {
      if (user.password === password) {
        res.json("Success");
      } else {
        res.json("the password is incorrect");
      }
    } else {
      res.json('No existed');
    }
  });
}); //update

app.put('/update', function _callee(req, res) {
  var _req$body2, _id, rest, data;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body2 = req.body, _id = _req$body2._id, rest = _objectWithoutProperties(_req$body2, ["_id"]);
          console.log(rest);
          _context.next = 4;
          return regeneratorRuntime.awrap(RegisterModel.updateOne({
            _id: _id
          }, rest));

        case 4:
          data = _context.sent;
          res.send({
            success: true,
            message: "update successfull",
            data: data
          });

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
}); //delete

app["delete"]('/delete/:id', function _callee2(req, res) {
  var id, data;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          id = req.params.id;
          _context2.next = 3;
          return regeneratorRuntime.awrap(RegisterModel.deleteOne({
            _id: id
          }));

        case 3:
          data = _context2.sent;
          res.send({
            success: true,
            message: "delete successfull",
            data: data
          });

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
}); //Route

app.use('/v1/auth', authRoute);
app.use('/v1/user', userRoute);
app.listen(3001, function () {
  console.log("server is running");
}); //test

app.post('/userdetail', function (req, res) {
  UserDetailModal.create(req.body).then(function (regis) {
    return res.json(regis);
  })["catch"](function (err) {
    return res.json(err);
  });
});
//# sourceMappingURL=index.dev.js.map
