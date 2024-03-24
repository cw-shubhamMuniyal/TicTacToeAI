let players = ['X', 'O'];
let player1 = 'X';
let player2 = 'O';
let ai = 'O';
let positionOccupied = 0;
let winner = null;
let board = [];
let currentPlayer;
let isAiPlaying = true;

function setHumanPlaying() {
    $("#turn-text").html(`Turn for player playing <b>${currentPlayer}</b>`);
    isAiPlaying = false;
}

function setAiPlaying() {
    $("#turn-text").html(``);
    isAiPlaying = true;
}

function toggleTurns() {
    if (currentPlayer == player1) {
        currentPlayer = player2;
    }
    else {
        currentPlayer = player1;
    }
    $("#turn-text").html(`Turn for player playing <b>${currentPlayer}</b`);
}

function setup() {
    // createCanvas(windowWidth, windowHeight);
    frameRate(4);
    currentPlayer = player1;
    initBoard();

    var cnv = createCanvas(400, 400);
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    cnv.position(x, y);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function nextTurn() {
    let bestScore = 1000;
    let bestMove;

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] == '') {
                board[i][j] = ai;
                let score = minimax(true, 0);
                console.log(score + " score");
                if (bestScore > score) {
                    bestScore = score;
                    bestMove = { i, j };
                }
                board[i][j] = '';
            }
        }
    }
    if (bestMove) {
        board[bestMove.i][bestMove.j] = ai;
        positionOccupied++;
    }
    currentPlayer = player1;
}

function initBoard() {
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ];
}

function mousePressed() {
    if (winner != null) {
        winner = null;
        clear();
        initBoard()
        positionOccupied = 0;
        setup();
        return;
    }
    else if (currentPlayer == player1 || currentPlayer == player2) {
        let i = floor(mouseX / w);
        let j = floor(mouseY / h);
        if (board[i][j] == '') {
            board[i][j] = currentPlayer;
            positionOccupied++;
            if (isAiPlaying) {
                currentPlayer = ai;
                nextTurn();
            }
            else {
                toggleTurns();
            }
        }
    }
}

function equals3(a, b, c) {
    return (a == b && b == c && (a == 'X' || a == 'O'));
}

function coord(i, j) {
    coordinate = { a: (i * w + w / 2), b: (j * h + h / 2) };
    return coordinate;
}

function checkWinner() {
    for (let i = 0; i < 3; i++) {
        if (equals3(board[i][0], board[i][1], board[i][2])) {
            line(coord(i, 0).a, coord(i, 0).b, coord(i, 1).a, coord(i, 2).b);
            line(coord(i, 1).a, coord(i, 1).b, coord(i, 2).a, coord(i, 2).b);
            return board[i][0];
        }
        if (equals3(board[0][i], board[1][i], board[2][i])) {
            line(coord(0, i).a, coord(0, i).b, coord(1, i).a, coord(1, i).b);
            line(coord(1, i).a, coord(1, i).b, coord(2, i).a, coord(2, i).b);
            return board[0][i];
        }
    }
    if (equals3(board[0][0], board[1][1], board[2][2])) {
        line(coord(0, 0).a, coord(0, 0).b, coord(1, 1).a, coord(1, 1).b);
        line(coord(1, 1).a, coord(1, 1).b, coord(2, 2).a, coord(2, 2).b);
        return board[0][0];
    }
    if (equals3(board[2][0], board[1][1], board[0][2])) {
        line(coord(2, 0).a, coord(2, 0).b, coord(1, 1).a, coord(1, 1).b);
        line(coord(1, 1).a, coord(1, 1).b, coord(0, 2).a, coord(0, 2).b);
        return board[2][0];
    }
    if (positionOccupied == 9) {
        console.log(9 + "tie");
        return "tie";
    }
    return null;
}

function draw() {
    if (winner == null) {
        w = width / 3;
        h = height / 3;
        background(220);
        line(w, 0, w, height);
        line(w * 2, 0, w * 2, height);
        line(0, h, width, h);
        line(0, 2 * h, width, 2 * h);
        strokeWeight(6);

        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                let x = i * w + w / 2;
                let y = j * h + h / 2;
                let xr = w / 4;
                let spot = board[i][j];
                if (spot == 'X') {

                    line(x - xr, y - xr, x + xr, y + xr);
                    line(x - xr, y + xr, x + xr, y - xr);
                }
                else if (spot == 'O') {
                    ellipse(x, y, xr * 2);
                }
            }
        }
        winner = checkWinner();
        let winnerScreenTimeOut = 0, resultText = "";
        if(winner === "tie") {
            resultText = "Game is Tie";
        }
        else {
            resultText = "The winner is..." + winner;
            winnerScreenTimeOut = 2000;
        }
        if (winner != null) {
            console.log("winner is" + winner);
            $("#turn-text").html(``);
            setTimeout(() => {
                background(220);
                textSize(24);
                textAlign(CENTER);
                this.resultText = resultText;
                text(this.resultText, width / 2, height / 2);
                text("Click anywhere for a new game", width / 2, height / 2 + 30);
            }, winnerScreenTimeOut);
        }
    }
}