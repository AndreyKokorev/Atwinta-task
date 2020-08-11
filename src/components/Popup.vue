<template lang="pug">
  transition(name="popup")
    .container(v-if="POPUP_VISIBILITY_INDICATOR")
      .text {{ POPUP_MESSAGE }}
</template>

<script scope>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters([    
      'POPUP_VISIBILITY_INDICATOR',
      'POPUP_MESSAGE'])
  }
};
</script>


<style scoped>
.container {
  position: fixed;
  right: 5px;
  top: 20px;
  width: auto;
  display: grid;
  grid-template-columns: minmax(auto, 200px);
  grid-template-rows: min-content;
  justify-items: center;
  align-items: center;
  padding: 12px;
  font-size: 15px;
  background: white;
  border: 2px solid rgb(167, 241, 137);
  border-radius: 0.5em;
}

.popup-enter-active {
  transition: opacity 1.5s;
}

.popup-leave-active {
  transition: opacity 1s;
}

.popup-enter, .popup-leave-to {
  opacity: 0;
}
</style>
