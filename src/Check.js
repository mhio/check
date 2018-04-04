import forEach from 'lodash/forEach'
import debugr from 'debug'
const debug = debugr('mhio:check:Check')

import { Checks } from './Checks'
import { CheckException, CheckFailed, Exception } from './exceptions'
import { CheckField } from './CheckField'


class Check {

  static _classInit(){
    this.types = Checks.types
    this.all = Checks.all
  }

  static generate( config, options = {} ){
    if ( !options.config_source ) {
      options.config_source = CheckException.source(new Error())
    }
    let check = new Check(config, options)
    check.function._check = check
    return check.function
  }

  constructor( config, options = {} ){
    this.checks = []

    this.config = config

    this.config_source = options.config_source
    this.exception = options.exception

  }

  set config(conf){
    if ( !conf ) throw new CheckException('No Check config to generate function')

    this.exception = conf.exception || CheckFailed
    this.label = conf.label || ''
    this.label_with_space = (conf.label) ? `${conf.label} ` : ''

    let checks = {}
    forEach(conf.fields, (field, property) =>{
      checks[property] = new CheckField(property, field, this)
    })

    // Once all config is parsed save the values
    debug('checks are', checks)
    this._config = conf
    this.checks = checks

    this.checks_array = []
    forEach(checks, check => this.checks_array.push(check.function))
    
    // Finally setup the function
    this.function = this.buildFunction()
  }

  buildFunction(){
    let exception = this.exception
    let checks_array = this.checks_array

    return this.function = function(incoming_data){
      if (!incoming_data) throw new exception('No object was passed in to run checks against')
      for ( let i = 0; i < checks_array.length; i++ ) {
        let checkAllFn = checks_array[i]
        let res = checkAllFn(incoming_data)
        debug('check result for "%s"', checkAllFn.field_name, res)
      }

      // Return the incoming_data in case of modification
      return incoming_data
    }
  }
}
Check._classInit()

module.exports = { Check, CheckFailed, CheckException, Exception }