/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(2);
	module.exports = __webpack_require__(3);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _data = __webpack_require__(2);

	var _gameLogic = __webpack_require__(3);

	function main() {
	    var START = document.getElementById('start');
	    var STRICT = document.getElementById('strict');

	    START.onclick = function () {
	        if (_data.data.isStart) {
	            _data.data.isStart = false;
	            START.classList.remove('active');
	            (0, _gameLogic.resetGame)();
	        } else {
	            _data.data.isStart = true;
	            START.classList.add('active');
	            (0, _gameLogic.playOrder)();
	            (0, _gameLogic.addBtnEvent)();
	        }
	    };

	    STRICT.onclick = function () {
	        if (_data.data.isStrict) {
	            STRICT.classList.remove('active');
	            _data.data.isStrict = false;
	        } else {
	            STRICT.classList.add('active');
	            _data.data.isStrict = true;
	        }
	    };
	}

	window.onload = main;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var data = {
	    orderData: [],
	    currentIndex: 0,
	    isStart: false,
	    isStrict: false,
	    addItem: function addItem() {
	        this.orderData.push(Math.floor(Math.random() * 4) + 1);
	        this.amount += 1;
	    }
	};

	exports.default = function () {
	    return false;
	};

	exports.data = data;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.resetGame = exports.addBtnEvent = exports.playOrder = undefined;

	var _data = __webpack_require__(2);

	var GREEN = document.getElementById('green');
	var RED = document.getElementById('red');
	var YELLOW = document.getElementById('yellow');
	var BLUE = document.getElementById('blue');
	var SCREEN = document.getElementById('screen');
	var timerEvents = [];
	var simonSound = document.getElementById('simon-sound');
	var wrongSound = document.getElementById('wrong-sound');
	var colorBtns = [GREEN, RED, YELLOW, BLUE];

	//  点亮色块
	function addLight(val) {
	    if (val === 1) GREEN.classList.add('green-light');
	    if (val === 2) RED.classList.add('red-light');
	    if (val === 3) YELLOW.classList.add('yellow-light');
	    if (val === 4) BLUE.classList.add('blue-light');
	}

	//  熄灭色块
	function removeLight(val) {
	    if (val === 1) GREEN.classList.remove('green-light');
	    if (val === 2) RED.classList.remove('red-light');
	    if (val === 3) YELLOW.classList.remove('yellow-light');
	    if (val === 4) BLUE.classList.remove('blue-light');
	}

	//  按序列点亮色块
	function showOrder() {
	    _data.data.orderData.forEach(function (val, index) {
	        timerEvents.push(setTimeout(function () {
	            addLight(val);
	            simonSound.play();
	        }, index * 1000));
	        timerEvents.push(setTimeout(function () {
	            removeLight(val);
	        }, index * 1000 + 500));
	    });
	}

	//  开始显示下一序列
	function playOrder() {
	    _data.data.addItem();
	    _data.data.currentIndex = 0;
	    timerEvents.push(setTimeout(function () {
	        showOrder();
	        SCREEN.firstChild.nodeValue = _data.data.orderData.length;
	    }, 500));
	}

	//  点击正确事件
	function correctEvent() {
	    _data.data.currentIndex += 1;
	    if (_data.data.currentIndex === _data.data.orderData.length) {
	        if (_data.data.orderData.length === 20) {
	            GREEN.classList.add('green-light');
	            RED.classList.add('red-light');
	            YELLOW.classList.add('yellow-light');
	            BLUE.classList.add('blue-light');
	            SCREEN.firstChild.nodeValue = 'FINISH!';
	        } else {
	            SCREEN.firstChild.nodeValue = 'PASSED!';
	            playOrder();
	        }
	    }
	}

	//  点击错误事件
	function errorEvent() {
	    if (_data.data.isStrict) {
	        SCREEN.firstChild.nodeValue = 'WRONG!';
	        _data.data.orderData = [];
	        playOrder();
	    } else {
	        SCREEN.firstChild.nodeValue = 'WRONG!';
	        _data.data.currentIndex = 0;
	        timerEvents.push(setTimeout(function () {
	            showOrder();
	            SCREEN.firstChild.nodeValue = _data.data.orderData.length;
	        }, 500));
	    }
	}

	//  设置色块按钮点击事件
	function addBtnEvent() {
	    colorBtns.forEach(function (val, index) {
	        val.onclick = function () {
	            if (_data.data.orderData[_data.data.currentIndex] === index + 1) {
	                simonSound.pause();
	                simonSound.currentTime = 0;
	                simonSound.play();
	                correctEvent();
	            } else {
	                wrongSound.play();
	                errorEvent();
	            }
	        };
	    });
	}

	function resetGame() {
	    SCREEN.firstChild.nodeValue = 0;
	    _data.data.orderData = [];
	    _data.data.currentIndex = 0;
	    timerEvents.forEach(function (val) {
	        clearTimeout(val);
	    });
	    GREEN.classList.remove('green-light');
	    RED.classList.remove('red-light');
	    YELLOW.classList.remove('yellow-light');
	    BLUE.classList.remove('blue-light');
	}

	exports.playOrder = playOrder;
	exports.addBtnEvent = addBtnEvent;
	exports.resetGame = resetGame;

/***/ })
/******/ ]);