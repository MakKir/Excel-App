import {Page} from '@core/page/Page'
import {$} from '@core/dom'
import {createRecordsTable} from '../shared/dashboard.functions'

export class DashboardPage extends Page {
  getRoot() {
    const now = Date.now().toString()
    return $.create('div', 'db').html(`
      <div class="db__header">
\t\t\t<h1>Excel Dashboard</h1>
\t\t</div>

\t\t<div class="db__new">
\t\t\t<div class="db__view">
\t\t\t\t<a href="#excel/${now}" class="db__create">
\t\t\t\t\tНовая <br /> Таблица
\t\t\t\t</a>
\t\t\t</div>
\t\t</div>

\t\t<div class="db__table db__view">

        ${createRecordsTable()}

\t\t</div>
    `)
  }
}
