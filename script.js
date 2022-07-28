const tiles = document.querySelectorAll('.tile');
const inputBtns = document.querySelectorAll('.input-btn');
const gameCont = document.querySelector('.game-cont');
const gameMode = document.querySelector('.game-mode');
const inputForm = document.querySelector('#name-form');
const playerXCont = document.querySelector('#playerX-cont');
const playerOCont = document.querySelector('#playerO-cont');
const scoreText = document.querySelector('#score-text');

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

const Person = function(name) {

    this.name = name

    return { name: name }

}

const inputValue = (e) => {     // Adds X or O to each tile

    if (e.target.innerHTML != '') {
        
        return
    
    } else {

        e.target.innerHTML = currentPlayer;

        tileEntries.shift();
        tileEntries.push(currentPlayer);

        if (checkWin()) {

            scoreText.innerHTML = `${currentPlayer} Won`;

            playerXCont.classList.remove('row-border');
            playerOCont.classList.remove('row-border');

            if (currentPlayer === 'X') { playerXScore++ } else { playerOScore++ }
            
            setScores();
            setTimeout(() => {
    
                tiles.forEach(tile => tile.innerHTML = ''); 
                scoreText.innerHTML = ``;
    
                currentPlayer = 'X';
    
                playerXCont.classList.add('row-border');
    
            }, 1000);
    
            tileEntries = ['', '', '', '', '', '', '', '' , ''];

        } else if (checkDraw()) {

            scoreText.innerHTML = `Draw`;

            playerXCont.classList.remove('row-border');
            playerOCont.classList.remove('row-border');

            setTimeout(() => {

                tiles.forEach(tile => tile.innerHTML = ''); 
                scoreText.innerHTML = ``;

                playerXCont.classList.add('row-border');

            }, 1000);

            tileEntries = ['', '', '', '', '', '', '', '' , ''];

        } else if (currentPlayer === 'X') {

            currentPlayer = 'O';

            playerXCont.classList.remove('row-border');
            playerOCont.classList.add('row-border');

        } else {

            currentPlayer = 'X';

            playerXCont.classList.add('row-border');
            playerOCont.classList.remove('row-border');

        }

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

        gameMode.classList.add('hidden');
        setTimeout(() => { gameCont.classList.remove('hidden') }, 250)

    } else if (e.target.name === 'computer') {

        console.log('comp')

    }

}

function setScores() {

    playerXCont.querySelector('#playerX-score').innerHTML = `${playerXScore}`;
    playerOCont.querySelector('#playerO-score').innerHTML = `${playerOScore}`;

}

tiles.forEach(tile => tile.addEventListener('click', inputValue));
inputBtns.forEach(btn => btn.addEventListener('click', processClick));