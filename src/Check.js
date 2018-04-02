const forEach = require('lodash/forEach')
const debugr = require('debug')
const debug = debugr('mhio:check:Check')

const { Checks } = require('./Checks')
const { CheckException, CheckFailed, Exception } = require('./exceptions')



class Check {

  static _classInit(){
    this.types = Checks.all
  }

  /** Generates a function to check some data 
  * There's a lot of closure work going on here so it's a bit monolithic. 
  */
  static generate(config){
    let stack = new Error().stack.split(/\n/)[2].match(/\((.+)\)/)[1]
    debug('config was from', stack)

    let checks = []

    if (!config) throw new CheckException('No Check config to generate function')
    if (!config.fields) throw new CheckException('No "fields" in check config')

    let exception = config.exception || CheckFailed
    let checks_label = config.label || ''
    let checks_label_space = ( checks_label ) ? `${checks_label} ` : ''

    forEach(config.fields, (field, property) =>{
      let label = field.label || property
      let test_type = field.type
      if ( ! this.types[test_type] ) throw new CheckException(`No check "${test_type}" available`)
      let check_test_config = this.types[test_type]
      let test_type_args = field.args || []
      let required = ( field.hasOwnProperty('required') )
        ? Boolean(field.required)
        : true
      let this_check = []

      // don't think we need the array config any more
      // if ( Array.isArray(field) ) {
      //   [ property, label, type, restrictions ] = field
      // }
      debug('field: prop"%s" label"%s" type:"%s"', property, label, test_type, test_type_args)

      this_check.push(function checkProperty(incoming_data){
        if ( !incoming_data.hasOwnProperty(property) ) {
          if (!required) return false // short circuit checks
          throw new exception(
            `${checks_label_space}No property "${property}" in data for "${label}"`,
            { detail: { from: stack }}
          )
        }
        return incoming_data
      })

      if ( test_type !== undefined ) {
        let test_function = check_test_config.test
        if (!test_function) throw new CheckException(`No type "${test_type} available in Check`)
        let test_messageFn = check_test_config.messageFn
        let needs_params = check_test_config.args
        if ( needs_params && needs_params.length > 1 ) {
          // we have extra args, create an array to unshift the 
          // value onto
          if ( !test_type_args || test_type_args.length < 1) {
            let extra_params = needs_params.splice(1)
            throw new CheckException(`No args supplied in config for "${test_type}". Requires "${extra_params.join(', ')}"`)
          }
        }
        let value_name = needs_params[0]
        let extra_param_names = needs_params.splice(1)

        this_check.push(function checkPropertyType(incoming_data){
          debug('incoming_data', incoming_data, property, needs_params)
          
          let res = test_function(incoming_data[property], ...test_type_args)
          if ( res !== true ) {
            let message_props = {
              name: property,
              type: typeof incoming_data[property]
            }
            // Allow varible names values
            message_props[value_name] = incoming_data[property]
            // Attach check setup args with names
            forEach(extra_param_names, (arg_name, i) => {
              message_props[arg_name] = test_type_args[i]
            })
            // Check config describes names or args in `.args`, shift `value`.
            // user check config describes values of args in an array

            let test_message = test_messageFn(message_props)
            throw new exception(
              `${checks_label_space}${label} failed the ${test_type} check: ${test_message}`, {
              detail: { 
                from: stack,
                value: incoming_data[property], 
                type: typeof incoming_data[property]
              }
            })
          }
          return incoming_data
        })
      }

      function checkAll(incoming_data){
        for ( let i = 0; i < this_check.length; i++ ){
          let res = this_check[i](incoming_data)
          if ( res === false ) break
        }
      }
      // Create a single piped function of all checks for this field
      checks.push( checkAll )
    })

    debug('checks are', checks)

    return this.returnTheCheckFunction(checks, exception, `check${checks_label}`)
  }

  /** Generates the check everything function. 
  * @param {array} checks         - Array of check functions
  * @param {Exception} exception  - The instance of Exception to throw
  * @param {string} name          - Name of the function
  */
  static returnTheCheckFunction(checks, exception, name){
    let o = {}
    o[name] = function (data){
      if (!data) throw new exception('No object to check')
      for ( let i = 0; i < checks.length; i++ ) {
        let checkAllFn = checks[i]
        let res = checkAllFn(data)
        if ( res === false ) break
      }

      // Return the data in case of modification
      return data
    }
    return o[name]
  }

}
Check._classInit()

module.exports = { Check, CheckFailed, CheckException, Exception }