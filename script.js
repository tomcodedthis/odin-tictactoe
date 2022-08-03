const tiles = document.querySelectorAll('.tile');
const inputBtns = document.querySelectorAll('.input-btn');

const gameModeCont = document.querySelector('.game-mode');
const difficultyCont = document.querySelector('.difficulty-cont');
const gameCont = document.querySelector('.game-cont');

const playerXCont = document.querySelector('.playerX-cont');
const playerOCont = document.querySelector('.playerO-cont');
const scoreText = document.querySelectorAll('.score-text');

const winningLines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

let gameMode;
let difficulty;
let playerXScore = 0;
let playerOScore = 0;

let currentPlayer = 'X';
let prevTile;
let xTiles = [];
let oTiles = [];

const Person = function(name) {

    this.name = name

    return { name: name }

}

const inputValue = (e) => {     // Adds X or O to each tile

    const guns = document.querySelectorAll('.gun');
    const random = Math.floor(Math.random() * 3)

    prevTile = e.target.id - 1;

    if (e.target.textContent != '') {
        
        return
    
    } else {

        e.target.textContent = currentPlayer;

        guns[random].currentTime = 0;
        guns[random].play();

    }

    if (checkWin()) {

        document.querySelector('.cheer').currentTime = 0
        document.querySelector('.cheer').play()
        scoreText.forEach(score => score.textContent = `${currentPlayer} Won`);

        if (currentPlayer === 'X') { playerXScore++ } else { playerOScore++ }

        reset();

        return

    } else if (checkDraw()) {

        scoreText.forEach(score => score.textContent = `Draw`);

        reset();

        return

    } else if (currentPlayer === 'X') {

        xTiles.push(prevTile);
        currentPlayer = 'O';

        playerXCont.classList.remove('row-border');
        playerOCont.classList.add('row-border');

    } else {

        oTiles.push(prevTile);
        currentPlayer = 'X';

        playerXCont.classList.add('row-border');
        playerOCont.classList.remove('row-border');

    }

    setTimeout(() => { if (gameMode === 'computer' && currentPlayer === 'O') { computerClick() } }, 400)

}

function computerClick() {

    let tile;
    let remainingLines = [];

    if (difficulty === 'easy') {

        tile = tiles[Math.floor(Math.random() * 9)];

        if (tile.textContent === '') { return setTimeout(() => {tile.click(tile)}, 200) }

        return computerClick();

    } else if (difficulty === 'medium') {

        winningLines.forEach(line => {

            if (compareArrays(line, xTiles)) { remainingLines.push(line) }

        })

        if (remainingLines.length > 0) {

            remainingLines.some(line => {

                if (line.some(t => {

                    if (tiles[t].textContent === '') {

                        tiles[t].click()
                        return true

                    }
                })) { return true }

            })

        } else {        // If there are no remaining lines

            let on = true;

            tiles.forEach(tile => {

                if (tile.textContent === '' && on) {

                    on = false;
                    tile.click();
                    return

                }

            })

        }

    } else if (difficulty === 'impossible') {

    }

    function compareArrays(line, xTiles) {       // Checks what winning lines remain

        return xTiles.every(value => {
            return line.includes(value);
            });
    }
}

function checkWin() {

    if (winningLines.some(lines => {

        return lines.every(index => {

            return tiles[index].textContent.match(currentPlayer)

        })

    })) {

        return true

    }

    return false

}

function checkDraw() {

    let tileEntries = []

    tiles.forEach(tile => {
        
        if (tile.textContent != '' ) {

            tileEntries.push(tile);
            
        }
    })

    if (tileEntries.length === 9) { return true }

    return false

}

function setScores() {

    playerXCont.querySelector('.playerX-score').textContent = `${playerXScore}`;
    playerOCont.querySelector('.playerO-score').textContent = `${playerOScore}`;

}

function reset() {

    playerXCont.classList.remove('row-border');
    playerOCont.classList.remove('row-border');

    setScores();
    setTimeout(() => {

        tiles.forEach(tile => tile.textContent = '');
        scoreText.forEach(score => score.textContent = ``);

        currentPlayer = 'X';
        xTiles = [];

        playerXCont.classList.add('row-border');

    }, 1000);

}

function processClick(e) {

    document.querySelector('.click').currentTime = 0
    document.querySelector('.click').play()

    if (e.target.name === 'player') {

        gameMode = 'player';

        gameModeCont.classList.add('hidden');
        setTimeout(() => { gameCont.classList.remove('hidden') }, 250)

    } else if (e.target.name === 'computer') {

        gameMode = 'computer';

        gameModeCont.classList.add('hidden');
        setTimeout(() => { difficultyCont.classList.remove('hidden') }, 250)

    } else if (e.target.name === 'easy') {

        difficulty = 'easy';
        difficultyCont.classList.add('hidden');
        setTimeout(() => { gameCont.classList.remove('hidden') }, 250)

    } else if (e.target.name === 'medium') {

        difficulty = 'medium';
        difficultyCont.classList.add('hidden');
        setTimeout(() => { gameCont.classList.remove('hidden') }, 250)

    } else if (e.target.name === 'impossible') {

        return

    } else if (e.target.name === 'home') {

        gameCont.classList.add('hidden');
        setTimeout(() => { gameModeCont.classList.remove('hidden') }, 250)

        playerXScore = 0;
        playerOScore = 0;
        reset();

    } else if (e.target.name === 'reset') {

        playerXScore = 0;
        playerOScore = 0;
        reset();

    } else if (e.target.name === 'volume') {

        const unmute = document.querySelector('.unmute');
        const mute = document.querySelector('.mute');

        if (e.target.alt === 'unmute') {

            unmute.classList.add('hidden');
            mute.classList.remove('hidden');
            
            document.querySelectorAll('audio').forEach(audio => audio.muted = true)

        } else {

            unmute.classList.remove('hidden');
            mute.classList.add('hidden');

            document.querySelectorAll('audio').forEach(audio => audio.muted = false)

        }

    }

}

tiles.forEach(tile => tile.addEventListener('click', inputValue));
inputBtns.forEach(btn => btn.addEventListener('click', processClick));