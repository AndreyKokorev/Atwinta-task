import getResource from './profile_api';
import router from '../../../router';

export default {
  state:{
    profileData: {}
  },

  mutations: {
    SET_PROFILE_DATA_TO_STATE: (state, data) => state.profileData = { ...data },
    SET_NAME_TO_STATE: (state, name) => state.profileData.name = name,
    SET_PHONE_TO_STATE: (state, phone) => state.profileData.phone = phone,
    SET_CITY_TO_STATE: (state, city) => state.profileData.city = city,
    SET_BIRTHDAY_TO_STATE: (state, birthday) => state.profileData.birthday = birthday,
    SET_GITHUB_TO_STATE: (state, github) => state.profileData.github = github,
    SET_TELEGRAM_TO_STATE: (state, telegram) => state.profileData.telegram = telegram,
    SET_ABOUT_TO_STATE: (state, about) => state.profileData.about = about
  },

  actions:{
    async GET_PROFILE_DATA_FROM_API({ commit }) {
      await getResource('GET', '/user')
            .then((response) => {
              commit('SET_PROFILE_DATA_TO_STATE', response.data);
      })
    },

    async SET_PROFILE_DATA_TO_API({ commit, state }) {
      const json = JSON.stringify(state.profileData);
      await getResource('POST', `/user`, json);
      commit('SET_PROFILE_NAME', state.profileData.name);
    },

    LOG_OUT({ commit }) {
      localStorage.removeItem('accessToken');
      commit('SET_PROFILE_NAME', '');
      commit('SET_LOGIN_INDICATOR', false);
      router.push('auth');
    }
  },

  getters: {
    PROFILE_DATA: state => state.profileData
  }
}