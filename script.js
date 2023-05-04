const gameState = {
  guessWord: "javascript",
  active: true,
  fails: 0,
  buttons: [],
};

const alphabet = "abcdefghijklmnopqrstuvwxyz";

for (let i = 0; i < alphabet.length; i++) {
  gameState.buttons.push({ character: alphabet[i], checked: false });
}

const keyboard = document.querySelector("#keyboard");
const wordDisplay = document.querySelector("#word-display");

console.log(gameState);
//this is gonna render the game State
function renderGameState() {
  // this renders the guessword display
  if (gameState.active) {
    console.log("active");
  }
  // this renders the keyboard buttons
  keyboard.innerHTML = "";
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
}

// event listener for keyboard clicks
keyboard.addEventListener("click", (event) => {
  gameState.buttons.forEach((element) => {
    if (element.character === event.target.id) {
      element.checked = true;
    }
  });
  renderGameState();
});

renderGameState();
