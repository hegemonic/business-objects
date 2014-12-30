'use strict';

var util = require('util');
var DaoBase = require('../../source/data-access/dao-base.js');

var BlanketOrderScheduleDao = function() {
  BlanketOrderScheduleDao.super_.call(this, 'BlanketOrderScheduleDao');
};
util.inherits(BlanketOrderScheduleDao, DaoBase);

BlanketOrderScheduleDao.prototype.create = function(callback) {
  console.log('--- Blanket order schedule DAO.create');

  callback(null, {
    quantity:  0,
    totalMass: 0.0,
    required:  true,
    shipTo:    '',
    shipDate:  new Date(1980, 1, 1)
  });
};

BlanketOrderScheduleDao.prototype.fetch = function(filter, callback) {
  console.log('--- Blanket order schedule DAO.fetch');

  if (!global.schedules[filter])
    callback(new Error('Blanket order schedule not found.'));
  else
    callback(null, global.schedules[filter]);
};

BlanketOrderScheduleDao.prototype.fetchForItem = function(filter, callback) {
  console.log('--- Blanket order schedule DAO.fetchForItem');

  var schedules = [];
  for (var key in global.schedules) {
    if (global.schedules.hasOwnProperty(key)) {
      var schedule = global.schedules[key];
      if (schedule.orderItemKey === filter)
        schedules.push(schedule);
    }
  }
  callback(null, schedules);
};

BlanketOrderScheduleDao.prototype.insert = function(data, callback) {
  console.log('--- Blanket order schedule DAO.insert');

  data.orderScheduleKey = ++global.scheduleKey;
  global.schedules[data.orderScheduleKey] = data;
  callback(null, data);
};

BlanketOrderScheduleDao.prototype.update = function(data, callback) {
  console.log('--- Blanket order schedule DAO.update');

  if (!global.schedules[data.orderScheduleKey])
    callback(new Error('Blanket order schedule not found.'));
  else {
    global.schedules[data.orderScheduleKey] = data;
    callback(null, data);
  }
};

BlanketOrderScheduleDao.prototype.remove = function(filter, callback) {
  console.log('--- Blanket order schedule DAO.remove');

  if (global.schedules[filter])
    delete global.schedules[filter];
  callback(null);
};

module.exports = BlanketOrderScheduleDao;
