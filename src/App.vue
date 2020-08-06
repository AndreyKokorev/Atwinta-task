<template lang="pug">
#app
  .nav
    .nav__item-wrapper
      router-link.nav__item(to="/workers", v-if="isLoggedIn") Сотрудники
    .nav__item-wrapper
      router-link.nav__item(to="/profile", v-if="isLoggedIn") Профиль
  router-view(
    :service="service",
    :isLoggedIn="isLoggedIn",
    :onLogin="onLogin",
    :displayPopup="displayPopup"
  )
  <Popup :message="message" :isVisible="isVisible"/>
</template>

<script>
import atwintaService from "../src/service/atwintaService";
import Authorization from "./views/Authorization";
import Popup from "./components/Popup";

export default {
  data() {
    return {
      service: new atwintaService(),
      isLoggedIn: false,
      message: '',
			isVisible: false,
			profileName: ''
    };
  },
  components: {
    Authorization,
    Popup,
  },
  created() {
    localStorage.removeItem('accessToken')
    if (this.service.accessToken) {
      //const res = this.service.autoAuthorization();
      this.onLogin();
      //console.log(res)
    } else {
      this.$router.push("login");
    }
  },
  methods: {
    onLogin(name) {
			this.isLoggedIn = true;
			this.profileName = name;
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
    padding: 0px  15px 0 15px;

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

</style>
