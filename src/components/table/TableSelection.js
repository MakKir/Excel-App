export class TableSelection {
  static className = 'selected'
  constructor() {
    this.group = []
  }
  select($el) {
    this.clear()
    this.group.push($el)
    $el.focus().addClass(TableSelection.className)
    this.current = $el
  }
  clear() {
    this.group.forEach($el => {
      $el.removeClass(TableSelection.className)
    })
    this.group = []
  }
  get selectedIds() {
    return this.group.map($el => $el.data.id)
  }
  selectGroup($els) {
    this.clear()
    console.log($els)
    $els.forEach($el => {
      $el.addClass(TableSelection.className)
    })
    this.group = $els
  }
  applyStyle(style) {
    this.group.forEach($el => $el.css(style))
  }
}
