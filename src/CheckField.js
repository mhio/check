const debugr = require('debug')
const debug = debugr('mhio:check:CheckField')

const { CheckException, CheckFailed, Exception } = require('./exceptions')
export { CheckFailed, CheckException, Exception }

const { Checks } = require('./Checks')
const { FieldConfig } = require('./FieldConfig')
const { CheckFieldExists } = require('./CheckFieldExists')
const { CheckFieldType } = require('./CheckFieldType')
const { CheckFieldCheck } = require('./CheckFieldCheck')
//const { CheckFieldItems } = require('./CheckFieldItems')


/** The definition for a single field */
export class CheckField extends FieldConfig {

  static _classInit(){
    this.types = Checks.all
  }

  constructor( field_name, field_config, parent_check, options = {} ){
    super(field_name, field_config, options)

    // These can probably be source from the parent, CheckConfig
    if (!parent_check) throw new CheckException(`No parent check instance for new field ${field_name}`)
    this.parent_check = parent_check

    // or duplicate them here:
    this.exception = field_config.exception || this.parent_check.exception || CheckFailed
    this.config_source = field_config.config_source || this.parent_check.config_source || ''

    this.checks_array = []

    this.buildFunction()
  }

  buildFunction(){
    let exception = this.exception
    let checks_array = this.checks_array
    let field_name = this.field_name
    let field_type = this.type
    let field_check = this.check
    //let field_items = this.items
    debug('building check field function', this.checks_array)

    checks_array.push( CheckFieldExists.buildFunction(this) )
    //if ( this.type ) checks_array.push( CheckFieldType.buildFunction(this) )
    if ( field_type ) checks_array.push( CheckFieldType.buildFunction(this) )
    if ( field_check ) checks_array.push( CheckFieldCheck.buildFunction(this) )
    //if ( field_items ) checks_array.push( CheckFieldItems.buildFunction(this) )

    this.function = function(incoming_data){
      if (!incoming_data) throw new exception('No object was passed in to run checks against')
      for ( let i = 0; i < checks_array.length; i++ ) {
        let checkAllFn = checks_array[i]
        let res = checkAllFn(incoming_data)
        debug('check field result for "%s" t[%s] c[%s]', field_name, field_type, field_check, res)
        if ( res === false ) break // short circuit tests for this field
      }

      // Return the incoming_data in case of modification
      return incoming_data
    }

    this.function._instance = this
    this.function.field_name = this.field_name
    return this.function
  }

}
CheckField._classInit()