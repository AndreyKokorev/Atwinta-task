import getResource from './workers_api';

export default {
  state: {
    workersData: [],
    pageData: {},
    workerProfile: {},

  },
  
  mutations: {
    SET_WORKERS_DATA_TO_STATE: (state, workers) => {
      state.workersData = workers;
    },
    SET_PAGE_DATA_TO_STATE: (state, workersPage) => {
      state.pageData.totalPages = workersPage.last_page;
      state.pageData.currentPage = workersPage.current_page;

      if (workersPage.next_page_url) {
        state.pageData.nextPage = workersPage.next_page_url.slice(-1);
      } else {
        state.pageData.nextPage = false;
      }

      if (workersPage.prev_page_url) {
        state.pageData.prevPage = workersPage.prev_page_url.slice(-1);
      } else {
        state.pageData.prevPage = false;
      }
    },

    SET_WORKER_PROFILE_DATA_TO_STATE: (state, data) => {
      state.workerProfile = {
        ...data
      };
    }
  },

  actions: {
    async GET_WORKERS_PAGE_DATA_FROM_API({ commit }, page = 1) {
      await getResource(`/workers?page=${page}`)
        .then((response) => {
          commit('SET_WORKERS_DATA_TO_STATE', response.data.data);
          commit('SET_PAGE_DATA_TO_STATE', response.data);
        })
    },

    async GET_WORKER_PROFILE_DATA_FROM_API({ commit }, id) {
      await getResource(`/workers/${id}`)
        .then((response) => {
          commit('SET_WORKER_PROFILE_DATA_TO_STATE', response.data);
        })
    },
  },

  getters: {
    WORKERS_DATA: state => state.workersData,
    PAGE_DATA: state => state.pageData,
    WORKER_PROFILE_DATA: state => state.workerProfile
  }
}