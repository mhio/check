// # Validate Config

import forEach from 'lodash/forEach'
import reduce from 'lodash/reduce'
import assign from 'lodash/assign'
import noop from 'lodash/noop'
import debugr from 'debug'
const _debug = debugr('mhio:check:Checks')
/* istanbul ignore next */
const debug = (_debug.enabled) ? _debug : noop

import { CheckException, CheckFailed, Exception } from './exceptions'
import { check_types } from './check_types'
import { check_strings } from './check_strings'
import { check_numbers } from './check_numbers'
import { check_things } from './check_things'



/**
* Contains the config for all the different validation tests
* This is loaded as `validate_config` into the `Validate` class at require time. 
*
* A lot of the tests are based on [lodash](https://lodash.com/docs/) methods.
*/
export class Checks {

  static _classInit(){
    this.resetTypes()
    this.resetChecks()
  }

  /** Add custom type to config */
  static addType(name, config){
    this.types[name] = config
    return this
  }

  /** Add custom type to config */
  static addCheck(name, config){
    this.all[name] = config
    return this
  }

  /** Reset all types back to source */
  static resetTypes(){
    this.types = this.loadCheckConfig(check_types)
    return this
  }

  /** Reset all checks back to source */
  static resetChecks(){
    this.all = this.loadCheckConfig(check_strings, check_numbers, check_things)
    return this
  }

  static loadCheckConfig(...classes){
    let checks = reduce(classes, (acc, cls) => {
      debug('loading cls', cls.name)
      return assign(acc, cls)
    }, {})
    forEach(checks, (check) => {
      if ( typeof check.message === 'string' ){
        check.messageFn = this.compileObjectTemplate(check.message)
      }
    })
    debug('checks loaded: %s', Object.keys(checks).length)
    return checks
  }

  /** 
  * If you have a common template string that is replaced a
  * lot, compile it first to remove some of the repeated string
  * processing.
  * @param {string} str - Template string to compile `a {{param}} replacer`
  * @param {object} options - Options
  * @param {RegExp} options.re - Regular Expression for the param tags to be replaced
  * @returns {function} Templating function
  */
  static compileObjectTemplate( str, options = {} ){
    let re = options.re || /({{(\w+?)}})/  //Note the two capture groups.
    let arr = str.split(re)
    let end = arr.length
    let return_arr = new Array(arr.length)
    let templateCompiledObject = (arr.length === 1)
      ? function templateCompiledObject(){ return str }
      : function templateCompiledObject( params ){
          for ( let i = 0; i < end; i+=3 ){
            return_arr[i] = arr[i]
            let p = params[arr[i+2]]
            if ( p === undefined ) p = arr[i+1] // Leave {{param}} in there
            return_arr[i+1] = p // 1600k
          }
          return return_arr.join('')
        }
      templateCompiledObject.string = str
      return templateCompiledObject
  }

}
Checks._classInit()

export { CheckException, CheckFailed, Exception }