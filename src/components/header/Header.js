import {ExcelComponent} from '@core/ExcelComponent'
import * as actions from '@/redux/actions'
import {$} from '@core/dom'
import {DEFAULT_TITLE} from '@/constants'
import {debounce} from '@core/utils'
import {ActiveRoute} from '@core/routes/ActiveRoute'

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options,
    })
  }
  prepare() {
    this.onInput = debounce(this.onInput, 350)
  }

  toHTML() {
    const title = this.store.getState().tableName || DEFAULT_TITLE
    return `
       <input type="text" class="input" value="${title}" />

      <div>

        <div class="button"  data-action="delete">
          <i class="material-icons"  data-action="delete">delete</i>
        </div>

        <div class="button" data-action="exit">
          <i class="material-icons"  data-action="exit">exit_to_app</i>
        </div>

      </div>
    `
  }
  onClick(event) {
    const $target = $(event.target)
    if ($target.data.action === 'exit') {
      ActiveRoute.navigate('')
    } else if ($target.data.action === 'delete') {
      const decision = confirm('Вы действительно хотите удалить эту таблицу?')
      if (decision) {
        localStorage.removeItem('excel:' + ActiveRoute.param)
        ActiveRoute.navigate('')
      }
    }
  }
  onInput(event) {
    const target = $(event.target)
    this.$dispatch(actions.changeTitle(target.val()))
  }
}
