'use strict';

var bo = require('../../../source/index.js');
var Model = bo.ModelComposerSync;

var ClearScheduleCommand = Model('ClearScheduleCommand')
    .commandObject('dao', __filename)
    // --- Properties
    .integer('orderKey')
    .integer('orderItemKey')
    .integer('orderScheduleKey')
    .boolean('result')
    // --- Build model class
    .compose();

var ClearScheduleCommandFactory = {
  create: function (eventHandlers) {
    return ClearScheduleCommand.create(eventHandlers);
  }
};

module.exports = ClearScheduleCommandFactory;