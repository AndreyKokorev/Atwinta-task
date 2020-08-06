<template lang="pug">
  transition(name="popup")
    .container(v-if="isVisible")
      .text {{ message }}
</template>

<script scope>
export default {
  props: {
    message: String,
    isVisible: Boolean,
  }
};
</script>


<style scoped>

.container {
  position: absolute;
  right: 40px;
  top: 40px;
  width: auto;
  display: grid;
  grid-template-columns: minmax(auto, 200px);
  grid-template-rows: min-content;
  justify-items: center;
  align-items: center;
  padding: 15px;
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
