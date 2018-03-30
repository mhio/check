
import { Exception } from '@mhio/exception'

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
* Contains all the lodash checksm and a couple more
*
* A lot of the tests are based on [lodash](https://lodash.com/docs/) methods.
*/
export const CheckTypes = {

  array: {
    args: ['value'],
    test: isArray,
    message: '"{{name}}" must be an Array',
    group: 'language'
  },
  boolean: {
    args: ['value'],
    test: isBoolean,
    message: '"{{name}}" must be a Boolean',
    group: 'language'
  },
  buffer: {
    args: ['value'],
    test: isBuffer,
    message: '"{{name}}" must be a Buffer',
    group: 'language'
  },
  date: {
    args: ['value'],
    test: isDate,
    message: '"{{name}}" must be a Date but recieved "{{type}}"',
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
    message: '"{{name}}" must be an Error',
    group: 'language'
  },
  exception: {
    args: ['value'],
    test: ( value ) => ( value instanceof Exception ),
    message: '"{{name}}" must be an instance of Exception',
    group: 'language'
  },
  finite: {
    args: ['value'],
    test: isFinite,
    message: '"{{name}}" must be finite'
  },
  function: {
    args: ['value'],
    test: isFunction,
    message: '"{{name}}" must be a function',
    group: 'language'
  },
  integer: {
    args: ['value'],
    test: isInteger,
    message: '"{{name}}" must be an integer but recieved "{{type}}"',
    group: 'number'
  },
  map: {
    args: ['value'],
    test: isMap,
    message: '"{{name}}" must be a map',
    group: 'language'
  },
  nan: {
    args: ['value'],
    test: isNaN,
    message: '"{{name}}" must be NaN (Not A Number)',
    group: 'language'
  },
  number: {
    args: ['value'],
    test: isNumber,
    message: '"{{name}}" must be a number but recieved "{{type}}"',
    //messageFn: p => `"${p.name}" must be a "number" but recieved "${typeof p.value}"`,
    group: 'language'
  },
  object: {
    args: ['value'],
    test: isObject,
    message: '"{{name}}" must be an object',
    group: 'language'
  },
  plainobject: {
    args: ['value'],
    test: isPlainObject,
    message: '"{{name}}" must be a plain object',
    group: 'language'
  },
  regexp: {
    args: ['value'],
    test: isRegExp,
    message: '"{{name}}" must be a Regular Expression',
    group: 'language'
  },
  safeinteger: {
    args: ['value'],
    test: isSafeInteger,
    negate: 'an unsafe integer',
    message: '"{{name}}" must be a safe integer'
  },
  set: {
    args: ['value'],
    test: isSet,
    message: '"{{name}}" must be a set',
    group: 'language'
  },
  string: {
    args: ['value'],
    test: isString,
    //message: '"{{name}}" must be a string',
    messageFn: p => `"${p.name}" must be a string but recieved "${typeof p.value}"`,
    group: 'language'
  },
  symbol: {
    args: ['value'],
    test: isSymbol,
    message: '"{{name}}" must be a symbol',
    group: 'language'
  },
  typedarray: {
    args: ['value'],
    test: isTypedArray,
    message: '"{{name}}" must be a typed array',
    group: 'language'
  },
  weakmap: {
    args: ['value'],
    test: isWeakMap,
    message: '"{{name}}" must be a weak map',
    group: 'language'
  },
  weakset: {
    args: ['value'],
    test: isWeakSet,
    message: '"{{name}}" must be a weak set',
    group: 'language'
  },
  nil: { 
    args: ['value'],
    test: isNil,
    message: '"{{name}}" must be nil'
  },
  notNil: { 
    args: ['value'],
    test: (value) => !isNil(value),
    message: '"{{name}}" must not be nil'
  },
  empty: { 
    args: ['value'],
    test: isEmpty,
    join: '',
    name: 'Value',
    message: '"{{name}}" must be empty'
  },
  notEmpty: { 
    args: ['value'],
    test: (value) => !isEmpty(value),
    join: '',
    name: 'Value',
    message: '"{{name}}" must not be empty'
  },
  undefined: { 
    args: ['value'],
    test: isUndefined,    
    negate: 'defined',  
    name: 'Value',
    message: '"{{name}}" must be undefined'
  },
  defined: { 
    args: ['value'],
    test: (val) => !isUndefined(val),
    negate: 'undefined',
    name: 'Value',
    message: '"{{name}}" must be defined',
  },
}

export { Exception }