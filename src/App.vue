<template lang="pug">
#app
  .nav
    .nav__item-wrapper(v-if="!LOGIN_INDICATOR")
      router-link.nav__item(to="/auth", exact) {{ "Войти" }}
    .nav__item-wrapper(v-if="LOGIN_INDICATOR")
      router-link.nav__item(to="/workers") Сотрудники
    .nav__item-wrapper(v-if="LOGIN_INDICATOR")
      router-link.nav__item(to="/profile") {{ PROFILE_NAME }}
  router-view
  Popup
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Authorization from "./views/Authorization";
import Popup from "./components/Popup";

export default {
  components: {
    Authorization,
    Popup,
	},
	
  created: async function () {
    if (localStorage.getItem("accessToken")) {
      await this.AUTO_AUTHORIZATION();
      this.DISPLAY_POPUP('Вы авторизированы');
    }
  },

  computed: {
    ...mapGetters(["LOGIN_INDICATOR", "PROFILE_NAME"]),
  },
  methods: {
    ...mapActions(["AUTO_AUTHORIZATION", "DISPLAY_POPUP"]),
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.nav {
  position: relative;
  display: grid;
  grid-template-columns: auto auto;
  justify-content: center;
  height: 61px;
  background: #333333;
  box-shadow: 4px 0 5px 0 black;

  &__item-wrapper {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0px 15px 0 15px;

    &:hover {
      background: rgba(10, 10, 10, 0.466);
    }

    &:last-child {
      right: 0;
      position: absolute;
    }
  }

  &__item {
    line-height: 60px;
    font-weight: bold;
    color: white;
    text-decoration: none;
    transition: 300ms;
  }

  .router-link-active {
    color: rgb(245, 248, 62);
    text-decoration: none;
  }
}

.form-group {
  position: relative;
  margin-bottom: 25px;

  &__label {
    width: 100%;
    font-size: 13px;
    text-align: left;
  }

  &__label--required:before {
    content: "*";
    color: red;
    margin-right: 4px;
  }

  &__feedback {
    position: absolute;
    bottom: -18px;
    color: red;
    font-size: 12px;
  }
}
.input-group {
  &__prepend {
    border: 0px solid #ced4da;
    border-width: 1px 0 1px 1px;
    border-radius: 5px 0 0 5px;
    padding: 7px;
    background: #f5f7fa;
  }

  &__input {
    height: 41px;
    border: 1px solid #ced4da;
    border-radius: 0 5px 5px 0;
  }
}

.auth-enter-active {
  transition: opacity 1s;
}

.auth-enter {
  opacity: 0;
}

@media screen and (max-width: 1000px) {
  html {
    font-size: 15px;
  }
}

@media screen and (max-width: 600px) {
  html {
    font-size: 14px;
  }
}
</style>
