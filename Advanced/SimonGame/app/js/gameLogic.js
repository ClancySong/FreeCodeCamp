import { data } from './data';

const GREEN = document.getElementById('green');
const RED = document.getElementById('red');
const YELLOW = document.getElementById('yellow');
const BLUE = document.getElementById('blue');
const SCREEN = document.getElementById('screen');
const timerEvents = [];
const simonSound = document.getElementById('simon-sound');
const wrongSound = document.getElementById('wrong-sound');
const colorBtns = [GREEN, RED, YELLOW, BLUE];

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
    data.orderData.forEach((val, index) => {
        timerEvents.push(setTimeout(() => {
            addLight(val);
            simonSound.play();
        }, index * 1000));
        timerEvents.push(setTimeout(() => {
            removeLight(val);
        }, (index * 1000) + 500));
    });
}

//  开始显示下一序列
function playOrder() {
    data.addItem();
    data.currentIndex = 0;
    timerEvents.push(setTimeout(() => {
        showOrder();
        SCREEN.firstChild.nodeValue = data.orderData.length;
    }, 500));
}

//  点击正确事件
function correctEvent() {
    data.currentIndex += 1;
    if (data.currentIndex === data.orderData.length) {
        if (data.orderData.length === 20) {
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
    if (data.isStrict) {
        SCREEN.firstChild.nodeValue = 'WRONG!';
        data.orderData = [];
        playOrder();
    } else {
        SCREEN.firstChild.nodeValue = 'WRONG!';
        data.currentIndex = 0;
        timerEvents.push(setTimeout(() => {
            showOrder();
            SCREEN.firstChild.nodeValue = data.orderData.length;
        }, 500));
    }
}

//  设置色块按钮点击事件
function addBtnEvent() {
    colorBtns.forEach((val, index) => {
        val.onclick = () => {
            if (data.orderData[data.currentIndex] === index + 1) {
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
    data.orderData = [];
    data.currentIndex = 0;
    timerEvents.forEach((val) => {
        clearTimeout(val);
    });
    GREEN.classList.remove('green-light');
    RED.classList.remove('red-light');
    YELLOW.classList.remove('yellow-light');
    BLUE.classList.remove('blue-light');
}

export {
    playOrder,
    addBtnEvent,
    resetGame,
};