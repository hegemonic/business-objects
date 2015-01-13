/**
 * Decimal data type module.
 * @module data-types/decimal
 */
'use strict';

var util = require('util');
var DataType = require('./data-type.js');
var DataTypeError = require('./data-type-error.js');

function Decimal() {
  Decimal.super_.call(this, 'Decimal');

  // Immutable object.
  Object.freeze(this);
}
util.inherits(Decimal, DataType);

Decimal.prototype.check = function (value) {

  if (value !== null && typeof value !== 'number' && !(value instanceof Number))
    throw new DataTypeError('decimal');
};

Decimal.prototype.hasValue = function (value) {

  this.check(value);
  return value != undefined && value != null;
};

module.exports = Decimal;
