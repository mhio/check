/* global expect */

const { FieldConfig } = require('../../src/FieldConfig')

describe('FieldConfig', function(){

  it('should load', function(){
    expect( FieldConfig ).to.be.ok
  })

  it('should fail to create an empty instance', function(){
    expect( ()=> new FieldConfig() ).to.throw(/No field name/)
  })

  it('should fail to create an instance without config', function(){
    expect( ()=> new FieldConfig('name') ).to.throw(/No field config/)
  })

  it('should create a new instance', function(){
    expect( new FieldConfig('name', {}) ).to.instanceof(FieldConfig)
  })

  it('should throw without overriding buildFunction', function(){
    let fc = new FieldConfig('name', {})
    expect( ()=> fc.buildFunction() ).to.throw(/override/)
  })

})