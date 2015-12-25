console.log('Testing system/enumeration-error.js...');

var EnumerationError = require('../../source/system/enumeration-error.js');

describe('Enumeration error', function() {

  it('constructor expects an optional message', function() {
    var ee1 = new EnumerationError();
    var ee2 = new EnumerationError('The passed value is not an enumeration member.');
    var ee3 = new EnumerationError('default');

    expect(ee1).toEqual(jasmine.any(Error));
    expect(ee1.name).toBe('EnumerationError');
    expect(ee1.message).toBe('An enumeration error occurred.');

    expect(ee2).toEqual(jasmine.any(Error));
    expect(ee2.name).toBe('EnumerationError');
    expect(ee2.message).toBe('The passed value is not an enumeration member.');

    expect(ee3).toEqual(jasmine.any(Error));
    expect(ee3.name).toBe('EnumerationError');
    expect(ee3.message).toBe('An enumeration error occurred.');
  });
});
