import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'
import {resizeHandler} from '@/components/table/table.resize';
import {TableSelection} from '@/components/table/TableSelection';
import {shouldResize, isCell, shouldSwitchCell} from '@/components/table/table.functions';
import {selectHandler, switchCellHandler} from '@/components/table/table.select';

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
    return createTable()
  }
  prepare() {
    this.selection = new TableSelection()
  }

  onInput() {
    const text = this.selection.current.text()
    this.$emit('table:input', text)
  }

  init() {
    super.init()
    const $cell = this.$root.find('[data-id="0:0"]')
    this.selection.select($cell)
    this.selection.current = $cell
    this.onInput()
    this.$on('formula:input', data => this.selection.current.text(data))
    this.$on('formula:enter', () => {
      const current = this.selection.current
      current.focus()
    })
  }
  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeHandler(event)
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
