console.log('Testing shared/index.js...');

var shared = require('../../source/shared/index.js');
var Text = require('../../source/data-types/text.js');
var UserReader = require('../../sample/user-reader.js');

var PropertyInfo = require('../../source/shared/property-info.js');
var PropertyManager = require('../../source/shared/property-manager.js');
var ExtensionManager = require('../../source/shared/extension-manager.js');
var DataContext = require('../../source/shared/data-context.js');
var UserInfo = require('../../source/shared/user-info.js');

var configuration = require('../../source/shared/config-reader.js');
var ensureArgument = require('../../source/shared/ensure-argument.js');
var Enumeration = require('../../source/shared/enumeration.js');

var ArgumentError = require('../../source/shared/argument-error.js');
var EnumerationError = require('../../source/shared/enumeration-error.js');
var NotImplementedError = require('../../source/shared/not-implemented-error.js');

describe('Shared component index', function () {
  var dao = {};
  var user = UserReader();
  function toDto () {
    return {};
  }
  function fromDto (dto) {
    this.name = dto.name;
  }

  it('properties return correct components', function() {

    expect(new shared.PropertyInfo('property', new Text(), true)).toEqual(jasmine.any(PropertyInfo));
    expect(new shared.PropertyManager('list')).toEqual(jasmine.any(PropertyManager));
    expect(new shared.ExtensionManager('data_source', '/model/path')).toEqual(jasmine.any(ExtensionManager));
    expect(new shared.DataContext(dao, user, true, toDto, fromDto)).toEqual(jasmine.any(DataContext));
    expect(new shared.UserInfo('anonymous')).toEqual(jasmine.any(UserInfo));

    expect(shared.configuration).toEqual(jasmine.any(Object));
    expect(shared.ensureArgument).toEqual(jasmine.any(Object));
    expect(new shared.Enumeration('item')).toEqual(jasmine.any(Enumeration));

    expect(new shared.ArgumentError('message')).toEqual(jasmine.any(ArgumentError));
    expect(new shared.EnumerationError('message')).toEqual(jasmine.any(EnumerationError));
    expect(new shared.NotImplementedError('message')).toEqual(jasmine.any(NotImplementedError));
  });
});