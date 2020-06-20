import {$} from '@core/dom';

export function resizeHandler(event) {
  console.log(this)
  const $resizer = $(event.target)
  const $parent = $resizer.closest('[data-type="resizable"]')
  const resizerCoords = $resizer.getCoords()
  const parentCoords = $parent.getCoords()
  const type = $resizer.data.resize
  const typesMap = {
    col: {
      position: 'pageX',
      edge: 'right',
      prop: 'width',
      minValue: this.minColWidth
    },
    row: {
      position: 'pageY',
      edge: 'bottom',
      prop: 'height',
      minValue: this.minRowHeight
    }
  }
  $resizer.addClass('active')

  document.onmousemove = e => {
    resize(e, parentCoords, resizerCoords, typesMap[type], $resizer)
  }

  document.onmouseup = () => {
    document.onmousemove = null
    document.onmouseup = null
    $resizer.removeClass('active')
    const resizerNewCoords = $resizer.getCoords()
    if (type === 'col') {
      const index = $parent.data.index
      const cols = this.$root.findAll(`[data-index="${index}"]`)
      const value = calculateNewValue(resizerNewCoords, parentCoords, typesMap[type])
      cols.forEach(col => {
        $(col).css({
          'width': value + 'px'
        })
      })
      $resizer.css({
        right: 0
      })
    } else {
      const value = calculateNewValue(resizerNewCoords, parentCoords, typesMap[type])

      $parent.css({
        'height': value + 'px'
      })
      $resizer.css({
        bottom: 0
      })
    }
  }
}


function resize(e, parentCoords, resizerCoords, {position, edge, prop, minValue}, $resizer) {
  let delta = e[position] - parentCoords[edge]
  const borderWidth = 1
  if (parentCoords[prop] + delta <= minValue) {
    delta = -(parentCoords[prop] - minValue) + borderWidth - resizerCoords[prop]
  }

  const value = -delta - resizerCoords[prop]
  const cssObj = {}
  cssObj[edge] = value + 'px'
  $resizer.css(cssObj)
}

function calculateNewValue(resizerCoords, parentCoords, {edge, prop}) {
  const diff = resizerCoords[edge] - parentCoords[edge]
  return parentCoords[prop] + diff
}
