'use strict';

var bo = require('../../../source/index.js');
var daoBuilder = require('../dao-builder.js');
var Model = bo.ModelComposer;

//region Data portal methods

function dataFetch (ctx, dto, method, callback) {
  ctx.setValue('quantity',  dto.quantity);
  ctx.setValue('totalMass', dto.totalMass);
  ctx.setValue('required',  dto.required);
  ctx.setValue('shipTo',    dto.shipTo);
  ctx.setValue('shipDate',  dto.shipDate);
  callback(null, dto);
}

//endregion

var RescheduleShippingResult = Model('RescheduleShippingResult')
    .readOnlyChildObject('async-dal', __filename)
    // --- Properties
    .integer('quantity')
        .required()
    .decimal('totalMass')
        .required()
    .boolean('required')
        .required()
    .text('shipTo')
        .required()
    .dateTime('shipDate')
        .required()
    // --- Customization
    .daoBuilder(daoBuilder)
    .dataFetch(dataFetch)
    // --- Build model class
    .compose();

module.exports = RescheduleShippingResult;