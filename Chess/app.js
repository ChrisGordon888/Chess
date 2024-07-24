// Select the gameboard and player display elements from the DOM
const gameBoard = document.querySelector("#gameboard");
const playerDisplay = document.querySelector("#player");
const infoDisplay = document.createElement("div");
document.body.append(infoDisplay);
const width = 8; // Define the width of the chessboard (8x8)

let playerGo = 'purple';
playerDisplay.textContent = 'purple';

// Define the starting positions of the pieces with proper classes for kings
const startPieces = [
    rook, knight, bishop, queen, king, bishop, knight, rook,
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    rook, knight, bishop, queen, king, bishop, knight, rook
];

// Function to create the chessboard
function createBoard() {
    gameBoard.innerHTML = ''; // Clear the game board
    startPieces.forEach((startPiece, index) => {
        const square = document.createElement('div'); // Create a new div for each square
        square.classList.add('square'); // Add the square class to each div

        square.setAttribute('square-id', index);

        const row = Math.floor(index / 8);
        const col = index % 8;

        // Alternate colors based on the row and column
        if ((row + col) % 2 === 0) {
            square.classList.add('black');
        } else {
            square.classList.add('silver');
        }

        // Add the piece to the square if it exists
        if (startPiece) {
            square.innerHTML = startPiece;
            // Make the piece draggable
            square.firstChild?.setAttribute('draggable', true);

            // Apply the correct class to the pieces based on their position
            if (index < 16) {
                square.firstChild?.classList.add('purple');
                if (index === 4) square.firstChild?.classList.add('king'); // Add 'king' class to the purple king
            } else if (index >= 48) {
                square.firstChild?.classList.add('white');
                if (index === 60) square.firstChild?.classList.add('king'); // Add 'king' class to the white king
            }
        }

        gameBoard.append(square); // Append the square to the game board
    });

    const allSquares = document.querySelectorAll(".square");
    allSquares.forEach(square => {
        square.addEventListener('dragstart', dragStart);
        square.addEventListener('dragover', dragOver);
        square.addEventListener('drop', dragDrop);
    });
    console.log("Board created with pieces");
}

createBoard(); // Call the function to create the board

let startPositionId;
let draggedElement;

function dragStart(e) {
    if (!e.target.classList.contains(playerGo)) {
        e.preventDefault();
        return;
    }
    startPositionId = e.target.parentNode.getAttribute('square-id');
    draggedElement = e.target;
    console.log('dragStart -> startPositionId:', startPositionId);
    console.log('dragStart -> draggedElement:', draggedElement);
    console.log('dragStart -> draggedElement classes:', draggedElement.classList);
}

function dragOver(e) {
    e.preventDefault();
}

function dragDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    let target = e.target;
    if (!target.classList.contains('square')) {
        target = target.closest('.square');
    }
    const targetId = target.getAttribute('square-id');
    console.log('dragDrop -> target:', target);
    console.log('dragDrop -> targetId:', targetId);

    if (!targetId) {
        infoDisplay.textContent = "Invalid move";
        setTimeout(() => infoDisplay.textContent = "", 2000);
        return;
    }

    const valid = checkIfValid(targetId);

    if (valid) {
        if (target.firstChild) {
            console.log('dragDrop -> Capturing piece:', target.firstChild);
            if (target.firstChild.classList.contains(playerGo === 'purple' ? 'white' : 'purple')) {
                target.removeChild(target.firstChild); // Capture the piece
            } else {
                infoDisplay.textContent = "Invalid capture";
                setTimeout(() => infoDisplay.textContent = "", 2000);
                return;
            }
        }
        target.appendChild(draggedElement);
        console.log('dragDrop -> Piece moved');
        changePlayer();
        checkForWin(); // Call checkForWin after the player changes
    } else {
        infoDisplay.textContent = "Invalid move";
        setTimeout(() => infoDisplay.textContent = "", 2000);
    }
}

function checkIfValid(targetId) {
    targetId = Number(targetId);
    const startId = Number(startPositionId);
    const piece = draggedElement.id;
    console.log('checkIfValid -> startId:', startId, 'targetId:', targetId, 'piece:', piece);

    const isPathClear = (increment) => {
        let position = startId + increment;
        while (position !== targetId) {
            const square = document.querySelector(`[square-id="${position}"]`);
            if (!square || square.firstChild) {
                return false;
            }
            position += increment;
        }
        return true;
    }

    switch (piece) {
        case 'pawn':
            const starterRow = playerGo === 'white' ? [48, 49, 50, 51, 52, 53, 54, 55] : [8, 9, 10, 11, 12, 13, 14, 15];
            const direction = playerGo === 'white' ? -1 : 1;
            if (
                (starterRow.includes(startId) && targetId === startId + direction * 2 * width && isPathClear(direction * width)) ||
                (targetId === startId + direction * width && !document.querySelector(`[square-id="${targetId}"]`).firstChild) ||
                (targetId === startId + direction * width - 1 && document.querySelector(`[square-id="${targetId}"]`).firstChild && document.querySelector(`[square-id="${targetId}"]`).firstChild.classList.contains(playerGo === 'purple' ? 'white' : 'purple')) ||
                (targetId === startId + direction * width + 1 && document.querySelector(`[square-id="${targetId}"]`).firstChild && document.querySelector(`[square-id="${targetId}"]`).firstChild.classList.contains(playerGo === 'purple' ? 'white' : 'purple'))
            ) {
                return true;
            }
            break;
        case 'knight':
            if (
                startId + width * 2 + 1 === targetId ||
                startId + width * 2 - 1 === targetId ||
                startId + width + 2 === targetId ||
                startId + width - 2 === targetId ||
                startId - width * 2 + 1 === targetId ||
                startId - width * 2 - 1 === targetId ||
                startId - width + 2 === targetId ||
                startId - width - 2 === targetId
            ) {
                return true;
            }
            break;
        case 'bishop':
            if (
                Math.abs(targetId - startId) % (width + 1) === 0 && isPathClear(targetId > startId ? width + 1 : -(width + 1)) ||
                Math.abs(targetId - startId) % (width - 1) === 0 && isPathClear(targetId > startId ? width - 1 : -(width - 1))
            ) {
                return true;
            }
            break;
        case 'rook':
            if (
                (Math.abs(startId - targetId) % width === 0 && isPathClear(startId > targetId ? -width : width)) ||
                (Math.floor(startId / width) === Math.floor(targetId / width) && isPathClear(startId > targetId ? -1 : 1))
            ) {
                return true;
            }
            break;
        case 'queen':
            if (
                (Math.abs(startId - targetId) % width === 0 && isPathClear(startId > targetId ? -width : width)) ||
                (Math.floor(startId / width) === Math.floor(targetId / width) && isPathClear(startId > targetId ? -1 : 1)) ||
                (Math.abs(targetId - startId) % (width + 1) === 0 && isPathClear(targetId > startId ? width + 1 : -(width + 1))) ||
                (Math.abs(targetId - startId) % (width - 1) === 0 && isPathClear(targetId > startId ? width - 1 : -(width - 1)))
            ) {
                return true;
            }
            break;
        case 'king':
            if (
                startId + 1 === targetId ||
                startId - 1 === targetId ||
                startId + width === targetId ||
                startId - width === targetId ||
                startId + width - 1 === targetId ||
                startId + width + 1 === targetId ||
                startId - width - 1 === targetId ||
                startId - width + 1 === targetId
            ) {
                return true;
            }
            break;
        default:
            console.log('Invalid move for piece:', piece);
            return false;
    }
    console.log('Invalid move for piece:', piece);
    return false;
}

function changePlayer() {
    playerGo = playerGo === "purple" ? "white" : "purple";
    playerDisplay.textContent = playerGo;
}

function checkForWin() {
    const whiteKing = document.querySelector('.white.king');
    const purpleKing = document.querySelector('.purple.king');
    console.log("Checking for win");
    console.log("White King:", whiteKing);
    console.log("Purple King:", purpleKing);

    if (!whiteKing) {
        infoDisplay.innerHTML = "Purple Player Wins!";
        console.log("Purple Player Wins!");
        const allSquares = document.querySelectorAll('.square');
        allSquares.forEach(square => square.firstChild?.setAttribute('draggable', false));
        setTimeout(resetGame, 3000); // Auto-reset after 3 seconds
    }
    if (!purpleKing) {
        infoDisplay.innerHTML = "White Player Wins!";
        console.log("White Player Wins!");
        const allSquares = document.querySelectorAll('.square');
        allSquares.forEach(square => square.firstChild?.setAttribute('draggable', false));
        setTimeout(resetGame, 3000); // Auto-reset after 3 seconds
    }
}

function resetGame() {
    console.log("Resetting game");
    gameBoard.innerHTML = ''; // Clear the game board
    createBoard(); // Recreate the board
    playerGo = 'purple'; // Reset the player turn
    playerDisplay.textContent = 'purple'; // Update the display
    console.log("Game reset completed");
}

console.log("Script loaded successfully");