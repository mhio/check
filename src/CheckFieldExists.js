const noop = require('lodash/noop')
const _debug = require('debug')('mhio:check:CheckFieldExists')
/* istanbul ignore next */
const debug = (_debug.enabled) ? _debug : noop

/** The definition for a single field */
export class CheckFieldExists {

  static buildFunction(field){
    let { field_name, label, required, config_source, exception } = field

    // If there's an overall parent Check label, use it for the exception
    let exception_prefix = field.parent_check.label_with_space

    debug('CheckFieldExists - prop[%s] label[%s] req[%s]', field_name, label, required)

    return this.function = function checkProperty(incoming_data){
      if ( !incoming_data.hasOwnProperty(field_name) ) {
        debug('check field exists', field_name, required)
        if ( required === false ) return false // short circuit checks
        throw new exception(
          `${exception_prefix}No property "${field_name}" in data for "${label}"`,
          { detail: { from: config_source } }
        )
      }
      return incoming_data
    }
  }

}