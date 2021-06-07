const playerFactory = (name, symbol) => {
    return {
        name,
        symbol,
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

    const declareWinner = (winner) => {
        display.innerText = winner + ' wins.'
    };

    const declareTie = () => {
        display.innerText = 'It\' a tie.'
    }

    return {
        declareWinner,
        declareTie,
    };
})();

const game = (() => {
    gameBoard.createField();

    const processForm = () => {
        const formData = document.getElementById('form')

        const player1 = playerFactory(formData[0].value, formData[1].value);
        const player2 = playerFactory(formData[2].value, formData[3].value);

        return {
            player1,
            player2,
        };
    };

    let currentPlayer = processForm().player1;

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
            currentPlayer = processForm().player2;
        }
        else {
            currentPlayer = processForm().player1;
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
            displayController.declareWinner(currentPlayer.name);
        }
        else if (!checkWinner() && checkTie()) {
            displayController.declareTie();
        };
    };

    const resetGame = () => {
        gameBoard.resetBoard();
        currentPlayer = processForm().player1;
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
    //document.getElementById('restart')
    document.getElementById('reset').addEventListener('click', resetGame);
})();