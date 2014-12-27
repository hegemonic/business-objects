'use strict';

var AddressDao = function() {

  this.create = function(callback) {
    console.log('--- Blanket order address DAO.create');
    callback(null, {
      country:    '',
      state:      '',
      city:       '',
      line1:      '',
      line2:      '',
      postalCode: ''
    });
  };

  this.fetch = function(filter, callback) {
    console.log('--- Blanket order address DAO.fetch');
    for (var key in global.addresses) {
      if (global.addresses.hasOwnProperty(key)) {
        var data = global.addresses[key];
        if (data.orderKey === filter){
          callback(null, data);
          return;
        }
      }
    }
    callback(null, {});
  };

  this.insert = function(data, callback) {
    console.log('--- Blanket order address DAO.insert');
    data.addressKey = ++global.addressKey;
    var key = data.addressKey;
    global.addresses[key] = data;
    callback(null, data);
  };

  this.update = function(data, callback) {
    console.log('--- Blanket order address DAO.update');
    var key = data.addressKey;
    if (!global.addresses[key])
      callback(new Error('Blanket order address not found.'));
    else {
      global.addresses[key] = data;
      callback(null, data);
    }
  };

  this.remove = function(filter, callback) {
    console.log('--- Blanket order address DAO.remove');
    var key = filter;
    if (global.addresses[key])
      delete global.addresses[key];
    callback(null);
  };

};

module.exports = AddressDao;
