import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'
import {resizeHandler} from '@/components/table/table.resize'
import {TableSelection} from '@/components/table/TableSelection'
import {shouldResize, isCell, shouldSwitchCell} from '@/components/table/table.functions'
import {selectHandler, switchCellHandler} from '@/components/table/table.select'
import * as actions from '@/redux/actions'
import {defaultStyles} from '@/constants'
import {parse} from '@core/parse'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    })
    this.minColWidth = 40
    this.minRowHeight = 24
    this.resizeHandler = resizeHandler.bind(this)
    this.selectHandler = selectHandler.bind(this)
    this.switchCellHandler = switchCellHandler.bind(this)
  }
  toHTML() {
    return createTable(15, this.store.getState())
  }
  prepare() {
    this.selection = new TableSelection()
  }
  getCurrent() {
    return this.selection.current
  }
  updateTextInStore(current) {
    this.$dispatch(actions.changeText({
      id: current.data.id,
      value: current.text()
    }))
  }

  onInput() {
    const current = this.getCurrent()
    this.updateTextInStore(current)
  }

  selectCell($cell) {
    this.selection.select($cell)
    const styles = $cell.getStyles(Object.keys(defaultStyles))
    this.$dispatch(actions.changeStyles(styles))
  }

  init() {
    super.init()
    const $cell = this.$root.find('[data-id="0:0"]')
    this.selectCell($cell)
    this.onInput()
    this.$on('formula:input', data => {
      const current = this.getCurrent()
      current.attr('data-value', data)
      current.text(data)
      this.updateTextInStore(current)
    })
    this.$on('formula:enter', () => {
      const current = this.getCurrent()
      current.focus()
      const text = parse(current.text())
      current.text(text)
    })
    this.$on('toolbar:applyStyle', value => {
      this.selection.applyStyle(value)
      this.$dispatch(actions.applyStyle({
        value,
        ids: this.selection.selectedIds
      }))
    })
  }
  async resizeTable(event) {
    try {
      const data = await this.resizeHandler(event)
      this.$dispatch(actions.tableResize(data))
    } catch (e) {
      console.warn('Resize error', e.message)
    }
  }
  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event)
    } else if (isCell(event)) {
      this.selectHandler(event)
      this.onInput()
    }
  }
  onKeydown(event) {
    if (shouldSwitchCell(event)) {
      this.switchCellHandler(event)
      this.onInput()
    }
  }
}
