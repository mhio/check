const debugr = require('debug')
const debug = debugr('mhio:check:Check')

const { Checks } = require('./Checks')
const { CheckException, CheckFailed, Exception } = require('./exceptions')


export { CheckFailed, CheckException, Exception }

/** Handle the config for a single field */
export class FieldConfig {

  static _classInit(){
    this.types = Checks.all
  }

  constructor( field_name, field_config ){
    if (!field_name) throw new CheckException('No field name for new field')
    this.field_name = field_name

    if (!field_config) throw new CheckException(`No field config for new field ${field_name}`)
    this.config = field_config
  }

  set config( field_config ){
    if ( field_config === 'string') return this.type = field_config
    if ( field_config.hasOwnProperty('type') ) this.type = field_config.type
    if ( field_config.hasOwnProperty('check') ) this.check = field_config.check
    this.label = field_config.label || this.field_name
    this.args = field_config.args || field_config.arguments
    this.required = ( field_config.hasOwnProperty('required') )
        ? field_config.required
        : true
  }

  /** The type of this check (from [Checks] */
  get type(){ return this._type }
  set type( type_name ){
    if (!type_name) throw new CheckException('No type to set for field config')
    if (!Checks.types[type_name]) throw new CheckException(`No type "${type_name}" available for field "${this.field_name}"`)
    this._type = type_name
    this.type_test = Checks.types[type_name].test
    this.type_messageFn = Checks.types[type_name].messageFn
  }

  get check() { return this._check }
  set check( check_name ){
    if (!check_name) throw new CheckException('No check to set for field config')
    if (!Checks.all[check_name]) throw new CheckException(`No check "${check_name}" available for field "${this.field_name}"`)
    this._check = check_name
    this._argument_names = Checks.all[check_name].args
    debug('this._argument_names', this.check, this._argument_names, Checks.all[check_name])
    this.requires_arguments = ( this._argument_names.length > 1 )
    this.check_test = Checks.all[check_name].test
    this.checkMessageFn = Checks.all[check_name].messageFn
    if (Checks.all[check_name].requires) this.type = Checks.all[check_name].requires
  }

  /** 
  * The test function for this check 
  * @type Function
  */
  get test(){ return this._test }
  set test( testFn ){
    this._test = testFn
  }

  /** 
  * Is this field required 
  * @type Boolean
  */
  get required() { return this._required }
  set required( bool ){
    this._required = Boolean(bool)
  }

  get messageFn() { return this._messageFn }
  set messageFn( msgFn ){
    this._messageFn = msgFn
  }

  /** 
  * A human label for this field 
  * @type String
  */
  get label(){
    return this._label
  }
  set label(value){
    this._label = value
  }

  /** 
  * Arguments to be passed onto the check function for this field
  * `checkFunction(value, ...args)`
  * @type Array
  */
  get args(){
    return this._args
  }
  set args(val){
    this._args = val
  }

  /** 
  * The checks configured argument names
  * @type String[]
  */
  get argument_names(){
    return this._argument_names
  }

  /** 
  * Pass in some config source info, normally an Error stack line from
  * Wherever `Check.generate` was originally called 
  * @type string
  */
  get config_source(){
    return this._config_source
  }
  set config_source(value){
    this._config_source = value
  }

  buildFunction(){
    throw new Error('buildFunction() needs an override')
  }

}

FieldConfig._classInit()