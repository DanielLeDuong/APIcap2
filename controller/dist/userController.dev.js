"use strict";

var RegisterModel = require('../API/Register'); //lay user tu postman


var userController = {
  //get all user
  getAllUser: function getAllUser(req, res) {
    var user;
    return regeneratorRuntime.async(function getAllUser$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap(RegisterModel.find());

          case 3:
            user = _context.sent;
            res.status(200).json(user);
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            res.status(500).json(_context.t0);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 7]]);
  },
  //delete user
  deleteUser: function deleteUser(req, res) {
    var user;
    return regeneratorRuntime.async(function deleteUser$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return regeneratorRuntime.awrap(RegisterModel.findByIdAndDelete(req.params.id));

          case 3:
            user = _context2.sent;
            res.status(200).json('delete successfully');
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
  }
};
module.exports = userController;
//# sourceMappingURL=userController.dev.js.map
