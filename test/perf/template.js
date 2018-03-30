const Benchmark = require('benchmark')
const expect = require('chai').expect
const debug = require('debug')('mhio:test:check:perf:template')

let template_str = 'string{{what}}string{{where}}string{{when}}string{{el}}string{{that}}'
let output_str = 'stringtest1stringtest2stringtest3stringtest4stringtest5'
let dot_template_str = 'string{{= it.what}}string{{= it.where}}string{{= it.when}}string{{= it.el}}string{{= it.that}}'

// template_str = 'string{{what}}string{{where}}string{{when}}string{{el}}string'
// output_str = 'stringtest1stringtest2stringtest3stringtest4string'
// dot_template_str = 'string{{= it.what}}string{{= it.where}}string{{= it.when}}string{{= it.el}}string'

template_str = '{{what}}string{{where}}string{{when}}string{{el}}string'
output_str = 'test1stringtest2stringtest3stringtest4string'
dot_template_str = '{{= it.what}}string{{= it.where}}string{{= it.when}}string{{= it.el}}string'


let param_object = { what: 'test1', where: 'test2', when: 'test3', el: 'test4', that: 'test5' }
let param_array = [ 'test1', 'test2', 'test3', 'test4', 'test5' ]

const Mustache = require('mustache')
Mustache.parse(template_str)

const dot = require('dot')
const dot_compiled = dot.template(dot_template_str)

const _template = require('lodash/template')
const lodash_compiled = _template(template_str, { interpolate: /{{([\s\S]+?)}}/g })

// function compileObject( str ){
//   let arr = str.split(/{{(\w+)}}/)
//   debug(arr)
//   let end = arr.length
//   let return_str = ''
//   let return_arr = new Array(arr.length)
//   return function(params){
//     //return arr[0] + params[arr[1]] + arr[2] + params[arr[3]] + arr[4] + params[arr[5]] + arr[6] + params[arr[7]] + arr[8] + params[arr[9]] // 6670k
//     for ( let i = 0; i < end; i+=2 ){
//       //return_str += arr[i] + params[arr[i+1]]  // 447k
//       //return_str += `${arr[i]}${params[arr[i+1]]}` // 490k  
//       //return_str = `${return_str}${arr[i]}${params[arr[i+1]]}` // 474k
//       return_arr[i] = arr[i]
//       return_arr[i+1] = params[arr[i+1]] // 1600k
//     }
//     return return_arr.join('')
//     return return_str
//   }
// }

/** 
* If you have a common template string that is replaced a
* lot, compile it first to remove some of the repeated string
* processing.
* @param {string} str - Template string to compile `a {{param}} replacer`
* @param {object} options - Options
* @param {RegExp} options.re - Regular Expression for the param tags to be replaced
* @returns {function} Templating function
*/
function compileObject( str, options = {} ){
  let re = options.re || /{{(\w+)}}/  //Note the capture group for the word
  let arr = str.split(re)
  debug(arr)
  let end = arr.length
  let return_arr = new Array(arr.length)
  return function replaceObject( params ){
    for ( let i = 0; i < end; i+=2 ){
      return_arr[i] = arr[i]
      return_arr[i+1] = params[arr[i+1]] // 1600k
    }
    return return_arr.join('')
  }
}
const compiledObject = compileObject( template_str )

/** 
* Replace `{{param}}`s in a string
* @param {string} str - Template string to replace
* @param {object} params - Values for param replacement
* @returns {string} Templated string
*/
function replaceObject( str, params ){
  return str.replace(
    /{{(\w+)}}/g,
    function( m, key ){
      return params.hasOwnProperty( key ) ? params[key] : m
    }
  )
}

function replaceArray( str, params ){
  let i = 0
  return str.replace(
    /{{(\w+)}}/g,
    function( m ){
      let str = params[i] || m
      i++
      return str
    }
  )
}



let suite = new Benchmark.Suite()

let res = null
expect( compiledObject(param_object), 'compiledObject' )
  .to.equal(output_str)
expect( lodash_compiled(param_object), '_.template' )
  .to.equal(output_str)
expect( Mustache.render(template_str, param_object), 'Mustache' )
  .to.equal(output_str)
expect( dot_compiled(param_object), 'dot' )
  .to.equal(output_str)
expect( replaceObject(template_str, param_object), 'replaceObject' )
  .to.equal(output_str)
expect( replaceArray(template_str, param_array), 'replaceArray' )
  .to.equal(output_str)


suite.add('_.template obj', function testA(){
  res = lodash_compiled(param_object)
})
suite.add('Mustache', function testA(){
  res = Mustache.render(template_str, param_object)
})
suite.add('dot', function testA(){
  res = dot_compiled(param_object)
})
suite.add('replaceObject', function testB(){
  res = replaceObject(template_str, param_object)
})
suite.add('compiledObject', function testB(){
  res = compiledObject(param_object)
})
suite.add('replaceArray', function testB(){
  res = replaceArray(template_str, param_array)
})

.on('cycle', event => console.log(String(event.target)) ) // eslint-disable-line no-console
.on('error', error => console.error('error', error.target.error) )// eslint-disable-line no-console
.on('complete', function(){ 
  console.log('Fastest is ' + this.filter('fastest').map('name')) // eslint-disable-line no-console
})
.run({ 'async': false })

debug(res)
