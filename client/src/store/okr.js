import Vue from 'vue';
import Vuex from 'vuex';
import cookies from '@/cookies'

Vue.use(Vuex);

const FETCH_OKR_OWNER_OF = 'FETCH_OKR_OWNER_OF'
const FETCH_ONE_OKR = 'FETCH_ONE_OKR'

const state = {
  okrOwnerOf: [],
  okrFetched: {},
  oneFetched: null
}
const getters = {
  getOneOkr: state => {
    return id => {
      if(id in state.okrFetched) {
        return state.okrFetched[id]
      }
      return null
    }
  }
}
const actions = {

  fetchOkrOwnerOf({ commit }, user_id) {
    return new Promise(resolve => {
      Vue.$api.get('/okr/list/ownerof/'+user_id)
      .then((response) => {
        commit(FETCH_OKR_OWNER_OF, response.data)
        resolve();
      });
    });
  },

  fetchOneOkr({ commit }, params) {
    let id = params.id
    let type = params.type

    return new Promise(resolve => {
      Vue.$api.get('/okr/get/'+type+'/'+id)
      .then((response) => {
        commit(FETCH_ONE_OKR, response.data)
        resolve();
      });
    });
  }
}
const mutations = {
  [FETCH_OKR_OWNER_OF] (state, data) {
    state.okrOwnerOf = data
  },
  [FETCH_ONE_OKR] (state, data) {
    state.oneFetched = data
    state.okrFetched[data._id] = data
  }
}

export default {
    state,
    getters,
    actions,
    mutations
}
