'use strict';

var util = require('util');
var DaoBase = require('../../source/data-access/dao-base.js');

var BlanketOrderItemDao = function() {
  BlanketOrderItemDao.super_.call(this, 'BlanketOrderItemDao');
};
util.inherits(BlanketOrderItemDao, DaoBase);

BlanketOrderItemDao.prototype.create = function() {
  console.log('--- Blanket order item DAO.create');

  return {};
};

BlanketOrderItemDao.prototype.fetch = function(filter) {
  console.log('--- Blanket order item DAO.fetch');

  if (!global.items[filter])
    throw new Error('Blanket order item not found.');
  return global.items[filter];
};

BlanketOrderItemDao.prototype.fetchForOrder = function(filter) {
  console.log('--- Blanket order item DAO.fetchForOrder');

  var items = [];
  for (var key in global.items) {
    if (global.items.hasOwnProperty(key)) {
      var item = global.items[key];
      if (item.orderKey === filter)
        items.push(item);
    }
  }
  return items;
};

BlanketOrderItemDao.prototype.insert = function(data) {
  console.log('--- Blanket order item DAO.insert');

  data.orderItemKey = ++global.itemKey;
  global.items[data.orderItemKey] = data;
  return data;
};

BlanketOrderItemDao.prototype.update = function(data) {
  console.log('--- Blanket order item DAO.update');

  if (!global.items[data.orderItemKey])
    throw new Error('Blanket order item not found.');
  global.items[data.orderItemKey] = data;
  return data;
};

BlanketOrderItemDao.prototype.remove = function(filter) {
  console.log('--- Blanket order item DAO.remove');

  if (global.items[filter])
    delete global.items[filter];
};

module.exports = BlanketOrderItemDao;
