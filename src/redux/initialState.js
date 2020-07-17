import {DEFAULT_TITLE, defaultStyles} from '@/constants'
import {clone} from '@core/utils'

const defaultState = {
  row: {},
  col: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: defaultStyles,
  tableName: DEFAULT_TITLE,
  openDate: new Date().toJSON()
}
const normalize = state => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: ''
})

export function normalizeInitialState(state) {
  return Object.keys(state).length ? normalize(state) : clone(defaultState)
}
