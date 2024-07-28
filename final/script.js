/* ---------- START GAME ---------- */

const startBtn = document.querySelector("#start");
const start = document.querySelector("#play");
const game = document.querySelector("#tiles");
const moveCounter = document.querySelector("#count");
let moveCount = 0;
const allTiles = document.querySelectorAll(".tile");
const winMessage = document.getElementById("win");

startBtn.addEventListener("click", startGame);

function startGame() {
    start.style.display = "none";
    game.style.display = "flex";
    count.style.display = "flex";
    moveCount = 0;
    moveCounter.innerText = "Moves: " + moveCount;
    generatePattern();
}

/* ---------- GENERATING PATTERN ---------- */

function generatePattern() {
    let randomPattern = Math.floor(Math.random() * 5);
    switch (randomPattern) {
        case 0:
            patternOne();
            break;
        case 1:
            patternTwo();
            break;
        case 2:
            patternThree();
            break;
        case 3:
            patternFour();
            break;
        case 4:
            patternFive();
            break;
    }
}

function patternOne() {
    activateTiles(["6", "8", "15", "18", "25"]);
}

function patternTwo() {
    activateTiles(["5", "11", "18", "20", "22", "23", "24"]);
}

function patternThree() {
    activateTiles(["1", "4", "11", "12", "16", "22", "24"]);
}

function patternFour() {
    activateTiles(["5", "7", "8", "9", "11", "13", "19", "20", "21", "24"]);
}

function patternFive() {
    activateTiles(["3", "6", "9", "10", "12", "16", "18", "21"]);
}

function activateTiles(tileIds) {
    tileIds.forEach(id => {
        const tile = document.getElementById(id);
        if (tile) {
            tile.classList.add("on");
        }
    });
}

/* ---------- GAME PLAY ---------- */

for (const tile of allTiles) {
    tile.addEventListener("click", () => {
        increaseCounter();
        tile.classList.toggle("on");
        toggleAdjacentTiles(tile);
        checkWin();
    });
}

function increaseCounter() {
    moveCount++;
    moveCounter.innerText = "Moves: " + moveCount;
}

function toggleAdjacentTiles(tile) {
    let tileID = parseInt(tile.id);
    const adjacentTiles = [
        document.getElementById(`${tileID + 1}`), // Right
        document.getElementById(`${tileID - 1}`), // Left
        document.getElementById(`${tileID - 5}`), // Top
        document.getElementById(`${tileID + 5}`)  // Bottom
    ];

    adjacentTiles.forEach(adjTile => {
        if (adjTile) {
            adjTile.classList.toggle("on");
        }
    });
}

// GAME WINNING
function checkWin() {
    const lightsOn = Array.from(allTiles).some(tile => tile.classList.contains("on"));
    if (!lightsOn) {
        winMessage.style.display = "flex";
        alert("You win!");
        game.style.display = "none";
    }
}
