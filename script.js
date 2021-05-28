const playerFactory = (name, symbol) => {
    return {
        name,
        symbol,
    };
};

const gameBoard = (() => {
    let _board = ['X', 'X', 'O', 'O', 'X', 'X', 'O', 'O', 'X'];

    const createField = () => {
        for (i = 0; i < _board.length; i++) {
            let square = document.querySelector('.field').appendChild(document.createElement('button'));
            square.className = 'square';
            square.innerText = _board[i];
            square.dataset.ID = i;
        };
    };

    const setField = (symbol) => {

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
    //document.querySelector('.field').addEventListener('click', add function that calls setfield and passes it player's symbol)

    return {
        processForm,
    };
})();