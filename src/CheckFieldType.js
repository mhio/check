import noop from 'lodash/noop'
import debugr from 'debug'
const _debug = debugr('mhio:check:CheckFieldType')
/* istanbul ignore next */
let debug = (_debug.enabled) ? _debug : noop

import { CheckException, CheckFailed, Exception } from './exceptions'
export { CheckFailed, CheckException, Exception }


/** Check the type of a field */
export class CheckFieldType {

  static buildFunction( field ){
    let { field_name, label, config_source, exception, type_messageFn, parent_check } = field
    let field_test_type = field.type

    // If there's an overall check label, use it for the exception
    let exception_prefix = parent_check.label_with_space

    debug('CheckFieldType - prop[%s] label[%s] type[%s]', field_name, label, field_test_type)

    let typeTest = field.type_test

    return function checkPropertyType(incoming_data){
      debug('incoming_data', incoming_data, field_name)
      
      let res = typeTest(incoming_data[field_name])
      if ( res !== true ) {
        let message_props = {
          value:  incoming_data[field_name],
          name:   field_name,
          type:   typeof incoming_data[field_name]
        }
        // Allow varible name for the value
        message_props.value = incoming_data[field_name]
        let test_message = type_messageFn(message_props)
        throw new exception(
          `${exception_prefix}${label} failed the ${field_test_type} check: ${test_message}`,
          { field: field_name, check: field_test_type, from: config_source, detail: message_props },
        )
      }
      return incoming_data
    }

  }

}