export class Store {
  constructor(rootReducer, initialState = {}) {
    this.rootReducer = rootReducer
    this.state = rootReducer({...initialState}, {type: '__INIT__'})
    this.listeners = []
  }
  subscribe(fn) {
    this.listeners.push(fn)
    const self = this
    return {
      unsubscribe() {
        self.listeners = self.listeners.filter(l => l !== fn)
      }
    }
  }
  dispatch(action) {
    this.state = this.rootReducer(this.state, action)
    this.listeners.forEach(listener => listener(this.state))
  }
  getState() {
    return JSON.parse(JSON.stringify(this.state))
  }
}
