console.log( 'Testing common-rules/is-in-role-rule.js...' );

function read ( filename ) {
  return require( '../../../source/' + filename );
}
const IsInRoleRule = read( 'common-rules/is-in-role-rule.js' );
const AuthorizationRule = read( 'rules/authorization-rule.js' );
const AuthorizationAction = read( 'rules/authorization-action.js' );

const User = require( '../../../data/user.js' );

describe( 'Is-in-role rule', () => {

  it( 'constructor expects three-to-six arguments', () => {

    const build01 = function () { return new IsInRoleRule(); };
    const build02 = function () { return new IsInRoleRule( AuthorizationAction.updateObject ); };
    const build03 = function () { return new IsInRoleRule( AuthorizationAction.updateObject, null ); };
    const build04 = function () { return new IsInRoleRule( AuthorizationAction.updateObject, null, 'developers' ); };
    const build05 = function () { return new IsInRoleRule( AuthorizationAction.updateObject, null, 'developers', 'message' ); };
    const build06 = function () { return new IsInRoleRule( AuthorizationAction.updateObject, null, 'developers', 'message', 100 ); };
    const build07 = function () { return new IsInRoleRule( AuthorizationAction.updateObject, null, 'developers', 'message', 100, true ); };
    const build08 = function () { return new IsInRoleRule( 4, null, 'developers', 'message', 100, true ); };
    const build09 = function () { return new IsInRoleRule( AuthorizationAction.updateObject, null, [ 'men', 'women' ], 'message', 100, true ); };

    expect( build01 ).toThrow();
    expect( build02 ).toThrow();
    expect( build03 ).toThrow( 'The role argument of IsInRoleRule constructor must be a non-empty string.' );
    expect( build04 ).not.toThrow();
    expect( build05 ).not.toThrow();
    expect( build06 ).not.toThrow();
    expect( build07 ).not.toThrow();
    expect( build08 ).not.toThrow();
    expect( build09 ).toThrow();
  } );

  it( 'inherits authorization rule type', () => {

    const rule = new IsInRoleRule( AuthorizationAction.updateObject, null, 'developers', 'message', 100, true );

    expect( rule ).toEqual( jasmine.any( AuthorizationRule ) );
  } );

  it( 'has four properties', () => {

    const rule = new IsInRoleRule( AuthorizationAction.updateObject, null, 'developers', 'message', 100, true );

    expect( rule.ruleName ).toBe( 'IsInRole' );
    expect( rule.message ).toBe( 'message' );
    expect( rule.priority ).toBe( 100 );
    expect( rule.stopsProcessing ).toBe( true );
  } );

  it( 'execute method works', () => {

    const john = new User( 'john', 'John Smith', 'john@company.com', [ 'salesmen' ] );
    const paul = new User( 'paul', 'Paul Smith', 'paul@company.com', [ 'testers', 'developers' ] );
    const rule_1 = new IsInRoleRule( AuthorizationAction.createObject, null, 'developers', 'message', 100, true );
    const rule_2 = new IsInRoleRule( AuthorizationAction.removeObject, null, 'salesmen', 'message', 100, true );

    const call01 = function () { rule_1.execute(); };
    const call02 = function () { rule_1.execute( john ); };
    const call03 = function () { rule_2.execute( paul ); };
    const call04 = function () { rule_2.execute( { userName: 'Mark' } ); };

    expect( call01 ).toThrow();
    expect( call02 ).toThrow();
    expect( call03 ).toThrow();
    expect( call04 ).toThrow( 'The userInfo argument of IsInRoleRule.execute method must be a UserInfo object or null.' );
    expect( rule_1.execute( paul ) ).toBeUndefined();
    expect( rule_2.execute( john ) ).toBeUndefined();
  } );
} );
