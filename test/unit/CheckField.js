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
    expect( ()=> new CheckField('name', {}) ).to.throw(/No check instance for new field/)
  })

  it('should create a new instance', function(){
    expect( new CheckField('name', {}, {}) ).to.instanceof(CheckField)
  })

})