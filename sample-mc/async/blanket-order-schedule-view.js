'use strict';

var Model = require('../../source/model-composer.js');

var bo = require('../../source/index.js');
var F = bo.shared.PropertyFlag;

var BlanketOrderScheduleView = Model('BlanketOrderScheduleView').readOnlyChildModel('dao', __filename)
    .integer('orderScheduleKey', F.key | F.readOnly)
    .integer('orderItemKey', F.parentKey | F.readOnly)
    .integer('quantity')
    .decimal('totalMass')
    .boolean('required')
    .text('shipTo')
    .dateTime('shipDate')
    .Compose();

module.exports = BlanketOrderScheduleView;
