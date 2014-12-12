console.log('Testing rules/authorization-error.js...');

var AuthorizationError = require('../../source/rules/authorization-error.js');

describe('Data type error', function() {

  it('constructor expects one optional argument', function() {
    var ae1 = new AuthorizationError();
    var ae2 = new AuthorizationError('Only managers are allowed to view these data.');

    expect(ae1).toEqual(jasmine.any(Error));
    expect(ae1.name).toBe('AuthorizationError');
    expect(ae1.message).toBe('The user has no permission to execute the action.');

    expect(ae2).toEqual(jasmine.any(Error));
    expect(ae2.name).toBe('AuthorizationError');
    expect(ae2.message).toBe('Only managers are allowed to view these data.');
  });
});