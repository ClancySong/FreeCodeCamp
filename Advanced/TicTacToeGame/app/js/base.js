import {
    MainLogic,
} from './MainLogic';

function main() {
    const circle = document.getElementById('circle');
    const cross = document.getElementById('cross');
    const title = document.getElementById('title');
    let mainLogic = new MainLogic('o');

    function resetGame() {
        mainLogic.checkerboard = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ];
        mainLogic.stepNumber = 0;
        title.firstChild.nodeValue = 'Playing...';
        for (let i = 0; i < 3; i += 1) {
            for (let j = 0; j < 3; j += 1) {
                const checker = document.getElementById(`checker-${i}-${j}`);
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

    circle.onclick = () => {
        title.firstChild.nodeValue = 'Playing...';
        mainLogic = new MainLogic('o');
        resetGame();
        circle.classList.add('btn-active');
    };

    cross.onclick = () => {
        title.firstChild.nodeValue = 'Playing...';
        mainLogic = new MainLogic('x');
        resetGame();
        cross.classList.add('btn-active');
    };
}

window.onload = main;