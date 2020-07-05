import {toInlineStyles} from '@core/utils'
import {defaultStyles} from '@/constants'
import {parse} from '@core/parse'

const CODES = {
  A: 65,
  Z: 90
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function toCell(state, row) {
  return function(_, index) {
    const id = `${row}:${index}`
    const width = getWidth(state.col, index)
    const data = state.dataState[id] || ''
    const styles = toInlineStyles({
      ...defaultStyles,
      ...state.stylesState[id]
    })
    return `
    <div 
    class="cell" 
    data-index="${index}"
    data-row="${row}"
    data-id="${id}"
    data-value="${data}"
    data-type="cell"
    contenteditable
    style="${styles}; width: ${width}"
    >${parse(data)}</div>
  `
  }
}
function toColumn({col, index, width}) {
  return `
    <div 
        class="column" 
        data-type="resizable"
        data-index="${index}"
        style="width: ${width}"
     >
        ${col}
        <div class="col-resize" data-resize="col"></div>
    </div>
    `
}

function createRow(index, content, state = {}) {
  const height = getHeight(state.row, index)
  const resizer = index ? '<div class="row-resize" data-resize="row"></div>' : ''
  const dataIndex = index ? `data-index="${index}"` : ''
  return `
    <div 
        class="row" 
        data-type="resizable" 
        ${dataIndex}
        style="height:${height}"
    >
        <div class="row-info">
            ${index ? index : ''}
            ${resizer}
        </div>
        <div class="row-data">${content}</div>
    </div>
  `
}

function toChar(_, idx) {
  return String.fromCharCode(CODES.A + idx)
}

function getWidth(state, index) {
  state = state || {}
  return (state[index] || DEFAULT_WIDTH) + 'px'
}
function getHeight(state, index) {
  state = state || {}
  return (state[index] || DEFAULT_HEIGHT) + 'px'
}

function withWidthFrom(state) {
  return function(col, index) {
    return {
      col,
      index,
      width: getWidth(state.col, index)
    }
  }
}

export function createTable(rowsCount = 15, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(withWidthFrom(state))
      .map(toColumn)
      .join('')

  rows.push(createRow(null, cols))
  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(state, row))
        .join('')
    rows.push(createRow(row + 1, cells, state))
  }
  return rows.join('')
}
