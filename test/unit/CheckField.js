/* global expect */

const { CheckField } = require('../../src/CheckField')

describe('CheckField', function(){

  it('should load', function(){
    expect( CheckField ).to.be.ok
  })

  it('should fail to create an empty instance', function(){
    expect( ()=> new CheckField() ).to.throw(/No field name/)
  })

  it('should fail to create an instance without config', function(){
    expect( ()=> new CheckField('name') ).to.throw(/No field config/)
  })

  it('should fail to create an instance without check', function(){
    expect( ()=> new CheckField('name', {}) ).to.throw(/No parent check instance for new field/)
  })

  it('should create a new instance', function(){
    expect( new CheckField('name', {}, {}) ).to.instanceof(CheckField)
  })

  it('should create a new instance', function(){
    let chk = new CheckField('name', {}, {})
    expect( chk.function ).to.throw(/No object was passed in to check the field against/)
  })

  it('should fail to create a new instance with a bad exception', function(){
    let fn = ()=> new CheckField('name', { exception: undefined }, {})
    expect( fn ).to.throw(/The custom exception must have a value/)
  })

  it('should fail to create a new instance with a bad exception', function(){
    let fn = ()=> new CheckField('name', { exception: 'test' }, {})
    expect( fn ).to.throw(/The custom exception must be a constructor with a prototype/)
  })

  it('should create a new instance', function(){
    let chk = new CheckField('name', { exception: Error }, {})
    expect( chk.function ).to.throw(/No object was passed in to check the field against/)
  })

  describe('instance', function(){

    let chk

    beforeEach(function(){
      chk = new CheckField('name', { exception: Error }, {})
    })

    it('should fail to set a bad parent check', function(){
      expect( ()=> chk.parent_check = undefined ).to.throw(/The parent Check instance must have a value/)
    })

    it('should fail to set exception to some random constructor', function(){
      class NotAnError {}
      expect( ()=> chk.exception = NotAnError ).to.throw(/The custom exception must be an instance of Error/)
    })

    it('should set a config_source on creation', function(){
      chk = new CheckField('name', { config_source: '1.js:15' }, {})
      expect( chk.config_source ).to.equal( '1.js:15' )
    })

  })

})