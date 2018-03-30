/* global expect */

const { Check, CheckFailed } = require('../../src/Check')

describe('Check', function(){

  it('should load', function(){
    expect( Check ).to.be.ok
  })

  it('should generate a check function', function(){
    expect( Check.generate({}) ).to.be.a('function')
  })

  it('should fail to generate a check function', function(){
    expect( ()=> Check.generate() ).to.throw(/No Check config to generate function/)
  })

  let simple_config, simple_data, two_config, empty_data

  beforeEach(function(){
    simple_config = { 
      fields: { 
        one: { label: 'One' }
      }
    }
    two_config = { 
      fields: { 
        one: { label: 'One' },
        two: { label: 'Two', required: false },
      }
    }
    simple_data = { one: 'Nice' }
    empty_data = {}
  })

  it('should succesfully check a simple field/value', function(){
    let fn = Check.generate(simple_config) 
    expect( fn ).to.be.a('function')
    expect( fn(simple_data) ).to.eql(simple_data)
  })

  it('should error on check of a missing field', function(){
    let fn = Check.generate(simple_config) 
    expect( fn ).to.be.a('function')
    expect( ()=> fn(empty_data) ).to.throw(/No property "one" in data for "One"/)
  })

  it('should error on check of a missing field with a custom label', function(){
    simple_config.label = 'IMALABEL'
    let fn = Check.generate(simple_config) 
    expect( fn ).to.be.a('function')
    expect( ()=> fn(empty_data) ).to.throw(/IMALABEL No property "one" in data for "One"/)
  })

  it('should throw a custom exception', function(){
    simple_config.exception = Error
    let fn = Check.generate(simple_config) 
    expect( fn ).to.throw(Error)
    expect( Check.generate([{ property: 'one' }]) ).to.be.a('function')
  })

  it('should not error when a field is not required', function(){
    simple_config = { fields: {
      one: { label: 'One', required: false }
    }}
    let fn = Check.generate(simple_config) 
    expect( fn(empty_data) ).to.eql(empty_data)
  })

})