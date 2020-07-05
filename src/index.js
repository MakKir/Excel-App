import {Excel} from '@/components/excel/excel'
import './scss/index.scss'
import {Toolbar} from '@/components/toolbar/toolbar'
import {Header} from '@/components/header/Header'
import {Formula} from '@/components/formula/formula'
import {Table} from '@/components/table/Table'
import {debounce, storage} from '@core/utils'
import {Store} from '@core/createStore'
import {rootReducer} from '@/redux/rootReducer'
import {initialState} from '@/redux/initialState'

const store = new Store(rootReducer, initialState)

// localStorage.removeItem('excel-state')

const stateListener = debounce(state => {
  storage('excel-state', state)
}, 300)

store.subscribe(stateListener)

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store
})

excel.render()
