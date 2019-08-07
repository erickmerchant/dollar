export default (strs, ...vars) => {
  let selector = ''

  for (let i = 0; i < strs.length; i++) {
    selector += strs[i]

    if (i + 1 < strs.length) {
      selector += CSS.escape(vars[i])
    }
  }

  return document.querySelectorAll(selector)
}

const pipeify = (fn) => (...args) => (list) => {
  if (list instanceof Event) {
    fn(list.currentTarget, ...args)
  } else if (list instanceof Element) {
    fn(list, ...args)
  } else {
    for (const element of list) {
      fn(element, ...args)
    }
  }

  return list
}

const methods = {
  on: (element, type, listener, options) => element.addEventListener(type, listener, options),
  off: (element, type, listener, options) => element.removeEventListener(type, listener, options),
  add: (element, ...names) => element.classList.add(...names),
  remove: (element, ...names) => element.classList.remove(...names),
  toggle: (element, name, force) => element.classList.toggle(name, force),
  data: (element, key, value) => {
    if (value !== undefined) {
      element.dataset[key] = value
    } else if (value == null) {
      delete element.dataset[key]
    } else {
      return element.dataset[key]
    }
  },
  attr: (element, key, value) => {
    if (value !== undefined) {
      element.setAttribute(key, value)
    } else if (value == null) {
      element.removeAttribute(key)
    } else {
      return element.getAttribute(key)
    }
  },
  prop: (element, key, value) => {
    if (value !== undefined) {
      element[key] = value
    } else if (value == null) {
      delete element[key]
    } else {
      return element[key]
    }
  }
}

for (const key of Object.keys(methods)) {
  methods[key] = methods[key] |> pipeify
}

export const on = methods.on

export const off = methods.off

export const add = methods.add

export const remove = methods.remove

export const toggle = methods.toggle

export const data = methods.data

export const attr = methods.attr

export const prop = methods.prop
