<template lang="pug">
#app
  #nav
    router-link(to="/workers", v-if="isLoggedIn") Сотрудники
    router-link(to="/profile", v-if="isLoggedIn") Профиль
    //- router-link( :to="{path: 'login', params: {onLogin: isLoggedIn}}" )
    router-link(:to="{ path: 'login' }")
  router-view(:service="service", :isLoggedIn="isLoggedIn", :onLogin="onLogin")
  pre {{ isLoggedIn }}
</template>

<script>
import atwintaService from "../src/service/atwintaService";
import Authorization from "./views/Authorization";

export default {
  data() {
    return {
      service: new atwintaService(),
      isLoggedIn: false,
    };
  },
  components: {
    Authorization
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
    onLogin() {
      this.isLoggedIn = true;
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

#nav {
  display: grid;
  grid-template-columns: auto auto;
  justify-content: center;
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
