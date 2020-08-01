import {$} from '@core/dom'
import {ActiveRoute} from '@core/routes/ActiveRoute'
import {Loader} from '@/components/Loader'

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Selector is not provided in Router')
    }
    this.$placeholder = $(selector)
    this.routes = routes
    this.loader = new Loader()
    this.page = null
    this.changePageHandler = this.changePageHandler.bind(this)
    this.init()
  }
  init() {
    window.addEventListener('hashchange', this.changePageHandler)
    this.changePageHandler()
  }
  async changePageHandler() {
    if (this.page) {
      this.page.destroy()
    }
    const Page = this.getPage(ActiveRoute.path)
    this.page = new Page(ActiveRoute.param)
    this.$placeholder.clear().append(this.loader)
    const root = await this.page.getRoot()
    console.log(this.$placeholder.html())
    this.$placeholder.clear().append(root)
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
