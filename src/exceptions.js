const { Exception } = require('@mhio/exception')

class CheckException extends Exception {

  /** 
  * Get the source file of the function that called whereever this `error` was generated 
  * Used in `generate()` to get the source of the clients Check config. 
  */
  static source(error){
    if (!error) throw new Exception('No error to generate a source line for')
    // Grab the calling line  `  at Object.method (/path/to/Whatever.js:40:17)`
    let second = error.stack.split(/\n/)[2]
    if (!second) throw new Exception('Incoming Error stack doesn\'t have a second lines')
    // Match the parens `(/path/to/Whatever.js:40:17)`
    let match = second.match(/\((.+)\)/)
    if (!match) throw new Exception('Second line of stack didn\'t contain "(path/to/code.js)"')
    // What's left should be the source config `/path/to/Whatever.js:40:17`
    return match[1]
  }

  constructor(message, metadata){
    super(message, metadata)

    if ( metadata ){

      /** 
      * More detailed metadata for output to a user, collections should only be 
      * one level deep to expect clients to handle them. 
      * @type String|Array|Object
      */
      this.detail = metadata.detail

      /** 
      * Place to store where stack line of the config Check was generated from
      * @type String
      */
      this.from = metadata.from
    }
  }

}

class CheckFailed extends CheckException {}

export { CheckException, CheckFailed, Exception }