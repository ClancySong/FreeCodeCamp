// 计时器构造函数
var Timer = function (durationTime) {
    this.durationTime = durationTime;
};
// 原型对象
Timer.prototype = {
    constructor: Timer,
    reduceTime: function () {
        return this.durationTime -= 1;
    },
    getConvertedTime: function () {
        var minutes = Math.floor(this.durationTime / 60);
        var seconds = this.durationTime % 60;
        return minutes + ':' + seconds;
    }
}

window.onload = main;

// 操作DOM
function main() {
    var timeShow = document.getElementById('time-show');
    var minute = document.getElementById('minute');

    // 计时器对象
    var timer = new Timer(minute.firstChild.nodeValue * 60);

    // 计时器运行状态 0 停止 1 正在运行 2 暂停
    var timerStatus = 0;

    // 存储计时事件
    var timerVal;

    // 计时事件
    var runTimer = function () {
        return setInterval(function () {
            var remainingTime = timer.reduceTime();
            if (remainingTime >= 0) {
                timeShow.firstChild.nodeValue = timer.getConvertedTime();
            } else {
                clearInterval(timerVal);
                alert('计时结束！');
            }
        }, 1000);
    }

    // 开始与暂停
    var start = document.getElementById('start');
    start.onclick = function () {
        switch (timerStatus) {
            case 0:
                timer.durationTime = minute.firstChild.nodeValue * 60;
                timerVal = runTimer();
                timerStatus = 1;
                this.firstChild.nodeValue = '暂停';
                break;
            case 1:
                clearInterval(timerVal);
                timerStatus = 2;
                this.firstChild.nodeValue = '继续';
                break;
            case 2:
                timerVal = runTimer();
                timerStatus = 1;
                this.firstChild.nodeValue = '暂停';
                break;
            default:
                break;
        }
    };

    // 复位
    var reset = document.getElementById('reset');
    reset.onclick = function () {
        timer.durationTime = minute.firstChild.nodeValue * 60;
        timeShow.firstChild.nodeValue = timer.getConvertedTime();
        timerStatus = 0;
        start.firstChild.nodeValue = '开始';
        clearInterval(timerVal);
    };

    // 设置计时时长
    var up = document.getElementById('up');
    var down = document.getElementById('down');
    up.onclick = function () {
        minute.firstChild.nodeValue++;
        timer.durationTime = minute.firstChild.nodeValue * 60;
        timeShow.firstChild.nodeValue = timer.getConvertedTime();
    };
    down.onclick = function () {
        if (minute.firstChild.nodeValue > 1) {
            minute.firstChild.nodeValue--;
            timer.durationTime = minute.firstChild.nodeValue * 60;
            timeShow.firstChild.nodeValue = timer.getConvertedTime();
        }
    };
}