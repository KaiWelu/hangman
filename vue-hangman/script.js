Vue.createApp({
  data() {
    return {
      gameState: "start",
      wordList: [
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
      ],
      isWordlistDisplayed: false,
      guessWord: "",
      goodChars: [],
      badChars: [],
      alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      ownWord: "",
    };
  },
  computed: {
    fails() {
      return this.badChars.length;
    },
    activeOrFail() {
      if (this.gameState === "success") {
        return "Success";
      } else if (this.gameState === "fail") {
        return "Fail";
      } else {
        return "Active";
      }
    },
  },
  methods: {
    buttonClick(event) {
      if (this.guessWord.includes(event.target.textContent) === true) {
        this.goodChars.push(event.target.textContent);
      } else {
        this.badChars.push(event.target.textContent);
      }
    },
    restart() {
      function randomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
      }

      if (this.ownWord.length === 0) {
        this.guessWord =
          this.wordList[randomInt(0, this.wordList.length - 1)].toUpperCase();
      } else {
        this.guessWord = this.ownWord.toUpperCase();
        this.ownWord = "";
      }

      this.gameState = "start";
      this.goodChars = [];
      this.badChars = [];
    },
    checkForWinOrFail() {
      const word = new Set();
      const guess = new Set();

      this.guessWord.split("").forEach((char) => {
        word.add(char);
      });
      this.goodChars.forEach((char) => {
        guess.add(char);
      });

      if (word.size === guess.size) {
        this.gameState = "success";
      } else if (this.badChars.length === 10) {
        this.gameState = "fail";
      }
    },
    toggleWords() {
      this.isWordlistDisplayed = !this.isWordlistDisplayed;
    },
  },
  async created() {
    this.restart();
  },
}).mount("#app");
