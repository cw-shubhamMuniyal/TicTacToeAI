function minimax(isMax, depth) {

    let score = scoreFcn();

    if (score == 10 || score == -10) {
        return score;
    }

    if (!isMovesLeft()) {
        return 0;
    }


    if (isMax) {
        let bestMove = -1000;
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] == '') {
                    board[i][j] = player1;
                    let move = minimax(!isMax, depth + 1);
                    bestMove = max(bestMove, move);

                    board[i][j] = '';
                }
            }
        }
        return bestMove - depth;
    }

    else {
        let bestMove = 1000;
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] == '') {
                    board[i][j] = ai;
                    let move = minimax(!isMax, depth + 1);
                    bestMove = min(bestMove, move);

                    board[i][j] = '';
                }
            }
        }
        return bestMove + depth;
    }

}

function isMovesLeft() {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] == '') {
                return true;
            }
        }
    }
    return false;
}

function scoreFcn() {
    for (let i = 0; i < 3; i++) {
        if (equals3(board[i][0], board[i][1], board[i][2])) {
            if (board[i][0] == 'X')
                return 10;
            else
                return -10;
        }
    }

    for (let i = 0; i < 3; i++) {
        if (equals3(board[0][i], board[1][i], board[2][i])) {
            if (board[0][i] == 'X')
                return 10;
            else
                return -10;
        }
    }
    if (equals3(board[0][0], board[1][1], board[2][2])) {
        if (board[0][0] == 'X')
            return 10;
        else
            return -10;
    }
    if (equals3(board[2][0], board[1][1], board[0][2])) {
        if (board[2][0] == 'X')
            return 10;
        else
            return -10;
    }
    return 0;
}