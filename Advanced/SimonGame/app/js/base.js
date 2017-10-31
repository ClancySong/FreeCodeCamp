import { data } from './data';
import {
    playOrder,
    addBtnEvent,
    resetGame,
} from './gameLogic';

function main() {
    const START = document.getElementById('start');
    const STRICT = document.getElementById('strict');

    START.onclick = () => {
        if (data.isStart) {
            data.isStart = false;
            START.classList.remove('active');
            resetGame();
        } else {
            data.isStart = true;
            START.classList.add('active');
            playOrder();
            addBtnEvent();
        }
    };

    STRICT.onclick = () => {
        if (data.isStrict) {
            STRICT.classList.remove('active');
            data.isStrict = false;
        } else {
            STRICT.classList.add('active');
            data.isStrict = true;
        }
    };
}

window.onload = main;