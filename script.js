const gameState = {
  guessWord: "kai",
  guess: "",
  active: true,
  fails: 0,
  buttons: [],
};

const alphabet = "abcdefghijklmnopqrstuvwxyz";

const keyboard = document.querySelector("#keyboard");
const wordDisplay = document.querySelector("#word-display");

function resetGame() {
  gameState.active = true;
  gameState.fails = 0;
  gameState.guess = "";
  gameState.buttons = [];
  for (let i = 0; i < alphabet.length; i++) {
    gameState.buttons.push({ character: alphabet[i], checked: false });
  }
}

function checkForSuccess() {
  if (gameState.guessWord === gameState.guess) {
    gameState.active = false;
    console.log("success");
    return true;
  }
  return false;
}

console.log(gameState);
//this is gonna render the game State
function renderGameState() {
  wordDisplay.innerHTML = "";
  keyboard.innerHTML = "";

  if (gameState.active && gameState.fails < 10) {
    gameState.guess = ""; //resets the guess every render
    // this renders the guessword display
    for (let i = 0; i < gameState.guessWord.length; i++) {
      let character = "_";
      gameState.buttons.forEach((element) => {
        if (
          gameState.guessWord[i] === element.character &&
          element.checked === true
        ) {
          character = element.character;
          gameState.guess += element.character; //updates the guess
        }
      });
      const newDiv = document.createElement("div");
      const newChar = document.createTextNode(character.toUpperCase());
      newDiv.append(newChar);
      wordDisplay.append(newDiv);
    }
    // this renders the fails counter
    document.querySelector("#fails-div").innerHTML = "";
    const failDiv = document.createElement("div");
    failDiv.id = "fails";
    failDiv.append("Fails:" + gameState.fails);
    document.querySelector("#fails-div").append(failDiv);

    // this renders the keyboard buttons
    gameState.buttons.forEach((element) => {
      const button = document.createElement("button");
      const text = document.createTextNode(element.character.toUpperCase());
      button.append(text);
      keyboard.append(button);
      button.id = element.character;
      if (element.checked === true) {
        button.setAttribute("disabled", true);
      }
    });

    checkForSuccess();
  } else {
    // this renders the keyboard buttons
    gameState.buttons.forEach((element) => {
      const button = document.createElement("button");
      const text = document.createTextNode(element.character.toUpperCase());
      button.append(text);
      keyboard.append(button);
      button.id = element.character;
      button.setAttribute("disabled", true);
    });
  }

  if (checkForSuccess() === true) {
    wordDisplay.innerHTML = "";
    keyboard.innerHTML = "";
    // this renders the word display
    for (let i = 0; i < gameState.guessWord.length; i++) {
      let character = "_";
      gameState.buttons.forEach((element) => {
        if (
          gameState.guessWord[i] === element.character &&
          element.checked === true
        ) {
          character = element.character;
          gameState.guess += element.character; //updates the guess
        }
      });
      const newDiv = document.createElement("div");
      const newChar = document.createTextNode(character.toUpperCase());
      newDiv.append(newChar);
      wordDisplay.append(newDiv);
    }
    // this renders the keyboard buttons
    gameState.buttons.forEach((element) => {
      const button = document.createElement("button");
      const text = document.createTextNode(element.character.toUpperCase());
      button.append(text);
      keyboard.append(button);
      button.id = element.character;
      button.setAttribute("disabled", true);
    });
  }

  console.log(gameState);
}

// event listener for keyboard clicks
keyboard.addEventListener("click", (event) => {
  let counter = 0;
  gameState.buttons.forEach((element) => {
    if (element.character === event.target.id) {
      element.checked = true;
      if (gameState.guessWord.includes(element.character) === false) {
        counter = 1;
      }
    }
  });
  gameState.fails += counter;
  console.log(counter);

  renderGameState();
});

// event listener for new game button
document.querySelector("#new-game").addEventListener("click", (event) => {
  resetGame();
  renderGameState();
});

resetGame();
renderGameState();
