const gameState = {
  guessWord: "javascript",
  guess: "",
  active: true,
  fails: 0,
  buttons: [],
};

const alphabet = "abcdefghijklmnopqrstuvwxyz";
const wordList = [
  "api",
  "element",
  "dom",
  "selector",
  "object",
  "array",
  "flexbox",
  "gradient",
  "grid",
  "padding",
  "margin",
  "github",
  "loop",
  "margin",
  "callback",
  "boolean",
  "string",
  "state",
  "rendering",
  "mkdir",
  "isogramm",
];

const keyboard = document.querySelector("#keyboard");
const wordDisplay = document.querySelector("#word-display");

function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function resetGame() {
  gameState.guessWord = wordList[randomInt(0, wordList.length - 1)];
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
      const newDiv = document.createElement("div");
      gameState.buttons.forEach((element) => {
        if (
          gameState.guessWord[i] === element.character &&
          element.checked === true
        ) {
          character = element.character;
          gameState.guess += element.character; //updates the guess
        }
      });

      newDiv.classList.add("character");
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
    //this renders the succes button
    const newFailButton = document.createElement("button");
    newFailButton.id = "active";
    newFailButton.append("Active");
    document.querySelector("#active-div").innerHTML = "";
    document.querySelector("#active-div").append(newFailButton);

    checkForSuccess();
  } else {
    // this renders the guessword display
    for (let i = 0; i < gameState.guessWord.length; i++) {
      const newDiv = document.createElement("div");
      let character = "_";
      gameState.buttons.forEach((element) => {
        if (
          gameState.guessWord[i] === element.character &&
          element.checked === true
        ) {
          character = element.character;
        } else if (
          gameState.guessWord[i] === element.character &&
          element.checked === false
        ) {
          character = element.character;
          newDiv.classList.add("failed-char");
          newDiv.classList.add("fade-in");
        }
      });
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
      button.setAttribute("disabled", true);
    });

    //this renders the succes button
    const newFailButton = document.createElement("button");
    newFailButton.id = "active";
    newFailButton.style.color = "red";
    newFailButton.style.borderColor = "red";
    newFailButton.append("Failed");
    document.querySelector("#active-div").innerHTML = "";
    document.querySelector("#active-div").append(newFailButton);
  }

  if (checkForSuccess() === true) {
    wordDisplay.innerHTML = "";
    keyboard.innerHTML = "";
    // this renders the word display

    for (let i = 0; i < gameState.guessWord.length; i++) {
      let character = "_";
      const newDiv = document.createElement("div");
      gameState.buttons.forEach((element) => {
        if (
          gameState.guessWord[i] === element.character &&
          element.checked === true
        ) {
          character = element.character;
          newDiv.classList.add("fade-in");
        }
      });
      newDiv.style.color = "gold";
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

    // this renders the success button
    const newFailButton = document.createElement("button");
    newFailButton.id = "active";
    newFailButton.style.color = "gold";
    newFailButton.style.borderColor = "gold";
    newFailButton.append("Success");
    document.querySelector("#active-div").innerHTML = "";
    document.querySelector("#active-div").append(newFailButton);
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
document.querySelector("#new-game").addEventListener("click", () => {
  resetGame();
  renderGameState();
});

resetGame();
renderGameState();
