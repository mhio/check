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

  describe('instance', function(){
    
    let fc

    beforeEach(function(){
      fc = new FieldConfig('yay', { label: 'Yay', type: 'string', check: 'length' })
    })

    it('should create a config instance', function(){
      expect(fc).to.be.ok
    })


    it('should have a type', function(){
      expect( fc.type ).to.equal('string')
    })

    it('should fail to set a blank type', function(){
      expect( ()=> fc.type = undefined ).to.throw(/Type definition must be a string. Recieved "undefined"/)
    })

    it('should fail to set a type that\'s not a string', function(){
      expect( ()=> fc.type = Array ).to.throw(/Type definition must be a string. Recieved "function"/)
    })

    it('should fail to set a non existant type', function(){
      expect( ()=> fc.type = 'unkownasdfa' ).to.throw(/No type "unkownasdfa" available for field "yay"/)
    })


    it('should have a type test function', function(){
      expect( fc.type_test ).to.be.a('function')
    })

    it('should fail to set to something other than a function', function(){
      expect( ()=> fc.type_test = undefined ).to.throw(/The type test for "yay" must be a function/)
    })


    it('should have a type test function', function(){
      expect( fc.type_messageFn ).to.be.a('function')
    })

    it('should fail to set to something other than a function', function(){
      expect( ()=> fc.type_messageFn = undefined ).to.throw(/The type message for "yay" must be a function/)
    })


    it('should have a check', function(){
      expect( fc.check ).to.equal('length')
    })

    it('should fail to set a blank check', function(){
      expect( ()=> fc.check = undefined ).to.throw(/Check definition must be a string. Recieved "undefined"/)
    })

    it('should fail to set a check that\'s not a string', function(){
      expect( ()=> fc.check = Array ).to.throw(/Check definition must be a string. Recieved "function"/)
    })

    it('should fail to set a non existant check', function(){
      expect( ()=> fc.check = 'unkownasdfa' ).to.throw(/No check "unkownasdfa" available for field "yay"/)
    })


    it('should have a check test function', function(){
      expect( fc.check_test ).to.be.a('function')
    })

    it('should fail to set to something other than a function', function(){
      expect( ()=> fc.check_test = undefined ).to.throw(/The check test for "yay" must be a function/)
    })


    it('should have a check test function', function(){
      expect( fc.check_messageFn ).to.be.a('function')
    })

    it('should fail to set to something other than a function', function(){
      expect( ()=> fc.check_messageFn = undefined ).to.throw(/The check message for "yay" must be a function/)
    })

  })

})