import {$} from '@core/dom'
import {ActiveRoute} from '@core/routes/ActiveRoute'

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Selector is not provided in Router')
    }
    this.$placeholder = $(selector)
    this.routes = routes
    this.page = null
    this.changePageHandler = this.changePageHandler.bind(this)
    this.init()
  }
  init() {
    window.addEventListener('hashchange', this.changePageHandler)
    this.changePageHandler()
  }
  changePageHandler() {
    if (this.page) {
      this.page.destroy()
    }
    const Page = this.getPage(ActiveRoute.path)
    this.page = new Page(ActiveRoute.param)
    this.$placeholder.clear()
    this.$placeholder.append(this.page.getRoot())
    this.page.afterRender()
  }
  getPage(path) {
    let page
    switch (path) {
      case '':
        page = 'dashboard'
        break
      case 'excel':
        page = 'excel'
        break
      default:
        page = 'excel'
    }
    return this.routes[page]
  }
  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler)
  }
}
