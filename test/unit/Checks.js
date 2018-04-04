/* global expect */

const { Checks, Exception } = require('../../src/Checks')
const { Element } = require('../fixture/Element')

describe('Check', function(){

  it('should load', function(){
    expect( Checks ).to.be.an('function')
  })

  it('should load all checks', function(){
    expect( Checks.all ).to.be.an('object')
  })

  it('should have a args, test, message', function(){
    Object.keys(Checks.all).forEach(key => {
      expect( Checks.all[key], key ).to.have.property('args').and.be.an.instanceof(Array)
      expect( Checks.all[key], key  ).to.have.property('test').and.be.a('function')
      expect( Checks.all[key], key  ).to.have.property('messageFn').and.be.a('function')
    })
  })

  it('should add a check', function(){
    expect( Checks.addCheck('dumb', {}) ).to.be.ok
  })

 it('should reset all checks', function(){
    expect( Checks.resetChecks() ).to.be.ok
  })

  it('should add a type', function(){
    expect( Checks.addType('dumb', {}) ).to.be.ok
  })

  it('should reset all types', function(){
    expect( Checks.resetTypes() ).to.be.ok
  })

  const ok_test_types = {
    array:      [ [] ],
    boolean:    [ true ],
    buffer:     [ Buffer.from('test') ],
    date:       [ new Date() ],
    element:    [ new Element() ],
    error:      [ new Error() ],
    exception:  [ new Exception() ],
    finite:     [ 5 ],
    function:   [ ()=> true ],
    integer:    [ 1 ],
    nan:        [ NaN ],
    number:     [ 2 ],
    object:     [ {} ],
    plainobject: [ {} ],
    regexp:     [ /test/ ],
    safeinteger: [ 5 ],
    set:        [ new Set() ],
    string:     [ 'str' ],
    symbol:     [ Symbol('str') ],
    typedarray: [ new Uint8Array() ],
    weakmap:    [ new WeakMap() ],
    weakset:    [ new WeakSet() ],
    nil:        [ null ],
    notNil:     ['str' ],
    empty:      [ [] ],
    notEmpty:   [ ['test'] ],
    undefined:  [ undefined ],
    defined:    [ 'str' ],
  }
  const ok_test_checks = {
    length:     [ 'testing', 7, 8 ],
    range:      [ 5, 5, 5 ],
    between:    [ 5, 4, 6 ],
    strinteger: [ '53' ],
    match:      [ 'test', /test/ ],
    uuid:       [ 'd8eae84a-33b9-11e8-9845-dbf267306395' ],
    stuid:      [ 'a8eZer4a35b911e8Qe' ],
    alphaNumericDashUnderscore: ['a-_9' ],
    alphaNumeric: [ 'a9F' ],
    alpha:      [ 'asdfD' ],
    numeric:    [ '134' ],
    word:       [ 'a9_A' ],

    testing:    [ true, true ],
    true:       [],
    //false:      [], // this will always false
  }

  describe('ok tests', function(){
    Object.keys(ok_test_types).forEach(key => {
      it(`should pass test for type ${key}`, function(){
        expect( Checks.types[key].test.apply(null, ok_test_types[key]), key).to.be.ok
      })
    })
    Object.keys(ok_test_checks).forEach(key => {
      it(`should pass test for check ${key}`, function(){
        expect( Checks.all[key].test.apply(null, ok_test_checks[key]), key).to.be.ok
      })
    })
  })

  const err_type_tests = {
    array:      [ {} ],
    boolean:    [ '' ],
    buffer:     [ '' ],
    date:       [ Date.now() ],
    element:    [ {} ],
    error:      [ '' ],
    exception:  [ new Error() ],
    finite:     [ '' ],
    function:   [ '' ],
    integer:    [ '1' ],
    nan:        [ 'NaN' ],
    number:     [ '' ],
    object:     [ '' ],
    plainobject: [ new Element() ],
    regexp:     [ '/test/' ],
    safeinteger: [ '5' ],
    set:        [ {} ],
    string:     [ 5 ],
    symbol:     [ '' ],
    typedarray: [ [] ],
    weakmap:    [ [] ],
    weakset:    [ [] ],
    nil:        [ 'null' ],
    notNil:     [ undefined ],
    empty:      [ 'a' ],
    notEmpty:   [ [] ],
    undefined:  [ '' ],
    defined:    [ undefined ],
  }
  const err_check_tests = {
    length:     [ 'testing', 8 ],
    range:      [ 5, 6, 7 ],
    between:    [ 5, 5, 6 ],
    strinteger: [ '53a' ],
    match:      [ 'test', /aaaa/ ],
    uuid:       [ 'Z8eae84a-33b9-11e8-9845-dbf267306395' ],
    stuid:      [ '-a8eZer4a35b911e8Qe' ],
    alphaNumericDashUnderscore: [' a-_9' ],
    alphaNumeric: [ '-a9F' ],
    alpha:      [ '9' ],
    numeric:    [ 'a' ],
    word:       [ '?' ],

    testing:    [ false, true ],
    //true:       [], // this will always be true
    false:      [], // this will always false
  }

  describe('error tests', function(){
    Object.keys(err_type_tests).forEach(key => {
      it(`should fail type test for ${key}`, function(){
        expect( Checks.types[key].test.apply(null, err_type_tests[key]), key).to.be.false
      })
    })
    Object.keys(err_check_tests).forEach(key => {
      it(`should fail check test for ${key}`, function(){
        expect( Checks.all[key].test.apply(null, err_check_tests[key]), key).to.be.false
      })
    })
  })
})