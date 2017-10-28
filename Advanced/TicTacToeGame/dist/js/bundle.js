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
	module.exports = __webpack_require__(2);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _MainLogic = __webpack_require__(2);

	function main() {
	    var circle = document.getElementById('circle');
	    var cross = document.getElementById('cross');
	    var title = document.getElementById('title');
	    var mainLogic = new _MainLogic.MainLogic('o');

	    function resetGame() {
	        mainLogic.checkerboard = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
	        mainLogic.stepNumber = 0;
	        title.firstChild.nodeValue = 'Playing...';
	        for (var i = 0; i < 3; i += 1) {
	            for (var j = 0; j < 3; j += 1) {
	                var checker = document.getElementById('checker-' + i + '-' + j);
	                checker.firstElementChild.classList.remove('fa-close', 'fa-circle-o');
	            }
	        }
	        if (mainLogic.playerChessPiece === 'x') {
	            circle.classList.remove('btn-active');
	            mainLogic.aiMoveInChess();
	        }
	        if (mainLogic.playerChessPiece === 'o') {
	            cross.classList.remove('btn-active');
	        }
	    }

	    circle.onclick = function () {
	        title.firstChild.nodeValue = 'Playing...';
	        mainLogic = new _MainLogic.MainLogic('o');
	        resetGame();
	        circle.classList.add('btn-active');
	    };

	    cross.onclick = function () {
	        title.firstChild.nodeValue = 'Playing...';
	        mainLogic = new _MainLogic.MainLogic('x');
	        resetGame();
	        cross.classList.add('btn-active');
	    };
	}

	window.onload = main;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var MainLogic = function () {
	    function MainLogic(playerChessPiece) {
	        var _this = this;

	        _classCallCheck(this, MainLogic);

	        this.checkerboard = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
	        this.playerChessPiece = playerChessPiece;
	        this.stepNumber = 0;

	        var _loop = function _loop(i) {
	            var _loop2 = function _loop2(j) {
	                var checker = document.getElementById('checker-' + i + '-' + j);
	                checker.onclick = function () {
	                    var icon = checker.firstElementChild;
	                    if (icon.classList.length < 2) {
	                        if (_this.playerChessPiece === 'x') {
	                            icon.classList.add('fa-close');
	                        } else if (_this.playerChessPiece === 'o') {
	                            icon.classList.add('fa-circle-o');
	                        }
	                        _this.checkerboard[i][j] = 1;
	                        if (!_this.showGameResult()) {
	                            _this.aiMoveInChess();
	                            _this.showGameResult();
	                        }
	                    }
	                };
	            };

	            for (var j = 0; j < 3; j += 1) {
	                _loop2(j);
	            }
	        };

	        for (var i = 0; i < 3; i += 1) {
	            _loop(i);
	        }
	    }

	    _createClass(MainLogic, [{
	        key: 'checkCheckerboardIsFull',
	        value: function checkCheckerboardIsFull() {
	            return this.checkerboard.every(function (val) {
	                return val.every(function (checkerStatus) {
	                    return checkerStatus !== 0;
	                });
	            });
	        }
	        /**
	         * 执行落子事件
	         * 传入落点坐标
	         * 成功返回true 所选位置已有棋子则返回false
	         */

	    }, {
	        key: 'moveInChess',
	        value: function moveInChess(i, j) {
	            var checker = document.getElementById('checker-' + i + '-' + j);
	            var icon = checker.firstElementChild;
	            if (icon.classList.length < 2) {
	                if (this.playerChessPiece === 'o') {
	                    icon.classList.add('fa-close');
	                } else if (this.playerChessPiece === 'x') {
	                    icon.classList.add('fa-circle-o');
	                }
	                this.checkerboard[i][j] = -1;
	                return true;
	            }
	            return false;
	        }
	        /**
	         * 随机寻找落点
	         */

	    }, {
	        key: 'randomMoveInChess',
	        value: function randomMoveInChess() {
	            if (!this.checkCheckerboardIsFull()) {
	                for (;;) {
	                    var randomRow = Math.floor(Math.random() * 3);
	                    var randomCol = Math.floor(Math.random() * 3);
	                    if (this.moveInChess(randomRow, randomCol)) break;
	                }
	            }
	        }
	        /**
	         * 判断是否存在两子相连的情况
	         * AI存在返回-1
	         * 玩家存在返回1
	         * 不存在返回0
	         */

	    }, {
	        key: 'checkTwoConnection',
	        value: function checkTwoConnection() {
	            var res = 0;
	            var rows = this.checkerboard;
	            var cols = [[], [], []];
	            for (var i = 0; i < this.checkerboard.length; i += 1) {
	                for (var j = 0; j < this.checkerboard.length; j += 1) {
	                    cols[i][j] = this.checkerboard[j][i];
	                }
	            }
	            var diagonal = [[this.checkerboard[0][0], this.checkerboard[1][1], this.checkerboard[2][2]], [this.checkerboard[0][2], this.checkerboard[1][1], this.checkerboard[2][0]]];
	            rows.forEach(function (val) {
	                if (val.reduce(function (a, b) {
	                    return a + b;
	                }) === 2) {
	                    res = 1;
	                }
	            });
	            cols.forEach(function (val) {
	                if (val.reduce(function (a, b) {
	                    return a + b;
	                }) === 2) {
	                    res = 1;
	                }
	            });
	            diagonal.forEach(function (val) {
	                if (val.reduce(function (a, b) {
	                    return a + b;
	                }) === 2) {
	                    res = 1;
	                }
	            });
	            rows.forEach(function (val) {
	                if (val.reduce(function (a, b) {
	                    return a + b;
	                }) === -2) {
	                    res = -1;
	                }
	            });
	            cols.forEach(function (val) {
	                if (val.reduce(function (a, b) {
	                    return a + b;
	                }) === -2) {
	                    res = -1;
	                }
	            });
	            diagonal.forEach(function (val) {
	                if (val.reduce(function (a, b) {
	                    return a + b;
	                }) === -2) {
	                    res = -1;
	                }
	            });
	            return res;
	        }
	        /**
	         * 连接两子相连的空位
	         */

	    }, {
	        key: 'connectChessPiece',
	        value: function connectChessPiece() {
	            var _this2 = this;

	            var rows = this.checkerboard;
	            var cols = [[], [], []];
	            for (var i = 0; i < this.checkerboard.length; i += 1) {
	                for (var j = 0; j < this.checkerboard.length; j += 1) {
	                    cols[i][j] = this.checkerboard[j][i];
	                }
	            }
	            var diagonal = [[this.checkerboard[0][0], this.checkerboard[1][1], this.checkerboard[2][2]], [this.checkerboard[0][2], this.checkerboard[1][1], this.checkerboard[2][0]]];

	            var _loop3 = function _loop3(_i) {
	                if (rows[_i].reduce(function (a, b) {
	                    return a + b;
	                }) === -2) {
	                    rows[_i].forEach(function (checker, j) {
	                        if (checker === 0) {
	                            _this2.moveInChess(_i, j);
	                        }
	                    });
	                    return {
	                        v: void 0
	                    };
	                }
	            };

	            for (var _i = 0; _i < rows.length; _i += 1) {
	                var _ret3 = _loop3(_i);

	                if ((typeof _ret3 === 'undefined' ? 'undefined' : _typeof(_ret3)) === "object") return _ret3.v;
	            }

	            var _loop4 = function _loop4(_i2) {
	                if (cols[_i2].reduce(function (a, b) {
	                    return a + b;
	                }) === -2) {
	                    cols[_i2].forEach(function (checker, j) {
	                        if (checker === 0) {
	                            _this2.moveInChess(j, _i2);
	                        }
	                    });
	                    return {
	                        v: void 0
	                    };
	                }
	            };

	            for (var _i2 = 0; _i2 < cols.length; _i2 += 1) {
	                var _ret4 = _loop4(_i2);

	                if ((typeof _ret4 === 'undefined' ? 'undefined' : _typeof(_ret4)) === "object") return _ret4.v;
	            }

	            var _loop5 = function _loop5(_i3) {
	                if (diagonal[_i3].reduce(function (a, b) {
	                    return a + b;
	                }) === -2) {
	                    diagonal[_i3].forEach(function (checker, j) {
	                        if (checker === 0) {
	                            if (_i3 === 0) {
	                                _this2.moveInChess(j, j);
	                            } else if (_i3 === 1) {
	                                _this2.moveInChess(j, 2 - j);
	                            }
	                        }
	                    });
	                    return {
	                        v: void 0
	                    };
	                }
	            };

	            for (var _i3 = 0; _i3 < diagonal.length; _i3 += 1) {
	                var _ret5 = _loop5(_i3);

	                if ((typeof _ret5 === 'undefined' ? 'undefined' : _typeof(_ret5)) === "object") return _ret5.v;
	            }
	        }
	        /**
	         * 封堵两子相连的空位
	         */

	    }, {
	        key: 'blockChessPiece',
	        value: function blockChessPiece() {
	            var _this3 = this;

	            var rows = this.checkerboard;
	            var cols = [[], [], []];
	            for (var i = 0; i < this.checkerboard.length; i += 1) {
	                for (var j = 0; j < this.checkerboard.length; j += 1) {
	                    cols[i][j] = this.checkerboard[j][i];
	                }
	            }
	            var diagonal = [[this.checkerboard[0][0], this.checkerboard[1][1], this.checkerboard[2][2]], [this.checkerboard[0][2], this.checkerboard[1][1], this.checkerboard[2][0]]];

	            var _loop6 = function _loop6(_i4) {
	                if (rows[_i4].reduce(function (a, b) {
	                    return a + b;
	                }) === 2) {
	                    rows[_i4].forEach(function (checker, j) {
	                        if (checker === 0) {
	                            _this3.moveInChess(_i4, j);
	                        }
	                    });
	                    return {
	                        v: void 0
	                    };
	                }
	            };

	            for (var _i4 = 0; _i4 < rows.length; _i4 += 1) {
	                var _ret6 = _loop6(_i4);

	                if ((typeof _ret6 === 'undefined' ? 'undefined' : _typeof(_ret6)) === "object") return _ret6.v;
	            }

	            var _loop7 = function _loop7(_i5) {
	                if (cols[_i5].reduce(function (a, b) {
	                    return a + b;
	                }) === 2) {
	                    cols[_i5].forEach(function (checker, j) {
	                        if (checker === 0) {
	                            _this3.moveInChess(j, _i5);
	                        }
	                    });
	                    return {
	                        v: void 0
	                    };
	                }
	            };

	            for (var _i5 = 0; _i5 < cols.length; _i5 += 1) {
	                var _ret7 = _loop7(_i5);

	                if ((typeof _ret7 === 'undefined' ? 'undefined' : _typeof(_ret7)) === "object") return _ret7.v;
	            }

	            var _loop8 = function _loop8(_i6) {
	                if (diagonal[_i6].reduce(function (a, b) {
	                    return a + b;
	                }) === 2) {
	                    diagonal[_i6].forEach(function (checker, j) {
	                        if (checker === 0) {
	                            if (_i6 === 0) {
	                                _this3.moveInChess(j, j);
	                            } else if (_i6 === 1) {
	                                _this3.moveInChess(j, 2 - j);
	                            }
	                        }
	                    });
	                    return {
	                        v: void 0
	                    };
	                }
	            };

	            for (var _i6 = 0; _i6 < diagonal.length; _i6 += 1) {
	                var _ret8 = _loop8(_i6);

	                if ((typeof _ret8 === 'undefined' ? 'undefined' : _typeof(_ret8)) === "object") return _ret8.v;
	            }
	        }
	        /**
	         * 落子在玩家落子棱位的对角位
	         */

	    }, {
	        key: 'moveInCornerForArris',
	        value: function moveInCornerForArris() {
	            var arris = [this.checkerboard[0][1], this.checkerboard[1][0], this.checkerboard[1][2], this.checkerboard[2][1]];
	            var randomPos = Math.floor(Math.random() * 2);
	            if (arris[0] === 1) {
	                var oppositeCorner = [[2, 0], [2, 2]];
	                if (this.moveInChess(oppositeCorner[randomPos][0], oppositeCorner[randomPos][1])) {
	                    return true;
	                }
	            } else if (arris[1] === 1) {
	                var _oppositeCorner = [[0, 2], [2, 2]];
	                if (this.moveInChess(_oppositeCorner[randomPos][0], _oppositeCorner[randomPos][1])) {
	                    return true;
	                }
	            } else if (arris[2] === 1) {
	                var _oppositeCorner2 = [[0, 0], [2, 0]];
	                if (this.moveInChess(_oppositeCorner2[randomPos][0], _oppositeCorner2[randomPos][1])) {
	                    return true;
	                }
	            } else if (arris[3] === 1) {
	                var _oppositeCorner3 = [[0, 0], [0, 2]];
	                if (this.moveInChess(_oppositeCorner3[randomPos][0], _oppositeCorner3[randomPos][1])) {
	                    return true;
	                }
	            }
	            return false;
	        }
	        /**
	         * 落子在玩家落子角位的邻角位
	         */

	    }, {
	        key: 'moveInCornerForCorner',
	        value: function moveInCornerForCorner() {
	            var corner = [this.checkerboard[0][0], this.checkerboard[0][2], this.checkerboard[2][0], this.checkerboard[2][2]];
	            var randomPos = Math.floor(Math.random() * 2);
	            if (corner[0] === 1 || corner[3] === 1) {
	                var oppositeCorner = [[0, 2], [2, 0]];
	                this.moveInChess(oppositeCorner[randomPos][0], oppositeCorner[randomPos][1]);
	            } else if (corner[1] === 1 || corner[2] === 1) {
	                var _oppositeCorner4 = [[0, 0], [2, 2]];
	                this.moveInChess(_oppositeCorner4[randomPos][0], _oppositeCorner4[randomPos][1]);
	            }
	        }
	        /**
	         * 落子在棱位
	         */

	    }, {
	        key: 'moveInArris',
	        value: function moveInArris() {
	            var arrisPositions = [[0, 1], [1, 0], [1, 2], [2, 1]];
	            var randomPos = Math.floor(Math.random() * 4);
	            while (!this.moveInChess(arrisPositions[randomPos][0], arrisPositions[randomPos][1])) {}
	        }
	        /**
	         * AI寻找落点
	         */

	    }, {
	        key: 'aiMoveInChess',
	        value: function aiMoveInChess() {
	            var center = this.checkerboard[1][1];
	            var arris = [this.checkerboard[0][1], this.checkerboard[1][0], this.checkerboard[1][2], this.checkerboard[2][1]];
	            var corner = [this.checkerboard[0][0], this.checkerboard[0][2], this.checkerboard[2][0], this.checkerboard[2][2]];
	            if (this.playerChessPiece === 'o') {
	                if (this.stepNumber === 0) {
	                    if (center === 1) {
	                        var randomPos = Math.floor(Math.random() * 4);
	                        var cornerPositions = [[0, 0], [0, 2], [2, 0], [2, 2]];
	                        this.moveInChess(cornerPositions[randomPos][0], cornerPositions[randomPos][1]);
	                    } else if (arris.some(function (val) {
	                        return val === 1;
	                    }) || corner.some(function (val) {
	                        return val === 1;
	                    })) {
	                        this.moveInChess(1, 1);
	                    }
	                    this.stepNumber += 1;
	                } else if (this.stepNumber === 1) {
	                    if (this.checkTwoConnection() === 1) {
	                        this.blockChessPiece();
	                    } else if (corner.filter(function (val) {
	                        return val === 1;
	                    }).length === 1) {
	                        this.moveInCornerForCorner();
	                    } else if (corner.filter(function (val) {
	                        return val === 1;
	                    }).length === 2) {
	                        this.moveInArris();
	                    } else {
	                        this.moveInCornerForArris();
	                    }
	                    this.stepNumber += 1;
	                } else if (this.stepNumber > 1) {
	                    if (this.checkTwoConnection() === -1) {
	                        this.connectChessPiece();
	                    } else if (this.checkTwoConnection() === 1) {
	                        this.blockChessPiece();
	                    } else if (!this.moveInCornerForArris()) {
	                        this.randomMoveInChess();
	                    }
	                    this.stepNumber += 1;
	                }
	            }
	            if (this.playerChessPiece === 'x') {
	                if (this.stepNumber === 0) {
	                    this.moveInChess(1, 1);
	                    this.stepNumber += 1;
	                } else if (this.stepNumber === 1) {
	                    if (arris.some(function (val) {
	                        return val === 1;
	                    })) {
	                        this.moveInCornerForArris();
	                    } else if (corner.some(function (val) {
	                        return val === 1;
	                    })) {
	                        this.moveInCornerForCorner();
	                    }
	                    this.stepNumber += 1;
	                } else if (this.stepNumber > 1) {
	                    if (this.checkTwoConnection() === -1) {
	                        this.connectChessPiece();
	                    } else if (this.checkTwoConnection() === 1) {
	                        this.blockChessPiece();
	                    } else if (!this.moveInCornerForArris()) {
	                        this.randomMoveInChess();
	                    }
	                    this.stepNumber += 1;
	                }
	            }
	        }
	        /**
	         * 检查当前游戏状态
	         */

	    }, {
	        key: 'checkOutcome',
	        value: function checkOutcome() {
	            var res = 0;
	            if (this.checkCheckerboardIsFull()) res = -2;
	            var rows = this.checkerboard;
	            var cols = [[], [], []];
	            for (var i = 0; i < this.checkerboard.length; i += 1) {
	                for (var j = 0; j < this.checkerboard.length; j += 1) {
	                    cols[i][j] = this.checkerboard[j][i];
	                }
	            }
	            var diagonal = [[this.checkerboard[0][0], this.checkerboard[1][1], this.checkerboard[2][2]], [this.checkerboard[0][2], this.checkerboard[1][1], this.checkerboard[2][0]]];
	            if (rows.some(function (val) {
	                return val.reduce(function (a, b) {
	                    return a + b;
	                }) === 3;
	            })) res = 1;
	            if (rows.some(function (val) {
	                return val.reduce(function (a, b) {
	                    return a + b;
	                }) === -3;
	            })) res = -1;
	            if (cols.some(function (val) {
	                return val.reduce(function (a, b) {
	                    return a + b;
	                }) === 3;
	            })) res = 1;
	            if (cols.some(function (val) {
	                return val.reduce(function (a, b) {
	                    return a + b;
	                }) === -3;
	            })) res = -1;
	            if (diagonal.some(function (val) {
	                return val.reduce(function (a, b) {
	                    return a + b;
	                }) === 3;
	            })) res = 1;
	            if (diagonal.some(function (val) {
	                return val.reduce(function (a, b) {
	                    return a + b;
	                }) === -3;
	            })) res = -1;
	            return res;
	        }
	    }, {
	        key: 'showGameResult',
	        value: function showGameResult() {
	            var isOver = false;
	            var gameResult = this.checkOutcome();
	            var title = document.getElementById('title');
	            if (gameResult === 1) {
	                title.firstChild.nodeValue = 'You win!';
	                isOver = true;
	            } else if (gameResult === -1) {
	                title.firstChild.nodeValue = 'You lose!';
	                isOver = true;
	            } else if (gameResult === -2) {
	                title.firstChild.nodeValue = 'Dogfall!';
	                isOver = true;
	            }
	            return isOver;
	        }
	    }]);

	    return MainLogic;
	}();

	exports.default = function () {
	    return false;
	};

	exports.MainLogic = MainLogic;

/***/ })
/******/ ]);