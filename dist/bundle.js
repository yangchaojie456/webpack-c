(function (modules) {
  function __webpack_require__(moduleId) {
    window.__webpack_exports__ = {}
    modules[moduleId].call(null, modules, __webpack_exports__, __webpack_require__)

    return __webpack_exports__
  }
  // 入口
  __webpack_require__("C:/Users/yangCJ/Desktop/webpack/src/index.js")
})({
  "C:/Users/yangCJ/Desktop/webpack/src/index.js": function (module, __webpack_exports__, __webpack_require__) {
    "use strict";

    var _add = _interopRequireDefault(__webpack_require__("C:/Users/yangCJ/Desktop/webpack/src/add.js"));

    var _minus = __webpack_require__("C:/Users/yangCJ/Desktop/webpack/src/minus.js");

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        "default": obj
      };
    }

    var continer = document.getElementById('show');

    document.getElementById('add').onclick = function () {
      continer.innerHTML = (0, _add["default"])(parseInt(continer.innerHTML), 1);
    };

    document.getElementById('minus').onclick = function () {
      continer.innerHTML = (0, _minus.minus)(parseInt(continer.innerHTML), 1);
    };

    var division = (0, _minus.minus)(2, 1);
    console.log(division);
  },
  "C:/Users/yangCJ/Desktop/webpack/src/add.js": function (module, __webpack_exports__, __webpack_require__) {
    "use strict";

    Object.defineProperty(__webpack_exports__, "__esModule", {
      value: true
    });
    __webpack_exports__["default"] = void 0;

    var _default = function _default(a, b) {
      return a + b;
    };

    __webpack_exports__["default"] = _default;
  },
  "C:/Users/yangCJ/Desktop/webpack/src/minus.js": function (module, __webpack_exports__, __webpack_require__) {
    "use strict";

    Object.defineProperty(__webpack_exports__, "__esModule", {
      value: true
    });
    __webpack_exports__.minus = void 0;

    var minus = function minus(a, b) {
      return a - b;
    };

    __webpack_exports__.minus = minus;
  },
})