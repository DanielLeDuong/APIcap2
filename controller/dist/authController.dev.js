"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var RegisterModel = require('../API/Register');

var jwt = require('jsonwebtoken');

var authController = {
  //register
  register: function register(req, res) {
    var newUser, user;
    return regeneratorRuntime.async(function register$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap(new RegisterModel({
              username: req.body.username,
              password: req.body.password,
              confirmPassword: req.body.confirmPassword,
              email: req.body.email
            }));

          case 3:
            newUser = _context.sent;
            _context.next = 6;
            return regeneratorRuntime.awrap(newUser.save());

          case 6:
            user = _context.sent;
            res.status(200).json(user);
            _context.next = 13;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);
            res.status(500).json(_context.t0);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 10]]);
  },
  //login
  login: function login(req, res) {
    var user, accessToken, refreshToken, _user$_doc, password, confirmPassword, others, message, _message;

    return regeneratorRuntime.async(function login$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return regeneratorRuntime.awrap(RegisterModel.findOne({
              username: req.body.username
            }));

          case 3:
            user = _context2.sent;

            if (user) {
              if (user.password === req.body.password) {
                // access token
                accessToken = jwt.sign({
                  id: user.id,
                  role: user.role
                }, "accessKey", {
                  expiresIn: '1200s'
                }); // refresh token

                refreshToken = jwt.sign({
                  id: user.id,
                  role: user.role
                }, "refreshKey", {
                  expiresIn: '6d'
                }); //luu token vao cookies

                res.cookie("refreshToken", refreshToken, {
                  httpOnly: true,
                  secure: false,
                  path: '/',
                  sameSite: 'strict'
                }); //neu muon loai password khi xuat thong tin thi lam theo cach sau

                _user$_doc = user._doc, password = _user$_doc.password, confirmPassword = _user$_doc.confirmPassword, others = _objectWithoutProperties(_user$_doc, ["password", "confirmPassword"]);
                res.status(200).json(_objectSpread({}, others, {
                  accessToken: accessToken
                }));
              } else {
                message = res.json("The password is incorrect");
              }
            } else {
              _message = res.json('No existed username');
            }

            _context2.next = 10;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            res.status(500).json(_context2.t0);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 7]]);
  },
  //refresh token
  requestRefreshToken: function requestRefreshToken(req, res) {
    var reqRefreshToken;
    return regeneratorRuntime.async(function requestRefreshToken$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            reqRefreshToken = req.cookie.refreshToken;

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    });
  },
  //log out
  logout: function logout(req, res) {
    return regeneratorRuntime.async(function logout$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            res.clearCookie("refreshToken");
            res.status(200).json("Log out successfully");

          case 2:
          case "end":
            return _context4.stop();
        }
      }
    });
  }
}; //luu tru token

module.exports = authController;
//# sourceMappingURL=authController.dev.js.map
