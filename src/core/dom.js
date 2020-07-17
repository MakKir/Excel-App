class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.outerHTML.trim()
  }
  text(text) {
    if (typeof text !== 'undefined') {
      this.$el.textContent = text
      return this
    }
    return this.$el.textContent.trim()
  }
  val(text) {
    if (typeof text === 'string') {
      this.$el.value = text
      return this
    }
    return this.$el.value.trim()
  }
  clear() {
    this.html('')
    return this
  }
  focus() {
    this.$el.focus()
    return this
  }
  focusToEnd() {
    const range = document.createRange()
    const selection = window.getSelection()
    range.selectNodeContents(this.$el)
    range.collapse(false)
    selection.removeAllRanges()
    selection.addRange(range)
  }
  attr(name, value) {
    if (value) {
      this.$el.setAttribute(name, value)
      return this
    }
    return this.$el.getAttribute(name)
  }
  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }
  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }
  append(node) {
    if (node instanceof Dom) {
      node = node.$el
    }

    if (Element.prototype.append) {
      this.$el.append(node)
    } else {
      this.$el.appendChild(node)
    }
    return this
  }
  get data() {
    if (this.isNotEmpty()) {
      return this.$el.dataset
    }
    return null
  }
  isNotEmpty() {
    return !!this.$el
  }
  css(styles = {}) {
    Object.assign(this.$el.style, styles)
    return this
  }

  getStyles(styles = []) {
    return styles.reduce((res, s) => {
      res[s] = this.$el.style[s]
      return res
    }, {})
  }


  find(selector) {
    return $(this.$el.querySelector(selector))
  }
  findAll(selector) {
    return this.$el.querySelectorAll(selector)
  }
  closest(selector) {
    return $(this.$el.closest(selector))
  }
  addClass(className) {
    $(this.$el.classList.add(className))
    return this
  }
  removeClass(className) {
    $(this.$el.classList.remove(className))
    return this
  }
  getCoords() {
    return this.$el.getBoundingClientRect()
  }
}

export function $(selector) {
  return new Dom(selector)
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}
