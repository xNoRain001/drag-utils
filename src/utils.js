const addListener = (el, eventName, cb) => {
  el.addEventListener(eventName, cb)
}

const removeListener = (el, eventName, cb) => {
  el.removeEventListener(eventName, cb)
}

export {
  addListener,
  removeListener
}