'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.resetGame = undefined;

var _MainLogic = require('./MainLogic');

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

exports.default = function () {
    return false;
};

exports.resetGame = resetGame;