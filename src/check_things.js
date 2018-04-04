// # Validate Config
import { CheckFailed } from './exceptions'
const debug = require('debug')('mhio:check:check_things')
const _size = require('lodash/size')

/**
* Contains the config for all the different validation tests
* This is loaded as `validate_config` into the `Validate` class at require time. 
*
* A lot of the tests are based on [lodash](https://lodash.com/docs/) methods.
*/
export const check_things = {

  instanceof: {
    args: [ 'object', 'cls' ],
    test: function( object, cls ){ return ( object instanceof cls ) },
    //message: '{{object}} is not an instance of {{cls}}',
    messageFn: (p)=> `${p.object} is not an instance of ${p.cls.name}`,
    requires: [ 'object' ],
  },

  // length: {
  //   args: [ 'value', 'length' ],
  //   test: ( value, length ) => {
  //     debug('value %s  length %s', value, length)
  //     if ( length === undefined ) throw new CheckFailed('The length check requires a length argument')
  //     let size = _size(value)
  //     return ( size === length )
  //   },
  //   //message: '{{name}} must be {{min}} to {{max}}'
  //   messageFn: (p) => {
  //     debug('message props', p)
  //     let msg = `${p.name} has a length of ${_size(p.value)} but must be ${p.length}`
  //     return msg
  //   },
  // },

  length: {
    args: [ 'value', 'min', 'max' ],
    test: ( value, min, max ) => {
      debug('value %s  min %s  max %s', value, min, max)
      if ( min === undefined ) {
        throw new CheckFailed('The length check requires a single length or a min and max')
      }
      if ( max === undefined ) {
        max = min
      }
      let size = _size(value)
      return ( size >= min && size <= max )
    },
    //message: '{{name}} must be {{min}} to {{max}}'
    messageFn: (p) => {
      debug('message props', p)
      let msg = `${p.name} has a length of ${_size(p.value)} but `
      msg += ( p.max === undefined ) ? `must be ${p.min}` : `must be from ${p.min} to ${p.max}`
      return msg
    },
  },

  testing: { 
    args: [ 'first', 'second' ],
    test: ( first, second ) => Boolean(first) && Boolean(second),
    message: '{{name}} testing ({{value}} && {{second}}) :D',
    group: 'testing'
  },
  true: { 
    args: [],
    test: ()=> true,
    message: 'test true',
    group: 'testing'
  },
  false: { 
    args: [],
    test: ()=> false,
    message: 'test false',
    group: 'testing'
  }


}

export { CheckFailed }