import Vue from 'vue'
import Vuex from 'vuex'
import workers from './modules/workers'
import profile from './modules/profile'
import auth from './modules/auth'


Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    workers,
    profile,
    auth
  },
  state: {
    isLoggedIn: false,
    message: '',
    isVisible: false,
    profileName: ''
  },
});