/* global expect */

const { Element } = require('../fixture/Element')
const { Check, CheckFailed, Exception} = require('../../src/Check')

describe('Integration::mhio::Check', function(){

  let fn, more_config

  beforeEach(function(){
    more_config = { 
      fields: { 
        one:      { label: 'One' },
        two:      { label: 'Two',     required: false },
        eight:    { label: 'Eight',   type: 'array',    required: false  },
        nine:     { label: 'Nine',    type: 'boolean',  required: false  },
        ten:      { label: 'Ten',     type: 'buffer',   required: false  },
        six:      { label: 'Six',     type: 'date',     required: false  },
        seven:    { label: 'Seven',   type: 'element',  required: false  },
        eleven:   { label: 'Eleven',  type: 'error',    required: false  },
        twelve:   { label: 'Twelve',  type: 'exception', required: false  },
        thirtee:  { label: 'Thirtee', type: 'finite',   required: false  },
        fourtee:  { label: 'Fourtee', type: 'function', required: false  },
        five:     { label: 'Five',    type: 'integer',  required: false  },
        fifteen:  { label: 'Fifteen', type: 'map',      required: false  },
        sixteen:  { label: 'Sixteen', type: 'nan',      required: false  },
        for:      { label: 'Four',    type: 'number',   required: false  },
        thr:      { label: 'Thr',     type: 'string',   required: false  },
      }
    }
    fn = Check.generate(more_config) 
  })

  it('should succesfully check a number field/value', function(){
    let data = { one: 'won', for: 4}
    expect( fn ).to.be.a('function')
    expect( fn(data) ).to.eql(data)
  })

  it('should succesfully check a number field/value', function(){
    let data = { one: 'won', for: 'for' }
    expect( ()=> fn(data) ).to.throw(/"for" must be a "number" but recieved "string"/)
  })

  it('should succesfully check a integer field/value', function(){
    let data = { one: 'won', five: 5}
    expect( fn(data) ).to.eql(data)
  })

  it('should succesfully check a integer field/value', function(){
    let data = { one: 'won', five: '5' }
    expect( ()=> fn(data) ).to.throw(/" must be an "integer" but recieved "string"/)
  })

  it('should succesfully check a date field/value', function(){
    let data = { one: 'won', six: new Date()}
    expect( fn(data) ).to.eql(data)
  })

  it('should succesfully check a date field/value', function(){
    let data = { one: 'won', six: Date.now() }
    expect( ()=> fn(data) ).to.throw(/" must be a "date" but recieved "number"/)
  })

  it('should succesfully check a element field/value', function(){
    let data = { one: 'won', seven: new Element()}
    expect( fn(data) ).to.eql(data)
  })

  it('should succesfully check a element field/value', function(){
    let data = { one: 'won', seven: {} }
    expect( ()=> fn(data) ).to.throw(/" must be a DOM Element/)
  })

  it('should succesfully check a error field/value', function(){
    let data = { one: 'won', eleven: new Error()}
    expect( fn(data) ).to.eql(data)
  })

  it('should succesfully check a error field/value', function(){
    let data = { one: 'won', eleven: {} }
    expect( ()=> fn(data) ).to.throw(/" must be an Error/)
  })

  it('should succesfully check a error field/value', function(){
    let data = { one: 'won', twelve: new Exception()}
    expect( fn(data) ).to.eql(data)
  })

  it('should succesfully check a error field/value', function(){
    let data = { one: 'won', twelve: {} }
    expect( ()=> fn(data) ).to.throw(/" must be an instance of Exception/)
  })

})