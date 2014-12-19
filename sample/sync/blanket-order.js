'use strict';

var bo = require('../../source/index.js');

var Properties = bo.shared.PropertyManager;
var Rules = bo.rules.RuleManager;
var Extensions = bo.shared.ExtensionManagerSync;
var Property = bo.shared.PropertyInfo;
var F = bo.shared.PropertyFlag;
var dt = bo.dataTypes;
var cr = bo.commonRules;

var Address = require('./address.js');
var BlanketOrderItemList = require('./blanket-order-item-list.js');

var orderKey = new Property('orderKey', dt.Integer, F.readOnly);
var vendorName = new Property('vendorName', dt.Text);
var contractDate = new Property('contractDate', dt.DateTime);
var totalPrice = new Property('totalPrice', dt.Decimal);
var schedules = new Property('schedules', dt.Integer);
var enabled = new Property('enabled', dt.Boolean);
var address = new Property('address', Address);
var items = new Property('items', BlanketOrderItemList);
var createdDate = new Property('createdDate', dt.DateTime, F.readOnly);
var modifiedDate = new Property('modifiedDate', dt.DateTime, F.readOnly);

var properties = new Properties(
    'BlanketOrder',
    orderKey,
    vendorName,
    contractDate,
    totalPrice,
    schedules,
    enabled,
    address,
    items,
    createdDate,
    modifiedDate
);

var rules = new Rules(
    new cr.required(vendorName),
    new cr.required(contractDate),
    new cr.required(totalPrice),
    new cr.required(schedules),
    new cr.required(enabled)
);

var extensions = new Extensions('dao', __filename);

var BlanketOrder = bo.EditableModelSync(properties, rules, extensions);

var BlanketOrderFactory = {
  create: function () {
    return BlanketOrder.create();
  },
  get: function (key) {
    return BlanketOrder.fetch(key);
  },
  getByName: function (name) {
    return BlanketOrder.fetch(name, 'fetchByName');
  }
};

module.exports = BlanketOrderFactory;
