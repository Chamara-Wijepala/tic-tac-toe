const playerFactory = (name, symbol, score) => {
    return {
        name,
        symbol,
        score,
    };
};

const gameBoard = (() => {
    let _board = ['', '', '', '', '', '', '', '', ''];
    let _field = document.querySelector('.field');

    const createField = () => {
        for (i = 0; i < _board.length; i++) {
            let square = _field.appendChild(document.createElement('button'));
            square.className = 'square';
            square.innerText = _board[i];
            square.dataset.ID = i;
        };
    };

    const removeField = () => {
        for (i = 0; i < _board.length; i++) {
            _field.removeChild(_field.childNodes[0]);
        };
    };

    const setField = (symbol, id) => {
        removeField();

        _board[id] = symbol;

        createField();
    };

    const resetBoard = () => {
        _board = ['', '', '', '', '', '', '', '', ''];
        removeField();
        createField();
    };

    const getBoardCopy = () => {
        return [] = _board;
    };

    const rows = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    return {
        createField,
        setField,
        resetBoard,
        getBoardCopy,
        rows,
    };
})();

const displayController = (() => {
    const display = document.getElementById('end-message');
    const player1Score = document.getElementById('player1-score');
    const player2Score = document.getElementById('player2-score');

    const displayName = (name1, name2) => {
        document.getElementById('player1-heading').innerText = name1 + '\'s score';
        document.getElementById('player2-heading').innerText = name2 + '\'s score';
    };

    const displayScore = (score1, score2) => {
        player1Score.innerText = score1;
        player2Score.innerText = score2;
    };

    const updateScore = (currentPlayer) => {
        if (currentPlayer.symbol === 'X') {
            player1Score.innerText = currentPlayer.score;
        }
        else {
            player2Score.innerText = currentPlayer.score;
        };
    };

    const declareWinner = (winner) => {
        display.innerText = winner + ' wins'
    };

    const declareTie = () => {
        display.innerText = 'It\'s a tie'
    }

    const openForm = () => {
        document.getElementById('form-div').style.display = 'block';
    };

    const closeForm = () => {
        document.getElementById('form-div').style.display = 'none';
    };

    const openOverlay = () => {
        document.querySelector('.overlay').style.height = '100%';
    };

    const closeOverlay = () => {
        document.querySelector('.overlay').style.height = '0%';
    };

    return {
        displayName,
        displayScore,
        updateScore,
        declareWinner,
        declareTie,
        openForm,
        closeForm,
        openOverlay,
        closeOverlay,
    };
})();

const game = (() => {
    const processForm = () => {
        const formData = document.getElementById('form')

        const player1 = playerFactory(formData[0].value, formData[1].value, 0);
        const player2 = playerFactory(formData[2].value, formData[3].value, 0);

        displayController.displayName(player1.name, player2.name);
        return {
            player1,
            player2,
        };
    };

    const player1 = processForm().player1;
    const player2 = processForm().player2;
    let currentPlayer = player1;

    const getButtonData = (e) => {
        let buttonText = e.target.innerText;
        let buttonId = e.target.dataset.ID;

        return {
            buttonText,
            buttonId,
        };
    };

    const switchPlayer = () => {
        if (currentPlayer.symbol === 'X') {
            currentPlayer = player2;
        }
        else {
            currentPlayer = player1;
        };
    };

    const checkWinner = () => {
        return gameBoard.rows.some(combination => {
            return combination.every(index => {
                return gameBoard.getBoardCopy()[index] === currentPlayer.symbol;
            });
        });
    };

    const checkTie = () => {
        return gameBoard.getBoardCopy().every(element => {
            return element !== '';
        })
    };

    const gameOver = () => {
        if (checkWinner()) {
            currentPlayer.score += 1;
            displayController.updateScore(currentPlayer);
            displayController.declareWinner(currentPlayer.name);
            displayController.openOverlay();
        }
        else if (!checkWinner() && checkTie()) {
            displayController.declareTie();
            displayController.openOverlay();
        };
    };

    const reloadGame = () => {
        location.reload();
    };

    const resetGame = () => {
        gameBoard.resetBoard();
        currentPlayer = processForm().player1;
        displayController.closeOverlay();
    };

    const buttonClick = (e) => {
        let {buttonText, buttonId} = getButtonData(e);

        if (buttonText === '') {
            gameBoard.setField(currentPlayer.symbol, buttonId);
            gameOver();
        }
        else {
            return;
        };

        switchPlayer();
    };

    document.querySelector('.field').addEventListener('click', buttonClick);
    document.getElementById('restart').addEventListener('click', reloadGame);
    document.getElementById('reset').addEventListener('click', resetGame);

    gameBoard.createField();
    displayController.displayScore(player1.score, player2.score);

    return {
        processForm,
    }
})();