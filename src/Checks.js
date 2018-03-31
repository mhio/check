// # Validate Config

import forEach from 'lodash/forEach'
import reduce from 'lodash/reduce'
import assign from 'lodash/assign'
import debugr from 'debug'
const debug = debugr('mhio:check:Checks')

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
    this.all = this.loadChecks(check_types, check_strings, check_numbers, check_things)
  }

  static loadChecks(...classes){
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
    let templateCompiledObject = function templateCompiledObject( params ){
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