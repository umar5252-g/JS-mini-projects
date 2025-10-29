let boxes = document.querySelectorAll("#box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];
const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
};
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    checkwin();
  });
});
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};
const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};
const showWinner = (winner) => {
  msg.innerText = `Congratulation, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};
const checkwin = () => {
  for (patterns of winPatterns) {
    let pos1value = boxes[patterns[0]].innerText;
    let pos2value = boxes[patterns[1]].innerText;
    let pos3value = boxes[patterns[2]].innerText;
    if (pos1value !== "" && pos2value !== "" && pos3value !== "") {
      if (pos1value === pos2value && pos2value === pos3value) {
        showWinner(pos1value);
      } else {
      }
    }
  }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
