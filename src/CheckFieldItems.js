import noop from 'lodash/noop'
import forEach from 'lodash/forEach'

import debugr from 'debug'
const _debug = debugr('mhio:check:CheckFieldItems')
let debug = (_debug.enabled) ? _debug : noop

import { CheckException, CheckFailed, Exception } from './exceptions'
export { CheckFailed, CheckException, Exception }


/** Check a collection */
export class CheckFieldItems {

  static buildFunction( field ){
    let { field_name, label, config_source, exception, messageFn, check } = field
    let field_test_type = field.type

    // If there's an overall check label, use it for the exception
    let exception_prefix = check.label_with_space

    debug('CheckFieldItems - prop[%s] label[%s] type[%s]', field_name, label, field_test_type)

    let test_function = field.test
    let value_arg_name = field.argument_names[0]

    return function checkPropertyItems(incoming_data){
      debug('incoming_data', incoming_data, field_name)
      
      forEach(incoming_data, data => {
        let res = test_function(data)
        if ( res !== true ) {
          let message_props = {
            from: config_source,
            name: field_name,
            type: typeof data
          }
          // Allow varible name for the value
          message_props[value_arg_name] = data
          let test_message = messageFn(message_props)
          throw new exception(
            `${exception_prefix}${label} failed the ${field_test_type} check: ${test_message}`,
            { detail: message_props }
          )
        }
      })
      return incoming_data
    }

  }

}