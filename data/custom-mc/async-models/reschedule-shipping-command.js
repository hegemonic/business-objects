'use strict';

var bo = require('../../../source/index.js');
var daoBuilder = require('../dao-builder.js');
var Model = bo.ModelComposer;
var cr = bo.commonRules;

var RescheduleShippingResult = require('./reschedule-shipping-result.js');

//region Data portal methods

function dataExecute (ctx, method, callback) {
  function cb (dto) {
    ctx.setValue('success', dto.success);
    callback(null, dto);
  }
  var dto = {
    orderKey:         ctx.getValue('orderKey'),
    orderItemKey:     ctx.getValue('orderItemKey'),
    orderScheduleKey: ctx.getValue('orderScheduleKey')
  };
  if (method === 'reschedule')
    ctx.dao.reschedule(ctx.connection, dto).then( cb );
  else
    dto = ctx.dao.execute(ctx.connection, dto).then( cb );
  // or:
  // ctx.dao[method](ctx.connection, dto).then( cb );
}

//endregion

var RescheduleShippingCommand = Model('RescheduleShippingCommand')
    .commandObject('async-dal', __filename)
    // --- Properties
    .integer('orderKey')
        .required()
    .integer('orderItemKey')
        .required()
    .integer('orderScheduleKey')
        .required()
    .boolean('success')
    .property('result', RescheduleShippingResult)
    // --- Permissions
    .canCall('reschedule', cr.isInRole, 'developers', 'You are not authorized to execute the command.')
    // --- Customization
    .daoBuilder(daoBuilder)
    .dataExecute(dataExecute)
    .addMethod('reschedule')
    // --- Build model class
    .compose();

module.exports = RescheduleShippingCommand;
