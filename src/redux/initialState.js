import {storage} from '@core/utils'
import {DEFAULT_TITLE, defaultStyles} from '@/constants'

const defaultState = {
  row: {},
  col: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: defaultStyles,
  tableName: DEFAULT_TITLE
}
const normalize = state => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: ''
})
export const initialState = Object.keys(storage('excel-state')).length
  ? normalize(storage('excel-state'))
  : defaultState
