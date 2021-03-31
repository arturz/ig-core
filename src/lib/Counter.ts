export default class Counter {
  private counter = 0

  increase(value: number = 1){
    this.counter += value
  }

  getCount(){
    return this.counter
  }
}