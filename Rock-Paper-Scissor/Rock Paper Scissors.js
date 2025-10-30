let userScore = 0;
let comScore = 0;

let choices = document.querySelectorAll(".choice");
let msg = document.querySelector("#msg");
let userScorePara = document.querySelector("#user-score");
let comScorePara = document.querySelector("#com-score");

const drawMatch = () => {
  msg.innerText = `Match draw`;
  msg.style.backgroundColor = "#081b31";
};

const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    msg.innerText = `You won`;
    msg.style.backgroundColor = "green";
    userScorePara.innerText = userScore;
  } else {
    comScore++;
    msg.innerText = `You Lose`;
    msg.style.backgroundColor = "red";
    comScorePara.innerText = comScore;
  }
};

const playGame = (userChoice) => {
  const compChoice = genCompChoice();
  if (userChoice === compChoice) {
    drawMatch();
  } else {
    let userWin = true;
    if (userChoice === "Rock") {
      // scossors paper
      userWin = compChoice === "Paper" ? false : true;
    } else if (userChoice === "Paper") {
      userWin = compChoice === "Scissors" ? false : true;
    } else {
      userWin = compChoice === "Rock" ? false : true;
    }
    showWinner(userWin, userChoice, compChoice);
  }
};
const genCompChoice = () => {
  const option = ["Rock", "Paper", "Scissors"];
  let randomIdx = Math.floor(Math.random() * 3);
  return option[randomIdx];
};
choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});
