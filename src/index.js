import { addListener, removeListener } from "./utils"

class Drag {
  constructor (el) {
    el.drag = window.drag = this

    this.init(el)
  }

  init (el) {
    addListener(el, 'mousedown', this.mouseDown)
  }

  mouseDown (e) {
    const el = this
    const { left, top } = el.getBoundingClientRect()
    const { pageX, pageY } = e

    // 鼠标按下时鼠标在 HTML 中的坐标
    el.x = pageX
    el.y = pageY
    // 鼠标按下时盒子在 HTML 中的坐标
    el.left = left
    el.top = top

    const cb = window.drag.cb = el.drag.mouseMove.bind(el)

    addListener(window, 'mousemove', cb)
    addListener(el, 'mouseup', el.drag.mouseUp)
  }

  mouseMove (e) {
    const el = this
    const { pageX, pageY } = e
    const { 
      x: prevX, 
      y: prevY, 
      left: prevLeft, 
      top: prevTop, 
      offsetWidth, 
      offsetHeight 
    } = el

    const x = pageX
    const y = pageY

    let left = x - prevX + prevLeft
    let top = y - prevY + prevTop

    const { clientWidth, clientHeight } = document.documentElement
    const minLeft = 0
    const minTop = 0
    const maxLeft = clientWidth - offsetWidth
    const maxTop = clientHeight - offsetHeight

    // 边界判断
    top = top < minTop
      ? minTop 
      : top > maxTop
          ? maxTop 
          : top
    left = left < minLeft 
      ? minLeft 
      : left > maxLeft 
          ? maxLeft 
          : left

    // const { 
    //   marginTop, 
    //   marginLeft,
    //   marginRight,
    //   marginBottom
    // } = window.getComputedStyle(el)

    // TODO: handle margin attribute
    el.style.top = `${ top - marginTop.slice(0, -2) }px`
    el.style.left = `${ left - marginLeft.slice(0, -2) }px`
  }

  mouseUp () {
    removeListener(window, 'mousemove', window.drag.cb)
  }
}

export default Drag