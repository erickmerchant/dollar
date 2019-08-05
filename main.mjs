export default (strs, ...vars) => {
  let selector = ''

  for (let i = 0; i < strs.length; i++) {
    selector += strs[i]

    if (i + 1 < strs.length) {
      selector += CSS.escape(vars[i])
    }
  }

  return [...document.querySelectorAll(selector)]
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
  on: (element, ...args) => element.addEventListener(...args),
  off: (element, ...args) => element.removeEventListener(...args),
  add: (element, ...args) => element.classList.add(...args),
  remove: (element, ...args) => element.classList.remove(...args),
  toggle: (element, ...args) => element.classList.toggle(...args)
}

for (const key of Object.keys(methods)) {
  methods[key] = methods[key] |> pipeify
}

export const on = methods.on

export const off = methods.off

export const add = methods.add

export const remove = methods.remove

export const toggle = methods.toggle
