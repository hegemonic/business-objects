'use strict';

var util = require('util');
var EnsureArgument = require('../shared/ensure-argument.js');
var ValidationRule = require('../rules/validation-rule.js');
var RuleSeverity = require('../rules/rule-severity.js');

/**
 * @classdesc The rule ensures that an information is given for the property.
 * @description Creates a new information rule object.
 *
 * @memberof bo.commonRules
 * @constructor
 * @param {bo.shared.PropertyInfo} primaryProperty - The property definition the rule relates to.
 * @param {string} message - The information to display.
 * @param {number} [priority=1] - The priority of the rule.
 * @param {boolean} [stopsProcessing=false] - Indicates the rule behavior in case of failure.
 *
 * @extends bo.rules.ValidationRule
 *
 * @throws {@link bo.shared.ArgumentError Argument error}: The primary property must be a PropertyInfo object.
 * @throws {@link bo.shared.ArgumentError Argument error}: The message must be a non-empty string.
 */
function InformationRule(primaryProperty, message, priority, stopsProcessing) {
  ValidationRule.call(this, 'Information');

  EnsureArgument.isMandatoryString(message, 'c_manString', 'InformationRule', 'message');

  // Initialize base properties.
  this.initialize(
      primaryProperty,
      message,
      priority || 1,
      stopsProcessing || false
  );

  // Immutable object.
  Object.freeze(this);
}
util.inherits(InformationRule, ValidationRule);

/**
 * Ensures that the information for the property is always present.
 *
 * @abstract
 * @function bo.commonRules.InformationRule#execute
 * @param {Array.<*>} inputs - An array of the values of the required properties.
 * @returns {(bo.rules.ValidationResult|undefined)} Information about the failure.
 */
InformationRule.prototype.execute = function (inputs) {

  return this.result(this.message, RuleSeverity.information);
};

module.exports = InformationRule;
