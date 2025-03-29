"use strict";

var jwt = require('jsonwebtoken');

var middlewareController = {
  //verify token
  verifyToken: function verifyToken(req, res, next) {
    var token = req.headers.token;

    if (token) {
      var accessToken = token.split(" ")[1];
      jwt.verify(accessToken, "accessKey", function (err, user) {
        if (err) {
          res.status(403).json("Token is not valid");
        }

        req.user = user;
        next();
      });
    } else {
      res.status(401).json("You 're not authentication");
    }
  },
  //phan quyen xoa tai khoan
  deleteAuth: function deleteAuth(req, res, next) {
    middlewareController.verifyToken(req, res, function () {
      if (req.user.id == req.params.id || req.user.role) {
        next();
      } else {
        res.status(403).json("You are not allow to delete account");
      }
    });
  }
};
module.exports = middlewareController;
//# sourceMappingURL=middlewareController.dev.js.map
