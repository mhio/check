const { Exception } = require('@mhio/exception')

class CheckException extends Exception {

  /** 
  * Get the source file of the function that called whereever this `error` was generated 
  * Used in `generate()` to get the source of the clients Check config. 
  */
  static source(error){
    if (!error) throw new Exception('No error to generate a source line for')
    let second = error.stack.split(/\n/)[2]
    if (!second) throw new Exception('Incoming Error stack doesn\'t have a second lines')
    let match = second.match(/\((.+)\)/)
    if (!match) throw new Exception('Second line of stack didn\'t contain "(path/to/code.js)"')
    return match[1]
  }

  constructor(message, metadata){
    super(message, metadata)
    if ( metadata ){
      this.detail = metadata.detail
    }
  }

}

class CheckFailed extends CheckException {}

export { CheckException, CheckFailed, Exception }