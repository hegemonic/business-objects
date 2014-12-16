'use strict';

var BlanketOrderDao = function() {

  this.create = function(callback) {
    callback(null, {});
  };

  this.fetch = function(filter, callback) {
    callback(null, {});
  };

  this.fetchByName = function(filter, callback) {
    callback(null, {});
  };

  this.insert = function(data, callback) {
    callback(null, data);
  };

  this.update = function(data, callback) {
    callback(null, data);
  };

  this.remove = function(filter, callback) {
    callback(null);
  };

};

module.exports = BlanketOrderDao;