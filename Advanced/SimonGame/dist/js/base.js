'use strict';

var _data = require('./data');

var _gameLogic = require('./gameLogic');

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