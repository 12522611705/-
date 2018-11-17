"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require("./npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

{}

var _App = function (_BaseComponent) {
  _inherits(_App, _BaseComponent);

  function _App() {
    _classCallCheck(this, _App);

    return _possibleConstructorReturn(this, (_App.__proto__ || Object.getPrototypeOf(_App)).apply(this, arguments));
  }

  _createClass(_App, [{
    key: "componentWillMount",

    // 页面被载入    
    value: function componentWillMount() {}
    // 页面渲染完成

  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      wx.cloud.init();
    }
    // 页面即将更新   

  }, {
    key: "componentWillUpdate",
    value: function componentWillUpdate() {}
    // 页面更新完成

  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {}
    // 页面展示出来

  }, {
    key: "componentDidShow",
    value: function componentDidShow() {}
    // 页面被隐藏

  }, {
    key: "componentDidHide",
    value: function componentDidHide() {}
    // 

  }, {
    key: "componentCatchError",
    value: function componentCatchError() {}
    // 页面上拉触底事件的处理函数

  }, {
    key: "onReachBottom",
    value: function onReachBottom() {}
    // 页面滚动触发事件的处理函数

  }, {
    key: "onPageScroll",
    value: function onPageScroll() {}
  }, {
    key: "_createData",
    value: function _createData() {}
  }]);

  return _App;
}(_index.Component);

exports.default = _App;

App(require('./npm/@tarojs/taro-weapp/index.js').default.createApp(_App));
_index2.default.initPxTransform({
  "designWidth": 750,
  "deviceRatio": {
    "640": 1.17,
    "750": 1,
    "828": 0.905
  }
});