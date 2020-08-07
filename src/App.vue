<template lang="pug">
#app
  .nav
    .nav__item-wrapper(v-if="isLoggedIn")
      router-link.nav__item(to="/workers") Сотрудники
    .nav__item-wrapper(v-if="isLoggedIn")
      router-link.nav__item(to="/profile" ) {{ profileName}}
    .nav__item-wrapper(v-if="!isLoggedIn")
      router-link.nav__item(to="/login") {{ "Войти" }}
  router-view(
    :service="service",
    :isLoggedIn="isLoggedIn",
    :onLogin="onLogin",
    :displayPopup="displayPopup",
    :logOff="logOff"
  )
  <Popup :message="message" :isVisible="isVisible"/>
</template>

<script>
import atwintaService from "../src/service/atwintaService";
import Authorization from "./views/Authorization";
import Popup from "./components/Popup";
//ToDo
//isLoggedIn function передать в компонент логина
//Popup при сохранении профиля
export default {
  data() {
    return {
      service: new atwintaService(),
      isLoggedIn: false,
      message: "",
      isVisible: false,
      profileName: "",
    };
  },
  components: {
    Authorization,
    Popup,
  },
  created: async function () {
    //localStorage.removeItem('accessToken')
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const data = await this.service.autoAuthorization();
      this.onLogin(data.name);
      //this.$router.push('workers');
      this.displayPopup("Вы авторизированы");
    } else {
      console.log("login");
      this.$router.push("login");
    }
  },
  methods: {
    onLogin(name) {
      this.isLoggedIn = true;
      this.profileName = name;
    },
    logOff() {
      localStorage.removeItem('accessToken');
      this.isLoggedIn = false;
      this.profileName = '';
      this.$router.push('login');
    },
    displayPopup(message) {
      this.message = message;
      this.isVisible = true;

      setTimeout(() => {
        this.isVisible = false;
      }, 2000);
    },
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
  margin-bottom: 28px;

  &__label {
    width: 100%;
    font-size: 14px;
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
</style>
