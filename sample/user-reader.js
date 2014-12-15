'use strict';

var User = require('./user.js');

var userReader = function () {
  return new User('ada-lovelace', 'Ada Lovelace', 'ada.lovelace@computer.net', ['administrators']);
};

module.exports = userReader;
