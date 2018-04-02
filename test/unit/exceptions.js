/* global expect */

const { Exception, CheckException, CheckFailed } = require('../../src/exceptions')

describe('Exception', function(){

  it('should load Exception', function(){
    expect( Exception ).to.be.ok
  })

})

describe('CheckException', function(){

  it('should load', function(){
    expect( CheckException ).to.be.ok
  })

  it('should create an instance', function(){
    expect( new CheckException() ).to.be.ok
  })

  it('should create an instance', function(){
    expect( new CheckException('message') ).to.be.ok
  })

  let errfn = ()=> new Error()

  it('should find the source line for an error', function(){
    //console.log(err.stack)
    let fn = ()=> CheckException.source(errfn()) 
    expect( fn() ).to.match(/test\/unit\/exceptions/)
  })

  it('should fail to get a source line without an error', function(){
    expect( ()=> CheckException.source() ).to.throw(/No error to generate a source/)
  })

  it('should fail to get a source line without an error', function(){
    let e = { stack: 'one' }
    expect( ()=> CheckException.source(e) ).to.throw(/Incoming Error stack doesn/)
  })

  it('should fail to get a source line without an error', function(){
    let e = { stack: 'one\ntwo\nthree' }
    expect( ()=> CheckException.source(e) ).to.throw(/Second line of stack/)
  })

})

describe('CheckFailed', function(){

  it('should load', function(){
    expect( CheckFailed ).to.be.ok
  })

  it('should create a new instance', function(){
    expect( new CheckFailed() ).to.instanceof(CheckFailed)
  })

  it('should create a new instance', function(){
    expect( new CheckFailed('message') ).to.instanceof(CheckFailed)
  })

})