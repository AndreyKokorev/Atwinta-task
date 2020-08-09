<template lang="pug">
  .mk-spinner-wrap
    .mk-spinner-ring
</template>

<style scoped>

.mk-spinner-wrap {
  position: fixed;
  width: 64px;
  height: 64px;
  top: calc(50% - 32px);
  right: calc(50% - 32px);
}

@-webkit-keyframes a {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(1turn);
    transform: rotate(1turn);
  }
}
@keyframes a {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(1turn);
    transform: rotate(1turn);
  }
}
.mk-spinner-ring {
  content: "";
  display: inline-block;
  position: absolute;
  width: 50px;
  height: 50px;
  top: 50%;
  margin-top: -25px;
  left: 50%;
  margin-left: -25px;
  z-index: 1;
  border-radius: 50%;
  border: 3px solid #6d6d6b;
  border-left-color: transparent;
  background: transparent;
  -webkit-animation: a 1s infinite linear;
  animation: a 1s infinite linear;
}
</style>