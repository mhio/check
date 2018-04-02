const debugr = require('debug')
const debug = debugr('mhio:check:Check')

const { CheckException, CheckFailed, Exception } = require('./exceptions')
export { CheckFailed, CheckException, Exception }

const { Checks } = require('./Checks')
const { FieldConfig } = require('./FieldConfig')
const { CheckFieldExists } = require('./CheckFieldExists')
//const { CheckFieldType } = require('./CheckFieldType')
const { CheckFieldMethod } = require('./CheckFieldMethod')


/** The definition for a single field */
export class CheckField extends FieldConfig {

  static _classInit(){
    this.types = Checks.all
  }

  constructor( field_name, field_config, check, options = {} ){
    super(field_name, field_config, options)

    // These can probably be source from the parent, CheckConfig
    if (!check) throw new CheckException(`No check instance for new field ${field_name}`)
    this.check = check

    // or duplicate them here:
    this.exception = field_config.exception || this.check.exception || CheckFailed
    this.config_source = field_config.config_source || this.check.config_source || ''

    this.checks_array = []

    this.buildFunction()
  }

  buildFunction(){
    let exception = this.exception
    let checks_array = this.checks_array
    debug('building check field function', this.checks_array)

    checks_array.push( CheckFieldExists.buildFunction(this) )
    //if ( this.type ) checks_array.push( CheckFieldType.buildFunction(this) )
    if ( this.type ) checks_array.push( CheckFieldMethod.buildFunction(this) )

    return this.function = function(data){
      if (!data) throw new exception('No object to check')
      for ( let i = 0; i < checks_array.length; i++ ) {
        let checkAllFn = checks_array[i]
        let res = checkAllFn(data)
        debug('check field result', res)
        if ( res === false ) break // short circuit tests for this field
      }

      // Return the data in case of modification
      return data
    }
  }

}
CheckField._classInit()