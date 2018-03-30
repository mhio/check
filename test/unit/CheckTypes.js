/* global expect */

const { CheckTypes, Exception } = require('../../src/CheckTypes')
const { Element } = require('../fixture/Element')

describe('Check', function(){

  it('should load', function(){
    expect( CheckTypes ).to.be.an('object')
  })

  it('should have a args, test, message', function(){
    Object.keys(CheckTypes).forEach(key => {
      expect( CheckTypes[key], key ).to.have.property('args').and.be.an.instanceof(Array)
      expect( CheckTypes[key], key  ).to.have.property('test').and.be.a('function')
      expect( CheckTypes[key], key  ).to.have.property('messageFn').and.be.a('function')
    })
  })



  const ok_tests = {
    array:      [ [] ],
    boolean:    [ true ],
    buffer:     [ Buffer.from('test') ],
    date:       [ new Date() ],
    element:    [ new Element() ],
    error:      [ new Error() ],
    exception:  [ new Exception() ],
    finite:     [ 5 ],
    function:   [ ()=> true ],
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
    length:     [ 'testing', 7, 8 ],
    integer:    [ 1 ],
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

  describe('type ok tests', function(){
    Object.keys(ok_tests).forEach(key => {
      it(`should pass test for ${key}`, function(){
        expect( CheckTypes[key].test.apply(null, ok_tests[key]), key).to.be.ok
      })
    })
  })

  const err_tests = {
    array:      [ {} ],
    boolean:    [ '' ],
    buffer:     [ '' ],
    date:       [ Date.now() ],
    element:    [ {} ],
    error:      [ '' ],
    exception:  [ new Error() ],
    finite:     [ '' ],
    function:   [ '' ],
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
    length:     [ 'testing', 8 ],
    integer:    [ '1' ],
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

  describe('type error tests', function(){
    Object.keys(err_tests).forEach(key => {
      it(`should fail test for ${key}`, function(){
        expect( CheckTypes[key].test.apply(null, err_tests[key]), key).to.be.false
      })
    })
  })
})