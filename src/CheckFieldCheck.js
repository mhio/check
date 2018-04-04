import forEach  from 'lodash/forEach'
import noop  from 'lodash/noop'
import debugr from 'debug'
const _debug = debugr('mhio:check:CheckFieldCheck')
/* istanbul ignore next */
const debug = (_debug.enabled) ? _debug : noop

import { CheckException, CheckFailed, Exception } from './exceptions'
export { CheckFailed, CheckException, Exception }


/** Check a field that run a generic method with multiple arguments */
export class CheckFieldCheck {

  static buildFunction( field ){
    let { field_name, label, config_source, exception, check_messageFn, args, argument_names, requires_arguments, parent_check } = field
    let field_check_name = field.check
    let testFn = field.check_test

    // If there's an overall check label, use it for the exception
    let exception_prefix = parent_check.label_with_space

    debug('CheckFieldCheck - prop[%s] label[%s] type[%s]', field_name, label, field_check_name, args, requires_arguments )


    let test_args = []
    if ( requires_arguments ) {
      // we have extra args, create an array to unshift the 
      // value onto
      if ( !args || !args.length || args.length < 1) {
        throw new CheckException(`No args supplied in config for "${field_check_name}". Requires "${argument_names.slice(1).join(', ')}"`)
      }
      test_args = args
    }
    let value_name = argument_names[0]
    let extra_param_names = argument_names.slice(1)


    return function checkProperty(incoming_data){
      debug('incoming_data [%s] reqargs[%s]', field_name, requires_arguments, incoming_data)
      
      let res = testFn(incoming_data[field_name], ...test_args)
      if ( res !== true ) {
        let message_props = {
          from: config_source,
          name: field_name,
          type: typeof incoming_data[field_name]
        }
        // Allow varible name for the value
        message_props[value_name] = incoming_data[field_name]
        // Attach the args the test was setup with as named args
        forEach(extra_param_names, (arg_name, i) => {
          message_props[arg_name] = args[i]
        })
        // Check config describes names or args in `.args`, shift `value`.
        // user check config describes values of args in an array

        let test_message = check_messageFn(message_props)
        throw new exception(
          `${exception_prefix}${label} failed the ${field_check_name} check: ${test_message}`, {
          detail: message_props
        })
      }
      return incoming_data
    }
  }

}
