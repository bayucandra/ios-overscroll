/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _biqIosOverscroll = __webpack_require__(1);

var biqIosOverScroll = new _biqIosOverscroll.biqIosOverscroll();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var biqIosOverscroll = function () {
    function biqIosOverscroll() {
        _classCallCheck(this, biqIosOverscroll);

        // this.init();
        this.config = {
            limit_top: 30
        };
        this.state = {
            previously_disabled: false, //For touchend detect that it was disabled
            enable_scroll: false,
            is_panning: false,
            touch_time_start: null,
            touch_time_end: null,
            touch_time_delta: 0,
            scroll_y_current: 0,
            scroll_x_current: 0,
            y_start: 0,
            y_end: 0,
            y_delta: 0, // ( - ) on scroll up, ( + ) on scrolldown
            scroll_smooth: {
                timeout_fn: null
            }
        };
    }

    _createClass(biqIosOverscroll, [{
        key: 'init',
        value: function init() {
            var _this = this;

            if (window.scrollY > this.config.limit_top) {
                this.state.enable_scroll = true;
            }
            window.addEventListener('touchstart', function (e) {
                return _this.onTouchstart(e);
            });
            window.addEventListener('touchmove', function (e) {
                return _this.onTouchmove(e);
            }, { passive: false });
            window.addEventListener('touchend', function (e) {
                return _this.onTouchend(e);
            }, { passive: false });
            window.addEventListener('scroll', function (e) {
                return _this.onScroll(e);
            });
        }
    }, {
        key: 'onTouchstart',
        value: function onTouchstart(e) {
            this.state.touch_time_start = $.now();
            this.state.y_start = e.touches[0].clientY;
            this.state.scroll_y_current = window.scrollY;
            this.state.scroll_x_current = window.scrollX;
            this.state.is_panning = true;
            if (!this.state.enable_scroll) {
                this.state.previously_disabled = true;
            }
        }
    }, {
        key: 'onTouchmove',
        value: function onTouchmove(e) {
            this.state.y_end = e.touches[0].clientY;
            var scroll_pos = window.scrollY;
            this.state.y_delta = Math.abs(this.state.y_end) - Math.abs(this.state.y_start);
            // console.log(this.state.y_delta);

            var is_limit = scroll_pos <= this.config.limit_top;
            // console.log(is_limit);
            if (!is_limit) {
                // console.log('Enabling scroll');
                this.state.enable_scroll = true;
            } else {
                // console.log('Disabling scroll');
                this.state.enable_scroll = false;
            }

            if (!this.state.enable_scroll || this.state.previously_disabled) {
                var _scroll_pos = 0;
                var is_pan_up = this.state.y_delta < 0;
                if (is_pan_up) {
                    //if scroll up
                    _scroll_pos = this.state.scroll_y_current + Math.abs(this.state.y_delta);
                } else {
                    //if scroll down
                    _scroll_pos = this.state.scroll_y_current - this.state.y_delta;
                }

                // console.log(is_pan_up);
                window.scrollTo(this.state.scroll_x_current, _scroll_pos);

                e.preventDefault();
            }

            // console.log(this.state.enable_scroll);
        }
    }, {
        key: 'onTouchend',
        value: function onTouchend(e) {
            this.state.touch_time_end = $.now();
            this.state.touch_time_delta = this.state.touch_time_end - this.state.touch_time_start;

            var scroll_pos = window.scrollY;
            var is_limit_top = scroll_pos <= this.config.limit_top;
            var is_pan_up = this.state.y_delta < 0;
            this.state.is_panning = false;
            /*            console.log(JSON.stringify( {
                            is_limit_top: is_limit_top,
                            is_pan_up: is_pan_up,
                            previously_disabled: this.state.previously_disabled
                        } ));*/
            var is_touchmove_fast = this.state.touch_time_delta < 500;
            var is_touchmove_far = Math.abs(this.state.y_delta) > 50;
            if (!is_limit_top && is_pan_up && this.state.previously_disabled && this.state.enable_scroll && is_touchmove_fast && is_touchmove_far) {
                e.preventDefault();
                // console.log('animate');
                $('html, body').stop().animate({ scrollTop: scroll_pos + 125 }, 300);
            }
            this.state.previously_disabled = false;
        }
    }, {
        key: 'onScroll',
        value: function onScroll(e) {
            if (this.state.is_panning) {
                return;
            }
            var scroll_pos = window.scrollY;
            var is_limit_top = scroll_pos <= this.config.limit_top;
            var is_scroll_down = this.state.y_delta > 0;
            if (is_limit_top && is_scroll_down && scroll_pos !== 0) {
                this.state.enable_scroll = false;
                window.scrollTo(0, 0);
                e.preventDefault();
            }
            /*        console.log(JSON.stringify({
                        is_limit_top: is_limit_top,
                        is_scroll_down: is_scroll_down,
                        scroll_pos: scroll_pos,
                        y_delta: this.state.y_delta,
                        y_start: this.state.y_start,
                        y_end: this.state.y_end
                    }));*/
        }
    }]);

    return biqIosOverscroll;
}();

exports.biqIosOverscroll = biqIosOverscroll;

/***/ })
/******/ ]);
//# sourceMappingURL=biq-ios-overscroll.js.map