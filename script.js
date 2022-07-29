let tiles = document.querySelectorAll('.tile');
const inputBtns = document.querySelectorAll('.input-btn');

const gameModeCont = document.querySelector('.game-mode');
const playerCont = document.querySelector('.player-cont');
const computerCont = document.querySelector('.computer-cont');
const difficultyCont = document.querySelector('.difficulty-cont');

const playerTiles = playerCont.querySelectorAll('.tile');
const computerTiles = computerCont.querySelectorAll('.tile');

const inputForm = document.querySelector('#name-form');
const playerXCont = document.querySelectorAll('.playerX-cont');
const playerOCont = document.querySelectorAll('.playerO-cont');
const scoreText = document.querySelectorAll('.score-text');

const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let currentPlayer = 'X';
let playerX;
let playerO;
let playerXScore = 0;
let playerOScore = 0;
let tileEntries = ['', '', '', '', '', '', '', '' , ''];
let gameMode;
let difficulty;

const Person = function(name) {

    this.name = name

    return { name: name }

}

const inputValue = (e) => {     // Adds X or O to each tile

    tiles = document.querySelectorAll('.tile');

    if (e.target.innerHTML != '') {
        
        return
    
    } else {

        e.target.innerHTML = currentPlayer;

        tileEntries.shift();
        tileEntries.push(currentPlayer);

    }

    if (checkWin()) {

        scoreText.forEach(score => score.innerHTML = `${currentPlayer} Won`);

        playerXCont.forEach(cont => cont.classList.remove('row-border'));
        playerOCont.forEach(cont => cont.classList.remove('row-border'));

        if (currentPlayer === 'X') { playerXScore++ } else { playerOScore++ }
        
        setScores();
        setTimeout(() => {

            tiles.forEach(tile => tile.innerHTML = '');
            scoreText.forEach(score => score.innerHTML = ``);

            currentPlayer = 'X';

            playerXCont.forEach(cont => cont.classList.add('row-border'));

        }, 1000);

        tileEntries = ['', '', '', '', '', '', '', '' , ''];

    } else if (checkDraw()) {

        scoreText.forEach(score => score.innerHTML = `Draw`);

        playerXCont.forEach(cont => cont.classList.remove('row-border'));
        playerOCont.forEach(cont => cont.classList.remove('row-border'));

        setTimeout(() => {

            tiles.forEach(tile => tile.innerHTML = ''); 
            scoreText.forEach(score => score.innerHTML = ``);

            playerXCont.forEach(cont => cont.classList.add('row-border'));

        }, 1000);

        tileEntries = ['', '', '', '', '', '', '', '' , ''];

    } else if (currentPlayer === 'X') {

        currentPlayer = 'O';

        playerXCont.forEach(cont => cont.classList.remove('row-border'));
        playerOCont.forEach(cont => cont.classList.add('row-border'));

    } else {

        currentPlayer = 'X';

        playerXCont.forEach(cont => cont.classList.add('row-border'));
        playerOCont.forEach(cont => cont.classList.remove('row-border'));

    }

    setTimeout(() => { if (gameMode === 'computer' && currentPlayer === 'O') { computerClick() } }, 400)

}

function computerClick() {

    if (difficulty === 'easy') {

        let tile = tiles[Math.floor(Math.random() * 9)];

        if (tile.innerHTML === '') { return setTimeout(() => {tile.click(tile)}, 200) }
        
        computerClick();

    }

}

function checkWin() {

    if (winningLines.some(lines => {

        return lines.every(index => {

            return tiles[index].innerHTML.match(currentPlayer)

        })

    })) {

        return true

    }

    return false

}

function checkDraw() {

    if (tileEntries.every(tile => { return tile != '' && tile.length > 0 })) {

        return true
    
    }

    return false

}

function processClick(e) {

    if (e.target.name === 'player') {

        gameMode = 'player';

        playerTiles.forEach(tile => tile.classList.add('tile'))
        computerTiles.forEach(tile => tile.classList.remove('tile'))

        gameModeCont.classList.add('hidden');
        setTimeout(() => { playerCont.classList.remove('hidden') }, 250)

    } else if (e.target.name === 'computer') {

        gameMode = 'computer';

        playerTiles.forEach(tile => tile.classList.remove('tile'))
        computerTiles.forEach(tile => tile.classList.add('tile'))

        gameModeCont.classList.add('hidden');
        setTimeout(() => { difficultyCont.classList.remove('hidden') }, 250)

    } else if (e.target.name === 'easy') {

        difficulty = 'easy';
        difficultyCont.classList.add('hidden');
        setTimeout(() => { computerCont.classList.remove('hidden') }, 250)
    }

}

function setScores() {

    playerXCont.forEach(cont => cont.querySelector('#playerX-score').innerHTML = `${playerXScore}`);
    playerOCont.forEach(cont => cont.querySelector('#playerO-score').innerHTML = `${playerOScore}`);

}

tiles.forEach(tile => tile.addEventListener('click', inputValue));
inputBtns.forEach(btn => btn.addEventListener('click', processClick));