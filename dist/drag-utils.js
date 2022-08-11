(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Drag = factory());
})(this, (function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  var addListener = function addListener(el, eventName, cb) {
    el.addEventListener(eventName, cb);
  };

  var removeListener = function removeListener(el, eventName, cb) {
    el.removeEventListener(eventName, cb);
  };

  var Drag = /*#__PURE__*/function () {
    function Drag(el) {
      _classCallCheck(this, Drag);

      el.drag = window.drag = this;
      this.init(el);
    }

    _createClass(Drag, [{
      key: "init",
      value: function init(el) {
        addListener(el, 'mousedown', this.mouseDown);
      }
    }, {
      key: "mouseDown",
      value: function mouseDown(e) {
        var el = this;

        var _el$getBoundingClient = el.getBoundingClientRect(),
            left = _el$getBoundingClient.left,
            top = _el$getBoundingClient.top;

        var pageX = e.pageX,
            pageY = e.pageY; // 鼠标按下时鼠标在 HTML 中的坐标

        el.x = pageX;
        el.y = pageY; // 鼠标按下时盒子在 HTML 中的坐标

        el.left = left;
        el.top = top;
        var cb = window.drag.cb = el.drag.mouseMove.bind(el);
        addListener(window, 'mousemove', cb);
        addListener(el, 'mouseup', el.drag.mouseUp);
      }
    }, {
      key: "mouseMove",
      value: function mouseMove(e) {
        var el = this;
        var pageX = e.pageX,
            pageY = e.pageY;
        var prevX = el.x,
            prevY = el.y,
            prevLeft = el.left,
            prevTop = el.top,
            offsetWidth = el.offsetWidth,
            offsetHeight = el.offsetHeight;
        var x = pageX;
        var y = pageY;
        var left = x - prevX + prevLeft;
        var top = y - prevY + prevTop;
        var _document$documentEle = document.documentElement,
            clientWidth = _document$documentEle.clientWidth,
            clientHeight = _document$documentEle.clientHeight;
        var minLeft = 0;
        var minTop = 0;
        var maxLeft = clientWidth - offsetWidth;
        var maxTop = clientHeight - offsetHeight; // 边界判断

        top = top < minTop ? minTop : top > maxTop ? maxTop : top;
        left = left < minLeft ? minLeft : left > maxLeft ? maxLeft : left; // const { 
        //   marginTop, 
        //   marginLeft,
        //   marginRight,
        //   marginBottom
        // } = window.getComputedStyle(el)
        // TODO: handle margin attribute

        el.style.top = "".concat(top - marginTop.slice(0, -2), "px");
        el.style.left = "".concat(left - marginLeft.slice(0, -2), "px");
      }
    }, {
      key: "mouseUp",
      value: function mouseUp() {
        removeListener(window, 'mousemove', window.drag.cb);
      }
    }]);

    return Drag;
  }();

  return Drag;

}));
