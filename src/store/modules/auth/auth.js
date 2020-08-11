import getResource from './auth_api';
import router from '../../../router';

export default {
  state:{
    formData: {
      email: '',
      password: '',
    },
    isLoggedIn: false,
    isLoading: true,
    profileName: ''
  },
  mutations: {
    SET_LOGIN_INDICATOR: (state, indicator) => {
      state.isLoggedIn = indicator;
    },
    SET_PROFILE_NAME:(state, name) => {
      state.profileName = name;
    },
  
  },
  actions:{
    SWITCH_LOGIN_INDICATOR({ commit }, indicator) {
      commit('SET_LOGIN_INDICATOR', indicator)
    },
    async AUTHORIZATION({ commit }, parameters) {
      const url = formParameters(parameters);
      const { token, user: { name } } = await getResource('POST', `/auth/login?${url}`);
      localStorage.setItem("accessToken", token);
      commit('SET_LOGIN_INDICATOR', true);
      commit('SET_PROFILE_NAME', name );
      router.push("workers");
    },
    async AUTO_AUTHORIZATION({ commit }) {
      await getResource('POST', '/user')
        .then((response) => {
          commit('SET_LOGIN_INDICATOR', true);
          commit('SET_PROFILE_NAME', response.name);
          
        })   
    },
   
   

  },
  getters: {
    LOGIN_INDICATOR: state => state.isLoggedIn,
    PROFILE_NAME: state => state.profileName,
    FORM_DATA: state => state.formData
  }
}


function formParameters(parameters) {
  return Object.keys(parameters)
    .map(item => `&${item}=${parameters[item]}`)
    .join('');
}