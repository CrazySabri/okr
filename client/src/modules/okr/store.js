import Vue from 'vue';
import Vuex from 'vuex';
import cookies from '@/cookies'

Vue.use(Vuex);

const FETCH_OKR_OWNER_OF = 'FETCH_OKR_OWNER_OF'
const FETCH_ONE_OKR = 'FETCH_ONE_OKR'
const FETCH_COMPANY_OKR = 'FETCH_COMPANY_OKR'
const FETCH_TEAM_OKR = 'FETCH_TEAM_OKR'
const FETCH_PERSONAL_OKR = 'FETCH_PERSONAL_OKR'
const FETCH_OKR_RAPPORT = 'FETCH_OKR_RAPPORT'

const state = {
  okrOwnerOf: [],
  list: [],
  companyList: [],
  personalList: [],
  teamList: [],
  entities: [],
  okrRapports: []
}
const getters = {
  getOneOkr: state => {
    return okr_id => {
      return state.entities.find((x) => {
        return x._id === okr_id
      })
    }
  }
}
const actions = {
  fetchCompanyOkr({ commit }, data) {
    commit(FETCH_COMPANY_OKR, data)
  },
  fetchPersonalOkr({ commit }, data) {
    commit(FETCH_PERSONAL_OKR, data)
  },
  fetchTeamOkr({ commit }, data) {
    commit(FETCH_TEAM_OKR, data)
  },
  fetchOkrOwnerOf({ commit }, data) {
    commit(FETCH_OKR_OWNER_OF, data)
  },
  fetchOneOkr({ commit }, data) {
    commit(FETCH_ONE_OKR, data)
  },
  fetchOkrRapports({ commit }, data) {
    commit(FETCH_OKR_RAPPORT, data)
  }
}
const mutations = {
  [FETCH_OKR_OWNER_OF] (state, data) {
    state.okrOwnerOf = data
  },
  [FETCH_ONE_OKR] (state, data) {
    if(data) {
      let i = state.entities.findIndex((x) => {
        return x._id === data._id
      })
      if(i >= 0) {
        state.entities.splice(i, 1)
      }
      state.entities.push(data)
    }
  },
  [FETCH_COMPANY_OKR] (state, data) {
    state.companyList = data
  },
  [FETCH_TEAM_OKR] (state, data) {
    state.teamList = data
  },
  [FETCH_PERSONAL_OKR] (state, data) {
    state.personalList = data
  },
  [FETCH_OKR_RAPPORT] (state, data) {
    state.okrRapports = data
  }
}

export default {
    state,
    getters,
    actions,
    mutations
}
