const playerFactory = (name, symbol) => {
    return {
        name,
        symbol,
    };
};

const gameBoard = (() => {
    let _board = ['', '', '', '', '', '', '', '', ''];

    const createField = () => {
        for (i = 0; i < _board.length; i++) {
            let square = document.querySelector('.field').appendChild(document.createElement('button'));
            square.className = 'square';
            square.innerText = _board[i];
            square.dataset.ID = i;
        };
    };

    const setField = (symbol, id) => {
        
    };

    return {
        createField,
        setField,
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

    let currentPlayer = processForm().player1.symbol;

    const getButtonData = (e) => {
        let buttonText = e.target.innerText;
        let buttonId = e.target.dataset.ID;

        return {
            buttonText,
            buttonId,
        };
    };

    const switchPlayer = () => {
        if (currentPlayer === 'X') {
            currentPlayer = processForm().player2.symbol;
        }
        else {
            currentPlayer = processForm().player1.symbol;
        };
    };

    const buttonClick = (e) => {
        let {buttonText, buttonId} = getButtonData(e);

        if (buttonText === '') {
            gameBoard.setField(currentPlayer, buttonId);
        }
        else {
            console.log('Choose an empty space.')
        };

        switchPlayer();
    };

    document.querySelector('.field').addEventListener('click', buttonClick);

    return {

    };
})();