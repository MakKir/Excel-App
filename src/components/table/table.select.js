import {$} from '@core/dom';
import {isCell} from '@/components/table/table.functions';

export function selectHandler(event) {
  const target = event.target
  const [firstRow, firstCol] = getRowAndCol($(target))
  this.selection.select($(target))

  document.onmousemove = e => {
    if (isCell(e) && e.target !== target) {
      const [row, col] = getRowAndCol($(e.target))
      const cells = []
      for (let i = Math.min(firstRow, row); i <= Math.max(firstRow, row); i++) {
        for (let j = Math.min(firstCol, col); j <= Math.max(firstCol, col); j++) {
          cells.push(this.$root.find(`[data-id="${i}:${j}"]`))
        }
      }
      this.selection.selectGroup(cells)
    }
  }

  document.onmouseup = () => {
    document.onmousemove = null
    document.onmouseup = null
  }
}

function getRowAndCol(cell) {
  return cell.data.id.split(':')
}

export function switchCellHandler(event) {
  const current = $(event.target)
  let [row, col] = getRowAndCol(current)
  switch (event.key) {
    case 'Tab':
    case 'ArrowRight':
      col++
      break;
    case 'ArrowLeft':
      col--
      break;
    case 'ArrowUp':
      row--
      break;
    case 'ArrowDown':
    case 'Enter':
      row++
      break;
  }
  event.preventDefault()
  const $cell = this.$root.find(`[data-id="${row}:${col}"]`)
  if ($cell.isNotEmpty()) {
    this.selection.select($cell)
  }
}
