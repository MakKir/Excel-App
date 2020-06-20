export function shouldResize(event) {
  return event.target.dataset.resize
}

export function isCell(event) {
  return event.target.dataset.type === 'cell'
}

export function shouldSwitchCell(event) {
  const keys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', 'Tab']
  console.log(event.shiftKey)
  return keys.includes(event.key) && !event.shiftKey
}

