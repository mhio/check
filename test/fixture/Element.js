// Mock a dom element, has `nodeType === 1` and is not a plain object
export class Element {
  constructor(){
    this.nodeType = 1
  }
}