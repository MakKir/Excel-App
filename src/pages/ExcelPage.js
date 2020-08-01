import {Page} from '@core/page/Page'
import {Toolbar} from '@/components/toolbar/toolbar'
import {Excel} from '@/components/excel/Excel'
import {Header} from '@/components/header/Header'
import {Formula} from '@/components/formula/formula'
import {Table} from '@/components/table/Table'
import {Store} from '@core/store/createStore'
import {StateProcessor} from '@core/page/StateProcessor';
import {rootReducer} from '@/redux/rootReducer'
import {normalizeInitialState} from '@/redux/initialState'
import {LocalStorageClient} from '@/shared/LocalStorageClient'


export class ExcelPage extends Page {
  constructor(param) {
    super(param)
    this.storeSub = null
    this.processor = new StateProcessor(
        new LocalStorageClient(this.params)
    )
  }
  async getRoot() {
    const state = await this.processor.get()
    const store = new Store(rootReducer, normalizeInitialState(state))
    this.storeSub = store.subscribe(this.processor.listen)

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store
    })

    return this.excel.getRoot()
  }
  afterRender() {
    this.excel.init()
  }
  destroy() {
    this.excel.destroy()
    this.storeSub.unsubscribe()
  }
}
