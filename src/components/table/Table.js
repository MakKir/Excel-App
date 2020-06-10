import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'
import {resizeHandler} from '@/components/table/table.resize';
import {shouldResize} from '@/components/table/table.functions';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['mousedown']
    })
    this.minColWidth = 40
    this.minRowHeight = 24
  }
  toHTML() {
    return createTable()
  }
  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(event, this)
    }
  }
}
