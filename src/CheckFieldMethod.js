import forEach  from 'lodash/forEach'
import debugr from 'debug'
const debug = debugr('mhio:check:Check')

import { Checks } from './Checks'
import { CheckException, CheckFailed, Exception } from './exceptions'
export { CheckFailed, CheckException, Exception }


/** Check a field that run a generic method with multiple arguments */
export class CheckFieldMethod {

  static _classInit(){
    this.types = Checks.all
  }

  constructor( type, field ){
    this.field = field
  }

  static buildFunction( field ){
    let { field_name, label, config_source, exception, messageFn, args, argument_names, requires_arguments, check } = field
    let field_test_type = field.type
    let testFn = field.test

    // If there's an overall check label, use it for the exception
    let exception_prefix = check.label_with_space

    debug('CheckFieldMethod - prop[%s] label[%s] type[%s]', field_name, label, field_test_type, args, requires_arguments )


    let test_args = []
    if ( requires_arguments ) {
      // we have extra args, create an array to unshift the 
      // value onto
      if ( !args || !args.length || args.length < 1) {
        throw new CheckException(`No args supplied in config for "${field_test_type}". Requires "${argument_names.slice(1).join(', ')}"`)
      }
      test_args = args
    }
    let value_name = argument_names[0]
    let extra_param_names = argument_names.slice(1)


    return function checkPropertyType(incoming_data){
      debug('incoming_data', incoming_data, field_name, requires_arguments)
      
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

        let test_message = messageFn(message_props)
        throw new exception(
          `${exception_prefix}${label} failed the ${field_test_type} check: ${test_message}`, {
          detail: message_props
        })
      }
      return incoming_data
    }
  }

}
CheckFieldMethod._classInit()
