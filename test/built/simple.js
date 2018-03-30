/* global expect */
const { Check, CheckType, CheckFailed } = require('../../')

describe('mhio::test::built::check', function(){

  it('should require the files', function(){
    expect(Check).to.be.a('function')
    expect(CheckType).to.be.a('function')
    expect(CheckFailed).to.be.a('function')
  })

  describe('connections', function(){
  
    let simple_config, simple_data, empty_data

    beforeEach(function(){
      simple_config = { 
        fields: { one: { label: 'One' } }
      }
      simple_data = { one: 'Nice' }
      empty_data = {}
    })

    it('should succesfully check a simple field/value', function(){
      let fn = Check.generate(simple_config) 
      expect( fn ).to.be.a('function')
      expect( fn(simple_data) ).to.eql(simple_data)
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

})
