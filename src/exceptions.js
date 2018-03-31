const { Exception } = require('@mhio/exception')

class CheckException extends Exception {
  constructor(message, metadata){
    super(message, metadata)
    if ( metadata ){
      this.detail = metadata.detail
    }
  }  
}

class CheckFailed extends CheckException {}

export { CheckException, CheckFailed, Exception }