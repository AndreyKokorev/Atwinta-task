import Vue from 'vue'
import Vuex from 'vuex'
import workers from './modules/workers/workers'
import profile from './modules/profile/profile'
import auth from './modules/auth/auth'


Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    workers,
    profile,
    auth
  },
  state: {
    isLoading: true,    
    popupMessage: null,
    isVisible: false,
  },

  mutations: {
    SET_LOADING_INDICATOR: (state, indicator) => {
      state.isLoading = indicator;
    },
    SET_POPUP_VISIBILITY_INDICATOR: (state, indicator) => {
      state.isVisible = indicator;
    },
    SET_POPUP_MESSAGE: (state, message) => {
      state.popupMessage = message;
    }   
  },

  actions: {
    SWITCH_LOADING_INDICATOR({ commit }, indicator) {
      commit('SET_LOADING_INDICATOR', indicator)
    },
   
    DISPLAY_POPUP({ commit }, message) {         
      commit('SET_POPUP_VISIBILITY_INDICATOR', true);
      commit('SET_POPUP_MESSAGE', message);
      
      setTimeout(() => {
        commit('SET_POPUP_VISIBILITY_INDICATOR', false);
      }, 2000);
    }
  },

  getters: {
    LOADING_INDICATOR: state => state.isLoading,
    POPUP_VISIBILITY_INDICATOR: state => state.isVisible,
    POPUP_MESSAGE: state => state.popupMessage
  }
});