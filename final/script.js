/* ---------- START GAME ---------- */

const startBtn = document.querySelector("#start");
const start = document.querySelector("#play");
const game = document.querySelector("#tiles");
 
startBtn.addEventListener("click", startGame);

function startGame() {
    start.style.display = "none";
    game.style.display = "flex";
    generatePattern();
}

var x = document.lastModified;
        document.getElementById('lastModified').textContent = x;

        document.getElementById('helpBtn').addEventListener('click', function() {
            document.getElementById('helpDialog').showModal();
        });

        document.getElementById('closeBtn').addEventListener('click', function() {
            document.getElementById('helpDialog').close();
        });

/* ---------- GENERATING PATTERN ---------- */


function generatePattern() {
    let randomPattern = Math.floor(Math.random() * 5);
    if (randomPattern === 0) {
        patternOne();
    } else if (randomPattern === 1) {
        patternTwo();
    } else if (randomPattern === 2) {
        patternThree();
    } else if (randomPattern === 3) {
        patternFour();
    } else if (randomPattern === 4) {
        patternFive();
    }
};


function patternOne() {
    for(const tile of allTiles) {
        if(tile.id ==="6" || tile.id === "8" || tile.id === "15" || tile.id === "18" || tile.id === "25") {
            tile.classList.add("on");
        }
    }
    // to solve: 1, 17, 25, 19, 8, 2, 14, 17
};

function patternTwo() {
    for(const tile of allTiles) {
        if(tile.id ==="5" || tile.id === "11" || tile.id === "18" || tile.id === "20" || tile.id === "22" || tile.id === "23" || tile.id === "24") {
            tile.classList.add("on");
        }
    }
    // to solve: 18, 1, 9, 8, 2, 17, 19, 5, 11
};

function patternThree() {
    for(const tile of allTiles) { 
        if(tile.id ==="1" || tile.id === "4" || tile.id === "11" || tile.id === "12" || tile.id === "16" || tile.id === "22" || tile.id === "24") {
            tile.classList.add("on");
        }
    }
    // to solve: 12, 14, 17, 19, 15, 9, 7, 1
};

function patternFour() {
    for(const tile of allTiles) {                                               
        if(tile.id ==="5" || tile.id === "7" || tile.id === "8" || tile.id === "9" || tile.id === "11" || tile.id === "13" || tile.id === "19" || tile.id === "20" || tile.id === "21" || tile.id === "24") {
            tile.classList.add("on");
        }
    }
    // to solve: 19, 17, 7, 9, 21, 5, 12, 7
};

function patternFive() {
    for(const tile of allTiles) {                                     
        if(tile.id ==="3" || tile.id === "6" || tile.id === "9" || tile.id === "10" || tile.id === "12" || tile.id === "16" || tile.id === "18" || tile.id === "21") {
            tile.classList.add("on");
        }
    }
    // to solve: 16, 12, 3, 9, 13, 7
};



/* ---------- GAME PLAY ---------- */


const allTiles = document.querySelectorAll(".tile");
const middleTiles = document.querySelectorAll("middle");
const tEdgeTiles = document.querySelectorAll(".edgeT");
const bEdgeTiles = document.querySelectorAll(".edgeB");
const lEdgeTiles = document.querySelectorAll(".edgeL");
const rEdgeTiles = document.querySelectorAll(".edgeR");


// INCREASE MOVE COUNT
const moveCounter = document.querySelector("#count");
let moveCount = 0;

function increaseCounter() {
    moveCount++;
    moveCounter.innerText = moveCount;
}


// TOGGLE LIGHTS "on" when clicked
for (const tile of allTiles) {
    tile.addEventListener("click", () => {
        increaseCounter();
        tile.classList.toggle("on");
        let tileID = parseInt(tile.id);

        //get surrounding tiles
        const RTile = document.getElementById(`${tileID+1}`);
        const LTile = document.getElementById(`${tileID-1}`);
        const TTile = document.getElementById(`${tileID-5}`);
        const BTile = document.getElementById(`${tileID+5}`);

        if(tile.classList.contains("middle")){
            RTile.classList.toggle("on");
            LTile.classList.toggle("on");
            TTile.classList.toggle("on");
            BTile.classList.toggle("on");
        } else if(tile.classList.contains("edgeT")){
            RTile.classList.toggle("on");
            LTile.classList.toggle("on");
            BTile.classList.toggle("on");
        } else if(tile.classList.contains("edgeB")){
            RTile.classList.toggle("on");
            LTile.classList.toggle("on");
            TTile.classList.toggle("on");
        } else if(tile.classList.contains("edgeL")){
            RTile.classList.toggle("on");
            TTile.classList.toggle("on");
            BTile.classList.toggle("on");
        } else if(tile.classList.contains("edgeR")){
            LTile.classList.toggle("on");
            TTile.classList.toggle("on");
            BTile.classList.toggle("on");
        } else if(tile.classList.contains("cornerTL")){
            RTile.classList.toggle("on");
            BTile.classList.toggle("on");
        } else if(tile.classList.contains("cornerTR")){
            LTile.classList.toggle("on");
            BTile.classList.toggle("on");
        } else if(tile.classList.contains("cornerBL")){
            TTile.classList.toggle("on");
            RTile.classList.toggle("on");
        } else if(tile.classList.contains("cornerBR")){
            TTile.classList.toggle("on");
            LTile.classList.toggle("on");
        }

        checkWin()
    })
    
}

// GAME WINNING
const win = document.getElementById("win");

function checkWin() {
    let lightsOn = 0;
    for (const tile of allTiles) {
        if (tile.classList.contains("on")) {
            lightsOn++;
        }
    }
    if (lightsOn === 0) {
        setTimeout(() => {
            window.alert("You win!");
            win.style.display = "flex";
            game.style.display = "none";
        }, 150); // Adjust the delay as needed
    }
}

