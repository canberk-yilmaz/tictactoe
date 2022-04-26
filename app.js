let playerOneTurn = true;
let playerOneWin = false;
let playerTwoWin = false;

let board = document.getElementById("board");
board.addEventListener("click", (event) => {
  if (
    !playerOneWin &&
    !playerTwoWin &&
    event.target.classList.contains("area") &&
    event.target.textContent === ""
  ) {
    console.log(event);
    if (playerOneTurn) {
      event.target.innerHTML = "X";
      playerOneTurn = false;
    } else {
      event.target.innerHTML = "O";
      playerOneTurn = true;
    }

    let boardState = [...document.querySelectorAll(".area")].map(
      (area) => area.textContent
    );

    if (
      boardState.filter(Boolean).length !== 9 &&
      !playerOneWin &&
      !playerTwoWin
    ) {
      document.getElementById("state").textContent = `Player ${
        playerOneTurn ? "X" : "O"
      } Turn`;
    } else {
      document.getElementById("state").textContent = "Game End";
      document.getElementById("winner").textContent = "It's a Draw!";
    }

    let winningIndexes = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    playerOneWin = winningIndexes.some((indexSet) => {
      return indexSet.every((index) => {
        return boardState[index] == "X";
      });
    });
    playerTwoWin = winningIndexes.some((indexSet) => {
      return indexSet.every((index) => {
        return boardState[index] == "O";
      });
    });
  }

  if (playerOneWin || playerTwoWin) {
    document.getElementById("state").textContent = "Game End";
    document.getElementById("winner").textContent = `Winner is Player ${
      playerOneWin ? 1 : 2
    }`;
  }
});

let reset = document.getElementById("reset-button");

reset.addEventListener("click", () => {
  document.querySelectorAll(".area").forEach((area) => (area.textContent = ""));
  playerOneWin = false;
  playerTwoWin = false;
  document.getElementById("winner").textContent = "";
  document.getElementById("state").textContent = "Player X Turn";
});
