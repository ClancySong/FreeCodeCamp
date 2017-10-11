var mainFunc = function () {
    var screen = document.getElementsByClassName('screen-inner')[0];
    var numBtns = document.getElementsByClassName('btn-number');
    for (var i = 0; i < numBtns.length; i++) {
        numBtns[i].onclick = function () {
            var num = this.getAttribute('value');
            screen.firstChild.nodeValue += num;
        };
    }

    var opraBtns = document.getElementsByClassName('btn-operator');
    var opras = ['+', '-', '*', '/', '.'];
    for (i = 0; i < opraBtns.length; i++) {
        opraBtns[i].onclick = function () {
            var screenValue = screen.firstChild.nodeValue;
            if (screenValue && opras.indexOf(screenValue[screenValue.length - 1]) === -1) {
                screen.firstChild.nodeValue += this.getAttribute('value');
            }
        };
    }

    var signBtn = document.getElementById('btn-sign');
    signBtn.onclick = function () {
        var screenValue = screen.firstChild.nodeValue;
        if (screenValue[screenValue.length - 1] === '-') {
            screen.firstChild.nodeValue = screenValue.slice(0, -1) + '+';
        } else if (screenValue[screenValue.length - 1] === '+') {
            screen.firstChild.nodeValue = screenValue.slice(0, -1) + '-';
        } else {
            screen.firstChild.nodeValue += '-';
        }
    };


    var clearBtn = document.getElementById('btn-clr');
    clearBtn.onclick = function () {
        screen.firstChild.nodeValue = '';
    };

    var delBtn = document.getElementById('btn-del');
    delBtn.onclick = function () {
        var screenValue = screen.firstChild.nodeValue;
        screen.firstChild.nodeValue = screenValue.slice(0, -1);
    };

    var equalBtn = document.getElementById('btn-equal');
    equalBtn.onclick = function () {
        var screenValue = screen.firstChild.nodeValue;
        var ans = eval(screenValue);
        screen.firstChild.nodeValue = ans;
    };
};

window.onload = mainFunc;