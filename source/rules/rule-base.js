'use strict';

var CLASS_NAME = 'Rule';

var Argument = require('../system/argument-check.js');
var ArgumentError = require('../system/argument-error.js');
var NotImplementedError = require('../system/not-implemented-error.js');

/**
 * @classdesc Serves as the base class for rules.
 * @description
 *      Creates a new rule object.
 *      The rule instances should be frozen.
 *
 * @memberof bo.rules
 * @constructor
 * @param {string} ruleName - The name of the rule.
 *
 * @throws {@link bo.system.ArgumentError Argument error}: The rule name must be a non-empty string.
 */
var RuleBase = function (ruleName) {

  ruleName = Argument.inConstructor(CLASS_NAME).check(ruleName).forMandatory('ruleName').asString();
  /**
   * The name of the rule type.
   * The default value usually the name of the constructor, without the Rule suffix.
   * @name bo.rules.RuleBase#ruleName
   * @type {string}
   * @readonly
   */
  Object.defineProperty(this, 'ruleName', {
    get: function () {
      return ruleName;
    },
    enumeration: true
  });

  /**
   * Human-readable description of the rule failure.
   * @type {string}
   * @readonly
   */
  this.message = null;
  /**
   * The priority of the rule. Higher number means higher priority.
   * @type {number}
   * @default
   * @readonly
   */
  this.priority = 10;
  /**
   * Indicates whether processing of the rules for a property stops when the rule fails.
   * @type {boolean}
   * @default
   * @readonly
   */
  this.stopsProcessing = false;
};

/**
 * Sets the properties of the rule.
 *
 * @function bo.rules.RuleBase#initialize
 * @param {string} message - Human-readable description of the rule failure.
 * @param {number} [priority=10] - The priority of the rule.
 * @param {boolean} [stopsProcessing=false] - Indicates the rule behavior in case of failure.
 *
 * @throws {@link bo.system.ArgumentError Argument error}: The message must be a non-empty string.
 */
RuleBase.prototype.initialize = function (message, priority, stopsProcessing) {

  // Remove null and undefined arguments.
  var args = Array.prototype.slice.call(arguments).filter(function(arg) {
    return arg !== null && arg !== undefined;
  });

  if (args.length) {
    for (var i = 0; i < args.length; i++) {
      switch (typeof args[i]) {
        case 'string':
          this.message = args[i];
          break;
        case 'number':
          this.priority = Math.round(args[i]);
          break;
        case 'boolean':
          this.stopsProcessing = args[i];
          break;
        default:
          throw new ArgumentError('rule');
      }
    }
  }
  Argument.inMethod(CLASS_NAME, 'initialize').check(this.message).forMandatory('message').asString();
};

/**
 * Abstract method to check if the rule is valid for the property.
 *
 * @abstract
 * @function bo.rules.RuleBase#execute
 * @param {Array.<*>} inputs - An array of the values of the required properties.
 *
 * @throws {@link bo.system.NotImplementedError Not implemented error}: The Rule.execute method is not implemented.
 */
RuleBase.prototype.execute = function (inputs) {
  throw new NotImplementedError('method', CLASS_NAME, 'execute');
};

/**
 * Abstract method that returns the result of the rule checking.
 *
 * @abstract
 * @function bo.rules.RuleBase#result
 * @param {string} [message] - Human-readable description of the rule failure.
 * @param {bo.rules.RuleSeverity} [severity] - The severity of the rule failure.
 * @returns {object} An object that describes the result of the rule checking.
 *
 * @throws {@link bo.system.NotImplementedError Not implemented error}: The Rule.result method is not implemented.
 */
RuleBase.prototype.result = function (message, severity) {
  throw new NotImplementedError('method', CLASS_NAME, 'result');
};

module.exports = RuleBase;
