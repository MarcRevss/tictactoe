//declaring variables
const vsCpuButton = document.getElementById("vs-cpu");
const vsPlayerButton = document.getElementById("vs-player");
const mainPages = document.getElementsByClassName("firstPage");
const xButton = document.getElementById("choose-x");
const yButton = document.getElementById("choose-y");
const buttons = document.getElementsByClassName("choose-button");
const gamePage = document.getElementsByClassName("gamePage");
const oTurn = document.getElementsByClassName("Oturn");
const xTurn = document.getElementsByClassName("Xturn");
const tableCells = document.querySelectorAll("th");
let activePlayer = "X";
let activeHover = "x";
let playerWins = document.getElementsByClassName("Player-winner");
let scoreO = document.getElementById("score-of-O");
let scoreX = document.getElementById("score-of-X");
let winnerPlayer = document.getElementsByClassName("winner");
let xisWinner = "x";
let oisWinner = "o";
let quitButton = document.getElementById("quit-button");
let nextRoundButton = document.getElementById("next-round-button");
let nextRoundButton2 = document.getElementById("nextRound");
let winnerimgX = document.getElementsByClassName("winner-logo-x");
let winnerimgO = document.getElementsByClassName("winner-logo-o");
let takesTheRoundColor = document.getElementsByClassName("takesTheRound");
let scoreboardX = document.getElementsByClassName("scorenumberX");
let scoreboardO = document.getElementsByClassName("scorenumberO");
let scoreboardtie = document.getElementsByClassName("scorenumbertie");
let isVsCPU = false;
let restartButton = document.getElementById("restartButton");
let restartpage = document.getElementsByClassName("restartbuttonaction");
let cancelButton = document.getElementsByClassName("cancel");
let yesrestartButton = document.getElementsByClassName("yesrestart");
let gamesection = document.getElementsByClassName("gameSection");
let cpuMoveMade = false;
let counterX = 0;
let counterO = 0;
let countertie = 0;
let counterCPU = 0;
let gameWon = false;
let youWin = false;
let restartbuttoncond = false;
let quit = false;

//choosing box- choose X or O and giving them hover and active status if chosen
function choosebox() {
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", (event) => {
      const button = event.currentTarget;

      for (let j = 0; j < buttons.length; j++) {
        buttons[j].setAttribute("state", "inactive");
        buttons[j].style.backgroundColor = "";
      }
      button.setAttribute("state", "active");
      button.style.backgroundColor = "rgb(168, 191, 201)";
    });
    if (yButton.getAttribute("state") === "active" && isVsCPU) {
      activePlayer = "O";
    }

    if (xButton.getAttribute("state") === "active" && isVsCPU) {
      activePlayer = "X";
    }
  }
}

choosebox();

//Game mode for playing against versus Player. Creating function and adding it on button click
vsPlayerButton.addEventListener("click", versusPlayer);
function versusPlayer() {
  if (quit) {
    quitGame();
  }
  isVsCPU = false;
  quit = false;
  if (!isVsCPU) {
    for (let i = 0; i < gamesection.length; i++) {
      gamesection[i].style.display = "block";
    }
    if (
      (xButton.getAttribute("state") === "active" &&
        yButton.getAttribute("state") !== "active") ||
      (xButton.getAttribute("state") !== "active" &&
        yButton.getAttribute("state") === "active")
    ) {
      for (let i = 0; i < mainPages.length; i++) {
        mainPages[i].style.display = "none";
        if (xButton.getAttribute("state") === "active") {
          scoreX.innerText = "X(P1)";
          scoreO.innerText = "O(P2)";
        } else if (yButton.getAttribute("state") === "active") {
          scoreO.innerText = "O(P1)";
          scoreX.innerText = "X(P2)";
        }
      }
      for (let j = 0; j < gamePage.length; j++) {
        gamePage[j].style.display = "block";
      }
    } else {
      alert("You must choose X or O");
    }
    if (
      (xButton.getAttribute("state") === "active" &&
        yButton.getAttribute("state") !== "active") ||
      (xButton.getAttribute("state") !== "active" &&
        yButton.getAttribute("state") === "active")
    ) {
      for (let i = 0; i < mainPages.length; i++) {
        mainPages[i].style.display = "none";
        if (xButton.getAttribute("state") === "active") {
          scoreX.innerText = "X(P1)";
          scoreO.innerText = "O(P2)";
        } else if (yButton.getAttribute("state") === "active") {
          scoreO.innerText = "O(P1)";
          scoreX.innerText = "X(P2)";
        }
      }
      for (let j = 0; j < gamePage.length; j++) {
        gamePage[j].style.display = "block";
      }
    } else {
      alert("You must choose X or O");
    }
    fillingCells();
    hoverOnCells();
    xStarts();
  }
}

//Game mode for playing against versus CPU. Creating function and adding it on button click

vsCpuButton.addEventListener("click", versusCPU);
function versusCPU() {
  if (quit) {
    quitGame();
  }
  quit = false;
  isVsCPU = true;
  if (isVsCPU) {
    for (let i = 0; i < gamesection.length; i++) {
      gamesection[i].style.display = "block";
    }

    if (isVsCPU) {
      if (
        (xButton.getAttribute("state") === "active" &&
          yButton.getAttribute("state") !== "active") ||
        (xButton.getAttribute("state") !== "active" &&
          yButton.getAttribute("state") === "active")
      ) {
        for (let i = 0; i < mainPages.length; i++) {
          mainPages[i].style.display = "none";

          if (xButton.getAttribute("state") === "active") {
            scoreX.innerText = "X(P1)";
            scoreO.innerText = "O(CPU)";
          } else if (yButton.getAttribute("state") === "active") {
            scoreO.innerText = "O(P1)";
            scoreX.innerText = "X(CPU)";
          }
        }
        for (let j = 0; j < gamePage.length; j++) {
          gamePage[j].style.display = "block";
        }
      } else {
        alert("You must choose X or O");
      }

      // Modify: Switch player and CPU symbols
      if (xButton.getAttribute("state") === "active") {
        playerSymbol = "X";
        cpuSymbol = "O";
      } else if (yButton.getAttribute("state") === "active") {
        playerSymbol = "O";
        cpuSymbol = "X";
      }

      // Reset activePlayer to playerSymbol
      activePlayer = playerSymbol;
      resultOfGame();
      if (!gameWon) {
        fillingCellsCPU();
      }
      hoverOnCells();
      xStarts();
    }
  }
}

//function is filling cells for vs player
function fillingCells() {
  if (!isVsCPU) {
    for (let i = 0; i < tableCells.length; i++) {
      let cell = tableCells[i];

      cell.addEventListener("click", (event) => {
        if (gameWon) {
          return;
        }
        let clickedCell = event.currentTarget;

        if (!clickedCell.getAttribute("marked")) {
          let image = document.createElement("img");

          if (activePlayer === "X") {
            image.src = "assets/icon-x.svg";
            image.style.width = "50%";
            image.style.height = "50%";
            event.currentTarget.setAttribute("marked", "X");

            resultOfGame();
          } else if (activePlayer === "O") {
            image.src = "assets/icon-o.svg";
            image.style.width = "50%";
            image.style.height = "50%";
            event.currentTarget.setAttribute("marked", "O");

            resultOfGame();
          }
          clickedCell.innerHTML = "";
          clickedCell.appendChild(image);

          if (activePlayer === "X") {
            activeHover = "o";
            activePlayer = "O";
          } else {
            activePlayer = "X";
            activeHover = "x";
          }
        }

        //winnercheck function goes here//

        xStarts();
      });
    }
    if (quit) {
      return;
    }
  }
}

//function for hovering
function hoverOnCells() {
  for (let i = 0; i < tableCells.length; i++) {
    let cell = tableCells[i];

    cell.addEventListener("mouseover", (event) => {
      if (!gameWon) {
        if (activePlayer === "X" && !cell.getAttribute("marked")) {
          cell.style.backgroundImage = 'url("assets/icon-x-outline.svg")';
          cell.style.backgroundRepeat = "no-repeat";
          cell.style.backgroundSize = "50% 50%";
          cell.style.backgroundPosition = "center";
        } else if (activePlayer === "O" && !cell.getAttribute("marked")) {
          cell.style.backgroundImage = 'url("assets/icon-o-outline.svg")';
          cell.style.backgroundRepeat = "no-repeat";
          cell.style.backgroundSize = "50% 50%";
          cell.style.backgroundPosition = "center";
        }
      }
    });

    cell.addEventListener("mouseout", () => {
      if (cell.style.backgroundImage) {
        cell.style.backgroundImage = "";
      }
    });
  }
}
//checking for winner function
function resultOfGame() {
  const winningCombinations = [
    ["cell1", "cell2", "cell3"],
    ["cell4", "cell5", "cell6"],
    ["cell7", "cell8", "cell9"],
    ["cell1", "cell5", "cell9"],
    ["cell3", "cell5", "cell7"],
    ["cell1", "cell4", "cell7"],
    ["cell2", "cell5", "cell8"],
    ["cell3", "cell6", "cell9"],
  ];

  let hasWinner = false;
  gameWon = false;

  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];

    const cellAElement = document.getElementById(a);
    const cellBElement = document.getElementById(b);
    const cellCElement = document.getElementById(c);

    const cellA = cellAElement.getAttribute("marked");
    const cellB = cellBElement.getAttribute("marked");
    const cellC = cellCElement.getAttribute("marked");

    if (cellA && cellA === cellB && cellA === cellC) {
      gameWon = true;
      hasWinner = true;
      xStarts();

      if (cellA === "X") {
        counterX++;
        scoreboardX[0].innerHTML = `${counterX}`;
        cellAElement.style.backgroundColor = "#7746db";
        cellBElement.style.backgroundColor = "#7746db";
        cellCElement.style.backgroundColor = "#7746db";
        for (j = 0; j < playerWins.length; j++) {
          playerWins[j].style.display = "block";
          winnerimgO[0].style.display = "none";
          winnerimgX[0].style.display = "block";

          if (scoreX.innerText == "X(P1)" && scoreO.innerText == "O(P2)") {
            winnerPlayer[0].innerText = "PLAYER 1 WINS";
            scoreboardX.innerHTML = `${counterX}`;
          } else if (
            scoreX.innerText == "X(P2)" &&
            scoreO.innerText == "O(P1)"
          ) {
            winnerPlayer[0].innerText = "PLAYER 2 WINS";
            scoreboardX.innerHTML = `${counterX}`;
          } else if (cellA === "X" && isVsCPU && cpuSymbol === "O") {
            winnerPlayer[0].innerText = "YOU WIN";
            scoreboardX.innerHTML = `${counterX}`;
          } else if (cellA === "X" && isVsCPU && cpuSymbol === "X") {
            winnerPlayer[0].innerText = "YOU LOST";
            scoreboardX.innerHTML = `${counterX}`;
          }

          takesTheRoundColor[0].style.color = "rgb(49, 195, 189)";
        }
      }

      if (cellA === "O") {
        counterO++;
        scoreboardO[0].innerHTML = `${counterO}`;

        cellAElement.style.backgroundColor = "yellow";
        cellBElement.style.backgroundColor = "yellow";
        cellCElement.style.backgroundColor = "yellow";
        for (j = 0; j < playerWins.length; j++) {
          playerWins[j].style.display = "block";
          winnerPlayer[0].innerText = "PLAYER 2 WINS";
          winnerimgX[0].style.display = "none";
          winnerimgO[0].style.display = "block";
          takesTheRoundColor[0].style.color = "orange";
          if (scoreO.innerText === "O(P1)" && scoreX.innerText === "X(P2)") {
            winnerPlayer[0].innerText = "PLAYER 1 WINS";
          } else if (cellA === "O" && isVsCPU && cpuSymbol === "O") {
            winnerPlayer[0].innerText = "YOU LOST";
            scoreboardX.innerHTML = `${counterX}`;
          } else if (cellA === "O" && isVsCPU && cpuSymbol === "X") {
            winnerPlayer[0].innerText = "YOU WIN";
            scoreboardX.innerHTML = `${counterX}`;
          }
        }
      }
    }
  }
  const allCellsMarked = Array.from(tableCells).every(
    (cell) => !!cell.getAttribute("marked"),
  );
  if (!hasWinner) {
    if (allCellsMarked) {
      xStarts();
      countertie++;
      scoreboardtie[0].innerHTML = `${countertie}`;
      for (j = 0; j < playerWins.length; j++) {
        playerWins[j].style.display = "block";
        winnerPlayer[0].innerText = "IT'S A TIE";
        winnerimgX[0].style.display = "none";
        winnerimgO[0].style.display = "none";
        takesTheRoundColor[0].style.color = "#A8BFC9";
        takesTheRoundColor[0].innerText = "ROUND TIED";
      }
    }
  }
}
//next round button giving it function
nextRoundButton.addEventListener("click", () => {
  xStarts();
  for (let j = 0; j < xTurn.length; j++) {
    oTurn[j].style.display = "none";
    xTurn[j].style.display = "flex";
  }
  gameWon = false;
  for (let i = 0; i < tableCells.length; i++) {
    let cell = tableCells[i];
    if (
      cell.hasAttribute("marked") ||
      cell.hasAttribute("X") ||
      cell.hasAttribute("O")
    ) {
      cell.innerHTML = "";
      cell.removeAttribute("marked");
      cell.style = "";
    }
  }

  // Reset other game-related elements
  for (let j = 0; j < playerWins.length; j++) {
    playerWins[j].style.display = "none";
  }

  // Reset tie-related elements
  takesTheRoundColor[0].style.color = ""; // Set color to default or any other color
  takesTheRoundColor[0].innerText = "TAKES THE ROUND";

  // Reset winner state
  if (activePlayer === "X") {
    activeHover = "x";
  } else {
    activeHover = "o";
  }

  // Reset cpuMoveMade flag for both X and O
  cpuMoveMade = false;

  if (!isVsCPU) {
    activePlayer = "X";
  }

  // If playing against the CPU and O starts, make the first move for the CPU
  if (isVsCPU && activePlayer === "O") {
    if (!gameWon) {
      firstCPUMoveX();
      for (let j = 0; j < xTurn.length; j++) {
        oTurn[j].style.display = "flex";
        xTurn[j].style.display = "none";
      }
    }
  }
});

function fillingCellsCPU() {
  if (isVsCPU) {
    xStarts();

    for (let i = 0; i < tableCells.length; i++) {
      let cell = tableCells[i];

      cell.addEventListener("click", (event) => {
        let clickedCell = event.currentTarget;

        if (!clickedCell.getAttribute("marked")) {
          let image = document.createElement("img");

          if (activePlayer == "X") {
            image.src = "assets/icon-x.svg";
            image.style.width = "50%";
            image.style.height = "50%";
            event.currentTarget.setAttribute("marked", "X");
            xStarts();

            if (!gameWon) {
              clickedCell.innerHTML = "";
              clickedCell.appendChild(image);
            }

            if (!gameWon) {
              resultOfGame();
              handleCPUMoveO();
            }
          }

          if (activePlayer === "X") {
            activeHover = "o";
            activePlayer = "O";
          } else {
            activePlayer = "X";
            activeHover = "x";
          }
        }
      });
      if (activePlayer == "O") {
        if (!gameWon) {
          firstCPUMoveX();
          resultOfGame();
        }

        cell.addEventListener("click", (event) => {
          let clickedCell = event.currentTarget;

          if (!clickedCell.getAttribute("marked")) {
            let image = document.createElement("img");

            if ((activePlayer = "O")) {
              image.src = "assets/icon-o.svg";
              image.style.width = "50%";
              image.style.height = "50%";
              event.currentTarget.setAttribute("marked", "O");
              xStarts();

              cpuMoveMade = false;

              if (!gameWon) {
                clickedCell.innerHTML = "";
                clickedCell.appendChild(image);
                resultOfGame();
              }

              if (!gameWon) {
                firstCPUMoveX();
              }
            }
          }
        });
      }
    }
    if (quit) {
      return;
    }
  }
}

function handleCPUMoveO() {
  if (!gameWon && isVsCPU) {
    // Find an unmarked cell
    let unmarkedCells = Array.from(tableCells).filter(
      (cell) => !cell.getAttribute("marked"),
    );
    let randomCell =
      unmarkedCells[Math.floor(Math.random() * unmarkedCells.length)];
    let image = document.createElement("img");

    // Simulate CPU move when active player is "O"
    if (unmarkedCells.length > 0) {
      image.src = "assets/icon-o.svg";
      image.style.width = "50%";
      image.style.height = "50%";
      randomCell.setAttribute("marked", "O");
      randomCell.innerHTML = "";
      randomCell.appendChild(image);
      activePlayer = "O";

      resultOfGame(); // Check for the result after each move
    }
  }
}

function firstCPUMoveX() {
  if (!gameWon && isVsCPU) {
    if (!cpuMoveMade) {
      // Find an unmarked cell
      let unmarkedCells = Array.from(tableCells).filter(
        (cell) => !cell.getAttribute("marked"),
      );

      if (unmarkedCells.length > 0) {
        // Select a random unmarked cell
        let randomIndex = Math.floor(Math.random() * unmarkedCells.length);
        let randomCell = unmarkedCells[randomIndex];

        let image = document.createElement("img");

        // Simulate CPU move when active player is "X"
        image.src = "assets/icon-x.svg";
        image.style.width = "50%";
        image.style.height = "50%";
        randomCell.setAttribute("marked", "X");
        randomCell.innerHTML = "";
        randomCell.appendChild(image);

        cpuMoveMade = true; // Set the flag to true to indicate that a move has been made
        resultOfGame();
      }
    }
  }
}

function handleCPUMoveX() {
  if (!gameWon && isVsCPU) {
    // Find an unmarked cell
    let unmarkedCells = Array.from(tableCells).filter(
      (cell) => !cell.getAttribute("marked"),
    );
    let randomCell =
      unmarkedCells[Math.floor(Math.random() * unmarkedCells.length)];
    let image = document.createElement("img");

    // Simulate CPU move when active player is "O"
    if (unmarkedCells.length > 0) {
      image.src = "assets/icon-x.svg";
      image.style.width = "50%";
      image.style.height = "50%";
      randomCell.setAttribute("marked", "X");
      randomCell.innerHTML = "";
      randomCell.appendChild(image);
    }
  }
}

function xStarts() {
  if (activePlayer === "X") {
    for (let j = 0; j < xTurn.length; j++) {
      oTurn[j].style.display = "none";
      xTurn[j].style.display = "flex";
    }
  } else if (activePlayer === "O") {
    for (let j = 0; j < xTurn.length; j++) {
      oTurn[j].style.display = "flex";
      xTurn[j].style.display = "none";
    }
  }

  if (yButton.getAttribute("state") === "active" && isVsCPU) {
    activePlayer = "O";
  }

  if (xButton.getAttribute("state") === "active" && isVsCPU) {
    activePlayer = "X";
  }
}

restartButton.addEventListener("click", () => {
  restartbuttoncond = true;

  for (let i = 0; i < restartpage.length; i++) {
    restartpage[i].style.display = "block";
  }

  // Now, add the event listener for the cancelButton
  cancelButton[0].addEventListener("click", () => {
    for (let i = 0; i < restartpage.length; i++) {
      restartpage[i].style.display = "none";
    }
  });

  yesrestartButton[0].addEventListener("click", () => {
    counterX = 0;
    counterO = 0;
    countertie = 0;
    scoreboardX[0].innerHTML = `${counterX}`;
    scoreboardO[0].innerHTML = `${counterO}`;
    scoreboardtie[0].innerHTML = `${countertie}`;

    for (let i = 0; i < restartpage.length; i++) {
      restartpage[i].style.display = "none";
      xStarts();
      for (let j = 0; j < xTurn.length; j++) {
        oTurn[j].style.display = "none";
        xTurn[j].style.display = "flex";
      }
      gameWon = false;
      for (let i = 0; i < tableCells.length; i++) {
        let cell = tableCells[i];
        if (
          cell.hasAttribute("marked") ||
          cell.hasAttribute("X") ||
          cell.hasAttribute("O")
        ) {
          cell.innerHTML = "";
          cell.removeAttribute("marked");
          cell.style = "";
        }
      }

      // Reset other game-related elements
      for (let j = 0; j < playerWins.length; j++) {
        playerWins[j].style.display = "none";
      }

      // Reset tie-related elements
      takesTheRoundColor[0].style.color = ""; // Set color to default or any other color
      takesTheRoundColor[0].innerText = "TAKES THE ROUND";

      // Reset winner state
      if (activePlayer === "X") {
        activeHover = "x";
      } else {
        activeHover = "o";
      }

      // Reset cpuMoveMade flag for both X and O
      cpuMoveMade = false;

      if (!isVsCPU) {
        activePlayer = "X";
      }

      // If playing against the CPU and O starts, make the first move for the CPU
      if (isVsCPU && activePlayer === "O") {
        if (!gameWon) {
          firstCPUMoveX();
          for (let j = 0; j < xTurn.length; j++) {
            oTurn[j].style.display = "flex";
            xTurn[j].style.display = "none";
          }
        }
      }
    }
  });
});

function quitGame() {
  location.reload();
}

quitButton.addEventListener("click", quitGame);