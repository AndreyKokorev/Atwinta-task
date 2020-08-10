import axios from 'axios'

export default {
  state: {
    workersData: [],
    pageInfo: {
      totalPages: null,
      nextPage: null,
      prevPage: null,
      current_page: null,
    },
    isLoading: true
  },
  mutations: {
    SET_WORKERS_DATA_TO_STATE: (state, workers) => {
      state.workers = workers;
    },
    SET_LOADING_INDICATOR: (state, indicator) => {
      state.isLoading = indicator;
    }
  },
  actions: {
    GET_WORKERS_DATA_FROM_API({commit}) {
      getResource('/workers')
      .then((workers)=> {
        commit('SET_WORKERS_DATA_TO_STATE', workers.data);
      })
    },
    SWITCH_LOADING_INDICATOR({commit}, indicator) {
      commit('SET_LOADING_INDICATOR', indicator)
    },

  },
  getters: {
    WORKERS_DATA(state) {
      return state.workersData
    },
    LOADING_INDICATOR(state) {
      return state.isLoading
    }
  }
}

const getResource = async (action) => {
  const access_token = localStorage.getItem('accessToken');
  const base_url = 'http://test.atwinta.ru/api/v1';
  const request_par = {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + access_token,
      'Content-Type': 'application/json'
    }
  };

  return await axios(`${base_url}${action}`, request_par)
}