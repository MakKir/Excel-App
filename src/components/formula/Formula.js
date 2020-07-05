import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom';

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribe: ['currentText'],
      ...options
    })
  }
  init() {
    super.init()
    this.$input = this.$root.find('#formula')
    this.$on('table:select', $cell => {
      this.$input.text($cell.data.value)
    })
    // this.$subscribe(state => {
    //   console.log(state.currentText)
    //   this.$input.text(state.currentText)
    // })
    // this.$on('table:input', data => this.input.text(data))
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div id="formula" class="input" contenteditable spellcheck="false"></div>
    `
  }
  storeChanged({currentText}) {
    this.$input.text(currentText)
  }

  onInput(event) {
    const text = $(event.target).text()
    this.$emit('formula:input', text)
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab']
    if (keys.includes(event.key)) {
      event.preventDefault()
      const text = $(event.target).text()
      this.$emit('formula:enter', text)
    }
  }
}
