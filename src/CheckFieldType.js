import forEach from 'lodash/forEach'
import debugr from 'debug'
const debug = debugr('mhio:check:Check')

import { CheckException, CheckFailed, Exception } from './exceptions'
export { CheckFailed, CheckException, Exception }


/** Check the type of a field */
export class CheckFieldType {

  static buildFunction( field ){
    let { field_name, label, config_source, exception, messageFn, check } = field
    let field_test_type = field.type

    // If there's an overall check label, use it for the exception
    let exception_prefix = check.label_with_space

    debug('CheckFieldType - prop[%s] label[%s] type[%s]', field_name, label, field_test_type)

    let test_function = field.test
    let value_arg_name = field.argument_names[0]

    return function checkPropertyType(incoming_data){
      debug('incoming_data', incoming_data, field_name)
      
      let res = test_function(incoming_data[field_name])
      if ( res !== true ) {
        let message_props = {
          from: config_source,
          name: field_name,
          type: typeof incoming_data[field_name]
        }
        // Allow varible name for the value
        message_props[value_arg_name] = incoming_data[field_name]
        let test_message = messageFn(message_props)
        throw new exception(
          `${exception_prefix}${label} failed the ${field_test_type} check: ${test_message}`,
          { detail: message_props }
        )
      }
      return incoming_data
    }

  }

}
