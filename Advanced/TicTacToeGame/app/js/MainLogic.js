class MainLogic {
    constructor(playerChessPiece) {
        this.checkerboard = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ];
        this.playerChessPiece = playerChessPiece;
        this.stepNumber = 0;
        for (let i = 0; i < 3; i += 1) {
            for (let j = 0; j < 3; j += 1) {
                const checker = document.getElementById(`checker-${i}-${j}`);
                checker.onclick = () => {
                    const icon = checker.firstElementChild;
                    if (icon.classList.length < 2) {
                        if (this.playerChessPiece === 'x') {
                            icon.classList.add('fa-close');
                        } else if (this.playerChessPiece === 'o') {
                            icon.classList.add('fa-circle-o');
                        }
                        this.checkerboard[i][j] = 1;
                        if (!this.showGameResult()) {
                            this.aiMoveInChess();
                            this.showGameResult();
                        }
                    }
                };
            }
        }
    }
    checkCheckerboardIsFull() {
        return this.checkerboard.every(val => val.every(checkerStatus => checkerStatus !== 0));
    }
    /**
     * 执行落子事件
     * 传入落点坐标
     * 成功返回true 所选位置已有棋子则返回false
     */
    moveInChess(i, j) {
        const checker = document.getElementById(`checker-${i}-${j}`);
        const icon = checker.firstElementChild;
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
    randomMoveInChess() {
        if (!this.checkCheckerboardIsFull()) {
            for (;;) {
                const randomRow = Math.floor(Math.random() * 3);
                const randomCol = Math.floor(Math.random() * 3);
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
    checkTwoConnection() {
        let res = 0;
        const rows = this.checkerboard;
        const cols = [
            [],
            [],
            [],
        ];
        for (let i = 0; i < this.checkerboard.length; i += 1) {
            for (let j = 0; j < this.checkerboard.length; j += 1) {
                cols[i][j] = this.checkerboard[j][i];
            }
        }
        const diagonal = [
            [this.checkerboard[0][0], this.checkerboard[1][1], this.checkerboard[2][2]],
            [this.checkerboard[0][2], this.checkerboard[1][1], this.checkerboard[2][0]],
        ];
        rows.forEach((val) => {
            if (val.reduce((a, b) => a + b) === 2) {
                res = 1;
            }
        });
        cols.forEach((val) => {
            if (val.reduce((a, b) => a + b) === 2) {
                res = 1;
            }
        });
        diagonal.forEach((val) => {
            if (val.reduce((a, b) => a + b) === 2) {
                res = 1;
            }
        });
        rows.forEach((val) => {
            if (val.reduce((a, b) => a + b) === -2) {
                res = -1;
            }
        });
        cols.forEach((val) => {
            if (val.reduce((a, b) => a + b) === -2) {
                res = -1;
            }
        });
        diagonal.forEach((val) => {
            if (val.reduce((a, b) => a + b) === -2) {
                res = -1;
            }
        });
        return res;
    }
    /**
     * 连接两子相连的空位
     */
    connectChessPiece() {
        const rows = this.checkerboard;
        const cols = [
            [],
            [],
            [],
        ];
        for (let i = 0; i < this.checkerboard.length; i += 1) {
            for (let j = 0; j < this.checkerboard.length; j += 1) {
                cols[i][j] = this.checkerboard[j][i];
            }
        }
        const diagonal = [
            [this.checkerboard[0][0], this.checkerboard[1][1], this.checkerboard[2][2]],
            [this.checkerboard[0][2], this.checkerboard[1][1], this.checkerboard[2][0]],
        ];
        for (let i = 0; i < rows.length; i += 1) {
            if (rows[i].reduce((a, b) => a + b) === -2) {
                rows[i].forEach((checker, j) => {
                    if (checker === 0) {
                        this.moveInChess(i, j);
                    }
                });
                return;
            }
        }
        for (let i = 0; i < cols.length; i += 1) {
            if (cols[i].reduce((a, b) => a + b) === -2) {
                cols[i].forEach((checker, j) => {
                    if (checker === 0) {
                        this.moveInChess(j, i);
                    }
                });
                return;
            }
        }
        for (let i = 0; i < diagonal.length; i += 1) {
            if (diagonal[i].reduce((a, b) => a + b) === -2) {
                diagonal[i].forEach((checker, j) => {
                    if (checker === 0) {
                        if (i === 0) {
                            this.moveInChess(j, j);
                        } else if (i === 1) {
                            this.moveInChess(j, 2 - j);
                        }
                    }
                });
                return;
            }
        }
    }
    /**
     * 封堵两子相连的空位
     */
    blockChessPiece() {
        const rows = this.checkerboard;
        const cols = [
            [],
            [],
            [],
        ];
        for (let i = 0; i < this.checkerboard.length; i += 1) {
            for (let j = 0; j < this.checkerboard.length; j += 1) {
                cols[i][j] = this.checkerboard[j][i];
            }
        }
        const diagonal = [
            [this.checkerboard[0][0], this.checkerboard[1][1], this.checkerboard[2][2]],
            [this.checkerboard[0][2], this.checkerboard[1][1], this.checkerboard[2][0]],
        ];
        for (let i = 0; i < rows.length; i += 1) {
            if (rows[i].reduce((a, b) => a + b) === 2) {
                rows[i].forEach((checker, j) => {
                    if (checker === 0) {
                        this.moveInChess(i, j);
                    }
                });
                return;
            }
        }
        for (let i = 0; i < cols.length; i += 1) {
            if (cols[i].reduce((a, b) => a + b) === 2) {
                cols[i].forEach((checker, j) => {
                    if (checker === 0) {
                        this.moveInChess(j, i);
                    }
                });
                return;
            }
        }
        for (let i = 0; i < diagonal.length; i += 1) {
            if (diagonal[i].reduce((a, b) => a + b) === 2) {
                diagonal[i].forEach((checker, j) => {
                    if (checker === 0) {
                        if (i === 0) {
                            this.moveInChess(j, j);
                        } else if (i === 1) {
                            this.moveInChess(j, 2 - j);
                        }
                    }
                });
                return;
            }
        }
    }
    /**
     * 落子在玩家落子棱位的对角位
     */
    moveInCornerForArris() {
        const arris = [
            this.checkerboard[0][1],
            this.checkerboard[1][0],
            this.checkerboard[1][2],
            this.checkerboard[2][1],
        ];
        const randomPos = Math.floor(Math.random() * 2);
        if (arris[0] === 1) {
            const oppositeCorner = [
                [2, 0],
                [2, 2],
            ];
            if (this.moveInChess(oppositeCorner[randomPos][0], oppositeCorner[randomPos][1])) {
                return true;
            }
        } else if (arris[1] === 1) {
            const oppositeCorner = [
                [0, 2],
                [2, 2],
            ];
            if (this.moveInChess(oppositeCorner[randomPos][0], oppositeCorner[randomPos][1])) {
                return true;
            }
        } else if (arris[2] === 1) {
            const oppositeCorner = [
                [0, 0],
                [2, 0],
            ];
            if (this.moveInChess(oppositeCorner[randomPos][0], oppositeCorner[randomPos][1])) {
                return true;
            }
        } else if (arris[3] === 1) {
            const oppositeCorner = [
                [0, 0],
                [0, 2],
            ];
            if (this.moveInChess(oppositeCorner[randomPos][0], oppositeCorner[randomPos][1])) {
                return true;
            }
        }
        return false;
    }
    /**
     * 落子在玩家落子角位的邻角位
     */
    moveInCornerForCorner() {
        const corner = [
            this.checkerboard[0][0],
            this.checkerboard[0][2],
            this.checkerboard[2][0],
            this.checkerboard[2][2],
        ];
        const randomPos = Math.floor(Math.random() * 2);
        if (corner[0] === 1 || corner[3] === 1) {
            const oppositeCorner = [
                [0, 2],
                [2, 0],
            ];
            this.moveInChess(oppositeCorner[randomPos][0], oppositeCorner[randomPos][1]);
        } else if (corner[1] === 1 || corner[2] === 1) {
            const oppositeCorner = [
                [0, 0],
                [2, 2],
            ];
            this.moveInChess(oppositeCorner[randomPos][0], oppositeCorner[randomPos][1]);
        }
    }
    /**
     * 落子在棱位
     */
    moveInArris() {
        const arrisPositions = [
            [0, 1],
            [1, 0],
            [1, 2],
            [2, 1],
        ];
        const randomPos = Math.floor(Math.random() * 4);
        while (!this.moveInChess(arrisPositions[randomPos][0], arrisPositions[randomPos][1]));
    }
    /**
     * AI寻找落点
     */
    aiMoveInChess() {
        const center = this.checkerboard[1][1];
        const arris = [
            this.checkerboard[0][1],
            this.checkerboard[1][0],
            this.checkerboard[1][2],
            this.checkerboard[2][1],
        ];
        const corner = [
            this.checkerboard[0][0],
            this.checkerboard[0][2],
            this.checkerboard[2][0],
            this.checkerboard[2][2],
        ];
        if (this.playerChessPiece === 'o') {
            if (this.stepNumber === 0) {
                if (center === 1) {
                    const randomPos = Math.floor(Math.random() * 4);
                    const cornerPositions = [
                        [0, 0],
                        [0, 2],
                        [2, 0],
                        [2, 2],
                    ];
                    this.moveInChess(
                        cornerPositions[randomPos][0],
                        cornerPositions[randomPos][1],
                    );
                } else if (arris.some(val => val === 1) || corner.some(val => val === 1)) {
                    this.moveInChess(1, 1);
                }
                this.stepNumber += 1;
            } else if (this.stepNumber === 1) {
                if (this.checkTwoConnection() === 1) {
                    this.blockChessPiece();
                } else if (corner.filter(val => val === 1).length === 1) {
                    this.moveInCornerForCorner();
                } else if (corner.filter(val => val === 1).length === 2) {
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
                if (arris.some(val => val === 1)) {
                    this.moveInCornerForArris();
                } else if (corner.some(val => val === 1)) {
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
    checkOutcome() {
        let res = 0;
        if (this.checkCheckerboardIsFull()) res = -2;
        const rows = this.checkerboard;
        const cols = [
            [],
            [],
            [],
        ];
        for (let i = 0; i < this.checkerboard.length; i += 1) {
            for (let j = 0; j < this.checkerboard.length; j += 1) {
                cols[i][j] = this.checkerboard[j][i];
            }
        }
        const diagonal = [
            [this.checkerboard[0][0], this.checkerboard[1][1], this.checkerboard[2][2]],
            [this.checkerboard[0][2], this.checkerboard[1][1], this.checkerboard[2][0]],
        ];
        if (rows.some(val => val.reduce((a, b) => a + b) === 3)) res = 1;
        if (rows.some(val => val.reduce((a, b) => a + b) === -3)) res = -1;
        if (cols.some(val => val.reduce((a, b) => a + b) === 3)) res = 1;
        if (cols.some(val => val.reduce((a, b) => a + b) === -3)) res = -1;
        if (diagonal.some(val => val.reduce((a, b) => a + b) === 3)) res = 1;
        if (diagonal.some(val => val.reduce((a, b) => a + b) === -3)) res = -1;
        return res;
    }
    showGameResult() {
        let isOver = false;
        const gameResult = this.checkOutcome();
        const title = document.getElementById('title');
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
}

export default () => false;
export {
    MainLogic,
};