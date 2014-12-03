console.log('Testing common-rules/min-length-rule.js...');

var MinLengthRule = require('../../source/common-rules/min-length-rule.js');
var PropertyInfo = require('../../source/shared/property-info.js');
var Text = require('../../source/data-types/text.js');
var ValidationRule = require('../../source/rules/validation-rule.js');
var ValidationResult = require('../../source/rules/validation-result.js');
var RuleSeverity = require('../../source/rules/rule-severity.js');

describe('Min-Length rule', function () {
  var pi = new PropertyInfo('property', new Text(), true);

  it('constructor expects two-to-five arguments', function () {
    var build01 = function () { return new MinLengthRule(); };
    var build02 = function () { return new MinLengthRule(73); };
    var build03 = function () { return new MinLengthRule('property'); };
    var build04 = function () { return new MinLengthRule(pi); };
    var build05 = function () { return new MinLengthRule(pi, 8); };
    var build06 = function () { return new MinLengthRule(pi, 8, 'message'); };
    var build07 = function () { return new MinLengthRule(pi, 8, 'message', 15); };
    var build08 = function () { return new MinLengthRule(pi, 8, 'message', 15, true); };

    expect(build01).toThrow();
    expect(build02).toThrow();
    expect(build03).toThrow();
    expect(build04).toThrow();
    expect(build05).not.toThrow();
    expect(build06).not.toThrow();
    expect(build07).not.toThrow();
    expect(build08).not.toThrow();
  });

  it('inherits validation rule type', function() {
    var rule = new MinLengthRule(pi, 8, 'message', 15, true);

    expect(rule).toEqual(jasmine.any(ValidationRule));
  });

  it('has four properties', function () {
    var rule = new MinLengthRule(pi, 8, 'message', 15, true);

    expect(rule.ruleName).toBe('MinLength');
    expect(rule.message).toBe('message');
    expect(rule.priority).toBe(15);
    expect(rule.stopsProcessing).toBe(true);
  });

  it('execute method works', function() {
    var rule = new MinLengthRule(pi, 8, 'message', 15, true);

    var call01 = function () { rule.execute(); };
    var result01 = rule.execute({ property: 'Buenos Aires' });
    var result02 = rule.execute({ property: 'New York' });
    var result03 = rule.execute({ property: 'London' });
    var result04 = rule.execute({ property: '' });

    expect(call01).toThrow();
    expect(result01).toBeUndefined();
    expect(result02).toBeUndefined();

    expect(result03).toEqual(jasmine.any(ValidationResult));
    expect(result04).toEqual(jasmine.any(ValidationResult));

    expect(result04.ruleName).toBe('MinLength');
    expect(result04.propertyName).toBe('property');
    expect(result04.message).toBe('message');
    expect(result04.severity).toBe(RuleSeverity.error);
    expect(result04.stopsProcessing).toBe(true);
    expect(result04.isPreserved).toBe(false);
    expect(result04.affectedProperties.length).toBe(0);
  });
});
