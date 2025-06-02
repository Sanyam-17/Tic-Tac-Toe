const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector(".reset");
const msgContainer = document.querySelector(".msg-container");
const newGameBtn = document.querySelector(".new-game");
const msg = document.querySelector(".msg");

let turn = true; // true = O, false = X
let moveCount = 0;

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Reset the game state
const resetGame = () => {
  turn = true;
  moveCount = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

// Enable all boxes and clear them
const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  });
};

// Disable all boxes
const disableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = true;
  });
};

// Show winner message
const showWinner = (winner) => {
  msg.innerText = `🎉 Congratulations, Player ${winner} Won!`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

// Show tie message
const showTie = () => {
  msg.innerText = `😐 It's a Tie! Try again.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

// Check for a win or tie
const checkGameResult = () => {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    const val1 = boxes[a].innerText;
    const val2 = boxes[b].innerText;
    const val3 = boxes[c].innerText;

    if (val1 && val1 === val2 && val2 === val3) {
      showWinner(val1);
      return;
    }
  }

  // If all moves played and no winner
  if (moveCount === 9) {
    showTie();
  }
};

// Handle box click
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turn) {
      box.innerText = "O";
    } else {
      box.innerText = "X";
    }
    box.disabled = true;
    turn = !turn;
    moveCount++;
    checkGameResult();
  });
});

// Event listeners for reset and new game
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
