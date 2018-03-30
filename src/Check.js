const forEach = require('lodash/forEach')
const debugr = require('debug')
const debug = debugr('mhio:snippets-api:Check')
const { Exception } = require('@mhio/exception')

const { CheckTypes } = require('./CheckTypes')

class CheckException extends Exception {
  constructor(message, metadata){
    super(message, metadata)
    if ( metadata ){
      this.detail = metadata.detail
    }
  }  
}

class CheckFailed extends CheckException {}


class Check {

  static _classInit(){
    this.types = CheckTypes
  }

  /** Generates a function to check some data 
  * There's a lot of closure work going on here so it's a bit monolithic. 
  */
  static generate(config){
    let stack = new Error().stack.split(/\n/)[2].match(/\((.+)\)/)[1]
    debug('config was from', stack)

    let checks = []

    if (!config) throw new Exception('No Check config to generate function')

    let exception = config.exception || CheckFailed
    let checks_label = config.label || ''
    let checks_label_space = ( checks_label ) ? `${checks_label} ` : ''

    forEach(config.fields, (field, property) =>{
      let label = field.label
      let test_type = field.type
      let test_type_args = field.type_args || []
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
        if (!incoming_data[property]) {
          if (!required) return false // short circuit checks
          throw new exception(
            `${checks_label_space}No property "${property}" in data for "${label}"`,
            { detail: { from: stack }}
          )
        }
        return incoming_data
      })

      if ( test_type ) {
        let test_function = this.types[test_type].test
        if (!test_function) throw new CheckException(`No type "${test_type} available in Check`)
        let test_messageFn = this.types[test_type].messageFn

        this_check.push(function checkPropertyType(incoming_data){
          debug('incoming_data', incoming_data, property)
          
          let res = test_function(incoming_data[property], ...test_type_args)
          if ( res !== true ) {
            let test_message = test_messageFn({
              name: property,
              value: incoming_data[property],
              type: typeof incoming_data[property]
            })
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