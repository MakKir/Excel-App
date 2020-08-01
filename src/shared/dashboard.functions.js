import {storage} from '@core/utils'

export function toHTML({name, id, date}) {
  return `
  <li class="db__record">
    <a href="#excel/${id}">${name}</a>
    <strong>${date}</strong>
  </li>
  `
}

function formatStorageItem(key) {
  const storageObj = storage(key)
  const date = new Date(storageObj.openDate).toLocaleString()
  const id = key.split(':')[1]
  return {
    date,
    id,
    name: storageObj.tableName
  }
}

function getAllKeys() {
  const keys = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (!key.includes('excel')) {
      continue
    }
    keys.push(key)
  }
  return keys
}

export function createRecordsTable() {
  const keys = getAllKeys()
  if (!keys.length) {
    return `<p>Вы пока не создали ни одной таблицы</p>`
  }
  const list = keys
      .map(formatStorageItem)
      .map(toHTML)
      .join('')
  return `
    <div class="db__list-header">
<span>Название</span>
<span>Дата открытия</span>
</div>
<ul class="db__list">
        ${list}
</ul>
 `
}
