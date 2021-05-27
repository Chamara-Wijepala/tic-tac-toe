const player = (symbol) => {

    return {};
};

const gameBoard = (() => {
    let _board = ['X', 'X', 'O', 'O', 'X', 'X', 'O', 'O', 'X'];

    const createField = () => {
        const field = document.querySelector('.field');
        for (i = 0; i < _board.length; i++) {
            let square = field.appendChild(document.createElement('button'));
            square.className = 'square';
            square.innerText = _board[i];
            square.dataset.ID = i;
        };
    };

    return {createField};
})();



gameBoard.createField();