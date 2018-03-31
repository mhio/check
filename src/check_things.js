// # Validate Config
import { CheckFailed } from './exceptions'

const _size = require('lodash/size')

/**
* Contains the config for all the different validation tests
* This is loaded as `validate_config` into the `Validate` class at require time. 
*
* A lot of the tests are based on [lodash](https://lodash.com/docs/) methods.
*/
export const check_things = {

  length: {
    args: ['value', 'min', 'max'],
    test: (value, min, max) => {
      if ( min === undefined ) throw new CheckFailed('Length check requires a length or min, max')
      if ( max === undefined ) max = min
      let size = _size(value)
      return ( size >= min && size <= max )
    },
    //message: '{{name}} must be {{min}} to {{max}}'
    messageFn: (p) => {
      let msg = `${p.name} has a length of ${_size(p.value)} and `
      msg += ( p.min === p.max ) ? `must be ${p.min}` : `must be from ${p.min} to ${p.max}`
      return msg
    },
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

export { CheckFailed }