"use strict";

var mongoose = require('mongoose');

var userDetailSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  phoneNumber: {
    type: String,
    require: true
  }
}, {
  timestamps: true
});
var UserDetailModal = mongoose.model('user-detail', userDetailSchema);
module.exports = UserDetailModal;
//# sourceMappingURL=UserDetail.dev.js.map
