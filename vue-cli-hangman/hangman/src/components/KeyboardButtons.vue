<template>
  <footer
    @click="
      buttonClick($event);
      checkForWinOrFail();
    "
  >
    <template v-for="char in alphabet">
      <button
        v-if="goodChars.includes(char)"
        disabled
        class="button-keyboard"
        :key="char"
      >
        {{ char }}
      </button>
      <button
        v-else-if="badChars.includes(char)"
        disabled
        class="button-keyboard"
        :key="char"
      >
        {{ char }}
      </button>
      <button
        v-else-if="gameState === 'fail'"
        disabled
        class="button-keyboard"
        :key="char"
      >
        {{ char }}
      </button>
      <button
        v-else-if="gameState === 'success'"
        disabled
        class="button-keyboard"
        :key="char"
      >
        {{ char }}
      </button>
      <button v-else class="button-keyboard" :key="char">{{ char }}</button>
    </template>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    };
  },
};
</script>
