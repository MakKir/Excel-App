import {CHANGE_TEXT, CHANGE_STYLES, TABLE_RESIZE, APPLY_STYLE, CHANGE_TITLE, CHANGE_DATE} from './types'

export function rootReducer(state, action) {
  let field
  let val
  const type = action.data ? action.data.type : null
  switch (action.type) {
    case TABLE_RESIZE:
      return {...state, [type]: value(state, type, action)}
    case CHANGE_TEXT:
      field = 'dataState'
      return {
        ...state,
        currentText: action.data.value,
        [field]: value(state, field, action)}
    case CHANGE_STYLES:
      return {...state, currentStyles: action.data}
    case APPLY_STYLE:
      field = 'stylesState'
      val = state[field] || {}
      action.data.ids.forEach(id => {
        val[id] = {...val[id], ...action.data.value}
      })
      console.log(state.currentStyles, action.value)
      console.log({...state.currentStyles, ...action.data.value})
      return {
        ...state,
        [field]: val, currentStyles: {...state.currentStyles, ...action.data.value}
      }
    case CHANGE_TITLE:
      field = 'tableName'
      return {
        ...state,
        [field]: action.data}
    case CHANGE_DATE:
      field = 'openDate'
      return {
        ...state,
        [field]: new Date().toJSON()}
    default:
      return state
  }
}

function value(state, field, action) {
  const val = state[field] || {}
  val[action.data.id] = action.data.value
  return val
}
