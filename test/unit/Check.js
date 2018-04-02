/* global expect */

const { Check, CheckFailed, Exception } = require('../../src/Check')

describe('Check', function(){

  it('should load', function(){
    expect( Check ).to.be.ok
  })

  it('should load types', function(){
    expect( Check.types ).to.be.ok
  })

  it('should load', function(){
    expect( new CheckFailed() ).to.be.an.instanceof( Exception )
  })

  it('should generate a check function', function(){
    expect( Check.generate({ fields:{} }) ).to.be.a('function')
  })

  it('should fail to generate a check function', function(){
    expect( ()=> Check.generate() ).to.throw(/No Check config to generate function/)
  })

  it('should attach a source line from the calling function', function(){
    let fn = Check.generate({ fields: {} }) 
    expect( fn._check.config_source ).to.match(/test\/unit\/Check\.js/)
  })

  it('should should add a custom config source line', function(){
    let fn = Check.generate({ fields: {} }, { config_source: 'me' }) 
    expect( fn._check.config_source ).to.equal('me')
  })

  let simple_config, simple_data, more_config, empty_data

  beforeEach(function(){
    simple_config = { 
      fields: { 
        one: { label: 'One' }
      }
    }
    more_config = { 
      fields: { 
        one: { label: 'Onne' },
        two: { label: 'Twoo', required: false },
        thr: { label: 'Thre', type: 'string', required: false  },
        for: { label: 'Four', type: 'number', required: false  },
        fiv: { label: 'Five', type: 'integer', required: false  },
        six: { label: 'Sixa', type: 'length', args: [ 6, 6 ], required: false },
        sev: { label: 'Sixa', type: 'length_range', args: [ 6, 6 ], required: false },
        //sev: { label: 'Sixa', type: 'length_range', args: { min: 6, max: 6 }, required: false },
        //eig: { label: 'Sixa', type: 'length_range', min: 5, max: 6, required: false },
        //nin: { label: 'Sixa', type: 'length', min: 5, max: 6, required: false },
        //ten: { label: 'Sixa', type: { name: 'length', min: 5, max: 6 }, required: false  },
        //ele: { label: 'Sixa', type: 'length', min: 5, max: 5, required: false },
        twe: { label: 'Sixa', type: 'match', args: [ /test/ ], required: false },
        //twe: { label: 'Sixa', type: 'match', args: { regex: /test/ }, required: false },
      },
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
    expect( Check.generate({ fields: { property: 'one' } }) ).to.be.a('function')
  })

  it('should not error when a field is not required', function(){
    simple_config = { fields: {
      one: { label: 'One', required: false }
    }}
    let fn = Check.generate(simple_config) 
    expect( fn(empty_data) ).to.eql(empty_data)
  })

  it('should succesfully check a string field/value', function(){
    let fn = Check.generate(more_config) 
    let data = { one: 'won', thr: 'three'}
    expect( fn ).to.be.a('function')
    expect( fn(data) ).to.eql(data)
  })

  it('should succesfully check a string field/value', function(){
    let fn = Check.generate(more_config) 
    let data = { one: 'won', thr: 3 }
    expect( ()=> fn(data) ).to.throw(/"thr" must be a string but recieved "number"/)
  })

  it('should succesfully check a number field/value', function(){
    let fn = Check.generate(more_config) 
    let data = { one: 'won', for: 4}
    expect( fn ).to.be.a('function')
    expect( fn(data) ).to.eql(data)
  })

  it('should succesfully check a number field/value', function(){
    let fn = Check.generate(more_config) 
    let data = { one: 'won', for: 'for' }
    expect( ()=> fn(data) ).to.throw(/"for" must be a number but recieved "string"/)
  })

})