'use strict';

var bo = require('../../source/index.js');

var BlanketOrderScheduleView = require('./blanket-order-schedule-view.js');

var BlanketOrderSchedulesView = bo.ReadOnlyChildCollection(
  'BlanketOrderSchedulesView',
  BlanketOrderScheduleView
);

module.exports = BlanketOrderSchedulesView;