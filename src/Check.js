const forEach = require('lodash/forEach')
const {Exception} = require('@mhio/exception')
const debugr = require('debug')
const debug = debugr('mhio:snippets-api:Check')

const CheckTypes = require('./CheckTypes')

class CheckFailed extends Exception {
  constructor(message, metadata){
    super(message, metadata)
    if ( metadata ){
      this.detail = metadata.detail
    }
  }
}

class Check {

  static _classInit(){
    this.types = CheckTypes
  }

  static typeCheck(type, val){

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
      let { label, type, restrictions } = field
      let required = true
      if ( field.hasOwnProperty('required') ) required = Boolean(field.required)

      if ( Array.isArray(field) ) {
        [ property, label, type, restrictions ] = field
      }
      debug('field: prop"%s" label"%s" type:"%s"', property, label, type, restrictions)
      let this_check = []

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

      if ( type ) {
        this_check.push(function checkPropertyType(incoming_data){
          debug('incoming_data', incoming_data, property)
          let incoming_type = typeof incoming_data[property]
          if (incoming_type !== type) {
            throw new exception(`${checks_label_space}${label} is not a ${type}, it's ${incoming_type}`, {
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

module.exports = { Check, CheckFailed }