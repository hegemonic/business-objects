'use strict';

const bo = require( '../../../source/index.js' );

const Properties = bo.shared.PropertyManager;
const Rules = bo.rules.RuleManager;
const Extensions = bo.shared.ExtensionManager;
const Property = bo.shared.PropertyInfo;
const F = bo.shared.PropertyFlag;
const dt = bo.dataTypes;
const cr = bo.commonRules;

const orderScheduleKey = new Property( 'orderScheduleKey', dt.Integer, F.key );
const orderItemKey = new Property( 'orderItemKey', dt.Integer, F.parentKey );
const quantity = new Property( 'quantity', dt.Integer );
const totalMass = new Property( 'totalMass', dt.Decimal );
const required = new Property( 'required', dt.Boolean );
const shipTo = new Property( 'shipTo', dt.Text );
const shipDate = new Property( 'shipDate', dt.DateTime );

const properties = new Properties(
  orderScheduleKey,
  orderItemKey,
  quantity,
  totalMass,
  required,
  shipTo,
  shipDate
);

const rules = new Rules(
);

//region Transfer object methods

function fromDto( ctx, dto ) {
  ctx.setValue( 'orderScheduleKey', dto.orderScheduleKey );
  ctx.setValue( 'orderItemKey', dto.orderItemKey );
  ctx.setValue( 'quantity', dto.quantity );
  ctx.setValue( 'totalMass', dto.totalMass );
  ctx.setValue( 'required', dto.required );
  ctx.setValue( 'shipTo', dto.shipTo );
  ctx.setValue( 'shipDate', dto.shipDate );
}

function toCto( ctx ) {
  return {
    orderScheduleKey: this.orderScheduleKey,
    orderItemKey: this.orderItemKey,
    quantity: this.quantity,
    totalMass: this.totalMass,
    required: this.required,
    shipTo: this.shipTo,
    shipDate: this.shipDate
  };
}

//endregion

//region Data portal methods

function dataFetch( ctx, dto, method ) {
  ctx.setValue( 'orderScheduleKey', dto.orderScheduleKey );
  ctx.setValue( 'orderItemKey', dto.orderItemKey );
  ctx.setValue( 'quantity', dto.quantity );
  ctx.setValue( 'totalMass', dto.totalMass );
  ctx.setValue( 'required', dto.required );
  ctx.setValue( 'shipTo', dto.shipTo );
  ctx.setValue( 'shipDate', dto.shipDate );
  ctx.fulfill( dto );
}

//endregion

const extensions = new Extensions( 'dal', __filename );
extensions.fromDto = fromDto;
extensions.toCto = toCto;
extensions.dataFetch = dataFetch;

const BlanketOrderScheduleView = bo.ReadOnlyChildObject( 'BlanketOrderScheduleView', properties, rules, extensions );

module.exports = BlanketOrderScheduleView;