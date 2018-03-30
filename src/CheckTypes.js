// # Validate Config

import { Exception } from '@mhio/exception'

const _size = require('lodash/size')
const isArray = require('lodash/isarray')
const isBoolean = require('lodash/isboolean')
const isBuffer = require('lodash/isbuffer')
const isDate = require('lodash/isdate')
const isElement = require('lodash/iselement')
const isError = require('lodash/iserror')
const isFinite = require('lodash/isfinite')
const isFunction = require('lodash/isfunction')
const isMap = require('lodash/ismap')
const isNaN = require('lodash/isnan')
const isNumber = require('lodash/isnumber')
const isObject = require('lodash/isobject')
const isPlainObject = require('lodash/isplainobject')
const isRegExp = require('lodash/isregexp')
const isSafeInteger = require('lodash/issafeinteger')
const isSet = require('lodash/isset')
const isString = require('lodash/isstring')
const isSymbol = require('lodash/issymbol')
const isTypedArray = require('lodash/istypedarray')
const isWeakMap = require('lodash/isweakmap')
const isWeakSet = require('lodash/isweakset')
const isNil = require('lodash/isnil')
const isEmpty = require('lodash/isempty')
const isUndefined = require('lodash/isundefined')
const isInteger = require('lodash/isinteger')


/** 
* If you have a common template string that is replaced a
* lot, compile it first to remove some of the repeated string
* processing.
* @param {string} str - Template string to compile `a {{param}} replacer`
* @param {object} options - Options
* @param {RegExp} options.re - Regular Expression for the param tags to be replaced
* @returns {function} Templating function
*/
export function compileObjectTemplate( str, options = {} ){
  let re = options.re || /({{(\w+?)}})/  //Note the two capture groups.
  let arr = str.split(re)
  let end = arr.length
  let return_arr = new Array(arr.length)
  let templateCompiledObject = function templateCompiledObject( params ){
    for ( let i = 0; i < end; i+=3 ){
      return_arr[i] = arr[i]
      let p = params[arr[i+2]]
      if ( p === undefined ) p = arr[i+1] // Leave {{param}} in there
      return_arr[i+1] = p // 1600k
    }
    return return_arr.join('')
  }
  templateCompiledObject.string = str
  return templateCompiledObject
}

/**
* Contains the config for all the different validation tests
* This is loaded as `validate_config` into the `Validate` class at require time. 
*
* A lot of the tests are based on [lodash](https://lodash.com/docs/) methods.
*/
export const CheckTypes = {

  // It got a bit too meta here
  // this.type = {
  //   args: ['type', 'value', '...args'],
  //   test: ( type, value, ...args ) => Validate.type( type, value, ...args ),
  //   //message: '{{name}} {{type}} mismatch for {{value}}'
  //   message: (params) => Validate.typeMessage(params.test)
  // },

  array: {
    args: ['value'],
    test: isArray,
    message: '{{name}} must be an array',
    group: 'language'
  },
  boolean: {
    args: ['value'],
    test: isBoolean,
    message: '{{name}} must be a boolean',
    group: 'language'
  },
  buffer: {
    args: ['value'],
    test: isBuffer,
    message: '{{name}} must be a buffer',
    group: 'language'
  },
  date: {
    args: ['value'],
    test: isDate,
    message: '"{{name}}" must be a "date" but recieved "{{type}}"',
    group: 'language'
  },
  element: {
    args: ['value'],
    test: isElement,
    message: '"{{name}}" must be a DOM Element',
    group: 'language'
  },
  error: {
    args: ['value'],
    test: isError,
    message: '{{name}} must be an error',
    group: 'language'
  },
  exception: {
    args: ['value'],
    test: (value) => ( value instanceof Exception ),
    message: '{{name}} must be an Exception',
    group: 'language'
  },
  finite: {
    args: ['value'],
    test: isFinite,
    message: '{{name}} must be finite'
  },
  function: {
    args: ['value'],
    test: isFunction,
    message: '{{name}} must be a function',
    group: 'language'
  },
  map: {
    args: ['value'],
    test: isMap,
    message: '{{name}} must be a map',
    group: 'language'
  },
  nan: {
    args: ['value'],
    test: isNaN,
    message: '{{name}} must be Not A Number',
    group: 'language'
  },
  number: {
    args: ['value'],
    test: isNumber,
    message: '"{{name}}" must be a "number" but recieved "{{type}}"',
    //messageFn: p => `"${p.name}" must be a "number" but recieved "${typeof p.value}"`,
    group: 'language'
  },
  object: {
    args: ['value'],
    test: isObject,
    message: '{{name}} must be an object',
    group: 'language'
  },
  plainobject: {
    args: ['value'],
    test: isPlainObject,
    message: '{{name}} must be a plain object',
    group: 'language'
  },
  regexp: {
    args: ['value'],
    test: isRegExp,
    message: '{{name}} must be a Regular Expression',
    group: 'language'
  },
  safeinteger: {
    args: ['value'],
    test: isSafeInteger,
    negate: 'an unsafe integer',
    message: '{{name}} must be a safe integer'
  },
  set: {
    args: ['value'],
    test: isSet,
    message: '{{name}} must be a set',
    group: 'language'
  },
  string: {
    args: ['value'],
    test: isString,
    //message: '{{name}} must be a string',
    messageFn: p => `"${p.name}" must be a "string" but recieved "${typeof p.value}"`,
    group: 'language'
  },
  symbol: {
    args: ['value'],
    test: isSymbol,
    message: '{{name}} must be a symbol',
    group: 'language'
  },
  typedarray: {
    args: ['value'],
    test: isTypedArray,
    message: '{{name}} must be a typed array',
    group: 'language'
  },
  weakmap: {
    args: ['value'],
    test: isWeakMap,
    message: '{{name}} must be a weak map',
    group: 'language'
  },
  weakset: {
    args: ['value'],
    test: isWeakSet,
    message: '{{name}} must be a weak set',
    group: 'language'
  },
  nil: { 
    args: ['value'],
    test: isNil,
    message: '{{name}} must be nil'
  },
  notNil: { 
    args: ['value'],
    test: (value) => !isNil(value),
    message: '{{name}} must not be nil'
  },
  empty: { 
    args: ['value'],
    test: isEmpty,
    join: '',
    name: 'Value',
    message: '{{name}} must be empty'
  },
  notEmpty: { 
    args: ['value'],
    test: (value) => !isEmpty(value),
    join: '',
    name: 'Value',
    message: '{{name}} must not be empty'
  },
  undefined: { 
    args: ['value'],
    test: isUndefined,    
    negate: 'defined',  
    name: 'Value',
    message: '{{name}} must be undefined'
  },
  defined: { 
    args: ['value'],
    test: (val) => !isUndefined(val),
    negate: 'undefined',
    name: 'Value',
    message: '{{name}} must be defined',
  },


  length: {
    args: ['value', 'min', 'max'],
    test: (value, min, max) => {
      if (max === undefined ) max = min
      let size = _size(value)
      return ( size >= min && size <= max )
    },
    //message: '{{name}} must be {{min}} to {{max}}'
    messageFn: (p) => {
      let msg = `${p.name} has length ${_size(p.value)}.`
      msg += ( p.min === p.max ) ? ` Must be ${p.min}` : ` Must be ${p.min} to ${p.max}`
      return msg
    },
  },


  integer: {
    args: ['value'],
    test: isInteger,
    message: '"{{name}}" must be an "integer" but recieved "{{type}}"',
    group: 'number'
  },
  range: {
    args: ['value','min','max'],
    test: (value, min, max) => ( value >= min && value <= max ),
    message: '{{name}} must be in {{min}} .. {{max}}',
    group: 'number'
  },
  between: {
    args: ['value','min','max'],
    test: (value, min, max) => ( value > min && value < max ),
    message: '{{name}} must be between {{min}} and {{max}}',
    group: 'number'
  },


  strinteger: {
    args: ['value'],
    test: (value)=> Boolean(/^[0-9]+$/.exec(value)),
    message: '{{name}} must be an integer',
    group: 'string'
  },
  match: {
    args: ['string', 'regex'],
    test: ( string, regex ) => Boolean(string.match(regex)),
    message: '{{name}} must match regular expression {{regex}}',
    group: 'string'
  },
  uuid: {
    args: ['string'],
    test: ( string ) => Boolean( 
      string.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)
    ),
    message: '{{name}} must match regular expression {{regex}}',
    group: 'string'
  },
  stuid: {
    args: ['string'],
    test: ( string ) => Boolean(string.match(/^[A-Za-z0-9]{18}$/)),
    message: '{{name}} must match regular expression {{regex}}',
    group: 'string'
  },
  alphaNumericDashUnderscore: {
    args: ['string'],
    test: (string) => Boolean(string.match(/^[A-Za-z0-9_-]+$/)),
    message: '{{name}} must only contain letters, numbers, dash and underscore [ A-Z a-z 0-9 _ - ]',
    group: 'string'
  },
  alphaNumeric: { 
    args: ['string'],
    test: (string) => Boolean(string.match(/^[A-Za-z0-9]+$/)),
    message: '{{name}} must only contain letters and numbers [ A-Z a-z 0-9 ]',
    group: 'string'
  },
  alpha: { 
    args: ['string'],
    test: (string) => Boolean(string.match(/^[A-Za-z]+$/)),
    message: '{{name}} must only contain letters [ A-Z a-z ]',
    group: 'string'
  },
  numeric: { 
    args: ['string'],
    test: (string) => Boolean(string.match(/^[0-9]+$/)),
    message: '{{name}} must only contain numbers [ 0-9 ]',
    group: 'string'
  },
  word: { 
    args: ['string'],
    test: (string) => Boolean(string.match(/^\w+$/)),
    message: '{{name}} must only contain numbers [ 0-9 ]',
    group: 'string'
  },


  testing: { 
    args: ['first', 'second'],
    test: (first, second) => Boolean(first) && Boolean(second),
    message: '{{name}} testing ({{value}} && {{second}}) :D',
    group: 'testing'
  },
  true: { 
    args: [],
    test: () => true,
    message: 'test true',
    group: 'testing'
  },
  false: { 
    args: [],
    test: () => false,
    message: 'test false',
    group: 'testing'
  }

}

Object.keys(CheckTypes).forEach(key => {
  if ( typeof CheckTypes[key].message === 'string' ){
    CheckTypes[key].messageFn = compileObjectTemplate(CheckTypes[key].message)
  } 
})

export { Exception }