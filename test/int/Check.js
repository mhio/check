/* global expect */
const debug = require('debug')('mhio:test:int:Check')
const { Element } = require('../fixture/Element')
const { Check, Exception} = require('../../src/Check')
const forEach = require('lodash/forEach')

describe('Integration::mhio::Check', function(){

  describe('types', function(){
    
    let fn, types_config

    const all_type_tests = {
      array: {
        ok:   [ [] ],
        fail: [ {} ],
      },     
      boolean:{
        ok:   [ true ],
        fail: [ 'no' ]
      },
      buffer:{
        ok:   [ Buffer.from('test') ],
        fail: [ 'no' ],
      },
      date:  {
        ok:   [ new Date() ],
        fail: [ Date.now() ],
      },
      element: {
        ok:   [ new Element() ],
        fail: [ {} ],
        label: 'Dom Element'
      },
      error: {
        ok:   [ new Error() ],
        fail: [ '' ],
      },
      exception:  {
        ok:   [ new Exception() ],
        fail: [ new Error() ],
        label: 'instance of Exception'
      },
      finite:{
        ok:   [ 5 ],
        fail: [ '' ],
      },
      function:   {
        ok:   [ ()=> true ],
        fail: [ '' ],
      },
      nan:   {
        ok:   [ NaN ],
        fail: [ 'NaN' ],
        label: 'NaN \\(Not A Number\\)'
      },
      number:{
        ok:   [ 2 ],
        fail: [ '' ],
      },
      object:{
        ok:   [ {} ],
        fail: [ '' ],
      },
      plainobject:{
        ok: [ {} ],
        fail: [ new Element() ],
        label: 'plain object'
      },
      regexp:{
        ok:   [ /test/ ],
        fail: [ '/test/' ],
        label: 'regular expression'
      },
      safeinteger:{
        ok: [ 5 ],
        fail: [ '5' ],
        label: 'safe integer'
      },
      set:   {
        ok:   [ new Set() ],
        fail: [ {} ],
      },
      string:{
        ok:   [ 'str' ],
        fail: [ 5 ],
      },
      symbol:{
        ok:   [ Symbol('str') ],
        fail: [ '' ],
      },
      typedarray: {
        ok:   [ new Uint8Array() ],
        fail: [ [] ],
        label: 'typed array'
      },
      weakmap: {
        ok:   [ new WeakMap() ],
        fail: [ [] ],
        label: 'weak map'
      },
      weakset: {
        ok:   [ new WeakSet() ],
        fail: [ [] ],
        label: 'weak set'
      },
      nil: {
        ok:   [ null ],
        fail: [ 'null' ],
      },
      notNil:{
        ok:   ['str' ] ,
        fail: [ undefined ],
        label: 'nil',
        negative: true,
      },
      empty: {
        ok:   [ [] ],
        fail: [ 'a' ],
      },
      notEmpty: {
        ok:   [ ['test'] ],
        fail: [ [] ],
        negative: true,
        label: 'empty',
      },
      undefined:  {
        ok:   [ undefined ],
        fail: [ '' ],
      },
      defined: {
        ok:   [ 'str' ],
        fail: [ undefined ],
      },

    }

    // Setup a `Check` config for all the tests
    before('config setup', function(){
      types_config = { fields: {} }
      Object.keys(all_type_tests).forEach(key => {
        types_config.fields[`${key}field`] = {
          label: `An${key.substr(0,1).toUpperCase()}${key.substr(1)}`,
          type: key,
          required: false,
        }
      })
    })

    before('setup', function(){
      fn = Check.generate(types_config)
    })
    
    forEach(all_type_tests, (test, key) => {

      debug('test', test)

      forEach(test.ok, value => {

        it(`should succesfully check a "${key}" field wth value "${String(value)}"`, function(){
          let data = { [`${key}field`]: value }
          expect( fn(data) ).to.eql(data)
        })

      })

      forEach(test.fail, value => {

        it(`should succesfully check a "${key}" field value "${String(value)}"`, function(){
          let data = { [`${key}field`]: value  }
          let re_a_an = new RegExp(/ ?a?n?/)
          let label = test.label || key
          let re_label = new RegExp(label)
          let re = (test.negative)
            ? new RegExp('" must not be' + re_a_an.source + ' ' +re_label.source, 'i')
            : new RegExp('" must be' + re_a_an.source + ' ' +re_label.source, 'i')
          expect( ()=> fn(data) ).to.throw(re)
        })

      })

    })

  })

  describe('numbers', function(){

    let all_number_tests = {
      integer: {
        ok:   [ 1 ],
        fail: [ '1' ],
      },
      range: {
        ok:   [ 5, 5, 5 ],
        fail: [ 5, 6, 7 ],
      },
      between: {
        ok:   [ 5, 4, 6 ],
        fail: [ 5, 5, 6 ],
      },

    }

    describe('integer', function(){
      all_number_tests
    })

  })


  describe('strings', function(){

    let all_string_tests = {
      strinteger: {
        ok:   [ '53' ],
        fail: [ '53a' ],
        label: 'string integer'
      },
      match: {
        ok:   [ 'test', /test/ ],
        fail: [ 'test', /aaaa/ ],
      },
      uuid: {
        ok:   [ 'd8eae84a-33b9-11e8-9845-dbf267306395' ],
        fail: [ 'Z8eae84a-33b9-11e8-9845-dbf267306395' ],
      },
      stuid: {
        ok:   [ 'a8eZer4a35b911e8Qe' ],
        fail: [ '-a8eZer4a35b911e8Qe' ],
      },
      alphaNumericDashUnderscore: {
        ok:   ['a-_9' ],
        fail: [ ' a-_9' ],
      },
      alphaNumeric: {
        ok:   [ 'a9F' ],
        fail: [ '-a9F' ],
      },
      alpha: {
        ok:   [ 'asdfD' ],
        fail: [ '9' ],
      },
      numeric: {
        ok:   [ '134' ],
        fail: [ 'a' ],
      },
      word: {
        ok:   [ 'a9_A' ],
        fail: [ '?' ],
      },
    }

    describe('integer', function(){
      all_string_tests
    })

  })


  describe('other', function(){

    let all_other_tests = {
      length:{
        ok:   [ ['testing', 7, 8], ['testing', 6, 7], ['testing', 7] ],
        fail: [ ['testing', 8], ['testing',5,6], ['testing',8,9] ],
        error: /has a length of \d+ and/
      },
      testing: {
        ok:   [ true, true ],
        fail: [ false, true ],
      },
      true: {
        ok:   [],
        fail: [],
      },
      //false:      [], // this will always false
    }

    describe('other', function(){
      all_other_tests
    })

    describe('instance of ', function(){

      let chk 

      before(function(){
        chk = Check.generate({ fields: { io: { type: 'instanceof', args: [ Array ] }} })
        debug(chk)
      })

      it('should check string', function(){
        expect( chk({ io: [] })).to.be.ok
      })

      it('should check string', function(){
        expect( ()=> chk({ io: {} })).to.throw(/is not an instance of Array/)
      })

    })


    describe('length 7', function(){

      let chk 

      before(function(){
        chk = Check.generate({ fields: { len: { type: 'length', args: [ 7 ]}} })
        debug(chk)
      })
        
      it('should be ok with 7', function(){
        expect( chk({len: 'testing'}) ).to.be.ok
      })

      it('should fail with 8', function(){
        expect( ()=> chk({ len: 'testinga' }) ).to.throw(/len has a length of 8 but must be 7/)
      })

      it('should fail with 6', function(){
        expect( ()=> chk({ len: 'testin' }) ).to.throw(/len has a length of 6 but must be 7/)
      })

    })

    describe('length bad', function(){

      it('should fail with no args', function(){
        let fn = ()=> Check.generate({ fields: { len: { type: 'length' }} })
        expect( fn ).to.throw(/no args supplied in config/i)
      })

      it('should fail with args undefined', function(){
        let fn = ()=> Check.generate({ fields: { len: { type: 'length', args: undefined }} })
        expect( fn  ).to.throw(/no args supplied in config/i)
      })

      it('should fail with an arg of undefined', function(){
        let chk = Check.generate({ fields: { len: { type: 'length', args: [undefined] }} })
        expect( ()=> chk({ len: 'test' }) ).to.throw(/length check requires a single length or a min and max/)
      })

    })

    describe('length range 7 -> 8', function(){

      let chk 

      before(function(){
        chk = Check.generate({ fields: { len: { type: 'length', args: [ 7, 8 ]}} })
        debug(chk)
      })
        
      it('should be ok with 7', function(){
        expect( chk({len: 'testing'}) ).to.be.ok
      })

      it('should be ok with 8', function(){
        expect( chk({ len: 'testinga' }) ).to.be.ok
      })

      it('should fail with 6', function(){
        expect( ()=> chk({ len: 'testin' }) ).to.throw(/len has a length of 6 but must be from 7 to 8/)
      })

      it('should fail with 10', function(){
        expect( ()=> chk({ len: 'testingano' }) ).to.throw(/len has a length of 10 but must be from 7 to 8/)
      })

    })

    describe('length range bad', function(){

      it('should fail with no args', function(){
        let fn = ()=> Check.generate({ fields: { len: { type: 'length' }} })
        expect( fn ).to.throw(/no args supplied in config/i)
      })

      it('should fail with args undefined', function(){
        let fn = ()=> Check.generate({ fields: { len: { type: 'length', args: undefined }} })
        expect( fn  ).to.throw(/no args supplied in config/i)
      })

      it('should fail with an arg of unedefined', function(){
        let chk = Check.generate({ fields: { len: { type: 'length', args: [undefined] }} })
        expect( ()=> chk({ len: 'test' }) ).to.throw(/length check requires a single length or a min and max/)
      })

    })

  })
})