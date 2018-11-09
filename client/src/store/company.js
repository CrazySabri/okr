import Vue from 'vue';
import Vuex from 'vuex';
import cookies from '@/cookies'
import store from '@/store';

Vue.use(Vuex);

const FETCH_COMPANY_OWNER_OF = 'FETCH_COMPANY_OWNER_OF'
const FETCH_ONE_COMPANY = 'FETCH_ONE_COMPANY'
const FETCH_COMPANY_MEMBER_OF = 'FETCH_COMPANY_MEMBER_OF'
const FETCH_CURRENT_COMPANY = 'FETCH_CURRENT_COMPANY'
const FETCH_COMPANY_MEMBERS = 'FETCH_COMPANY_MEMBERS'
const FETCH_COMPANY_TEAMS = 'FETCH_COMPANY_TEAMS'
const FETCH_COMPANY_ONE_TEAM = 'FETCH_COMPANY_ONE_TEAM'

const state = {
  companyOwnerOf: [],
  companyMemberOf: [],
  companyFetched: {},
  oneFetched: null,
  currentCompany: null,
  companyMembers: [],
  companyTeams: [],
  companyFetchOneTeam: null
}
const getters = {
  getOneCompany: state => {
    return id => {
      if(id in state.companyFetched) {
        return state.companyFetched[id]
      }
      return null
    }
  },
  currentCompany: state => {
    if(state.currentCompany) {
      return state.currentCompany
    }
    return null
  },
  currentCompanyName: state => {
    if(state.currentCompany) {
      return state.currentCompany.name
    }
    return null
  },
  currentCompanyId: state => {
    if(state.currentCompany) {
      return state.currentCompany._id
    }
    return null
  },
  companyMembers: (state, getters) => {
    return currentCompanyId => {
      return state.companyMembers[currentCompanyId]
    }
  }
}
const actions = {
  fetchCurrentCompany({ commit }) {
    Vue.$service.company.fetchCurrentCompany()
  },
  setCurrentCompany({ commit }, company) {
    commit(FETCH_CURRENT_COMPANY, company)
  },
  fetchCompanyMembers({ commit }, company_id) {
    if(!company_id) return;
    Vue.$api.get('/company/members/'+company_id)
    .then((response) => {
      if(!response.data.err) {
        commit(FETCH_COMPANY_MEMBERS, response.data)
      }
    });
  },
  fetchCompanyTeams({ commit}, company_id) {
    if(!company_id) return;
    Vue.$api.get('/company/teams/'+company_id)
    .then((response) => {
      if(!response.data.err) {
        commit(FETCH_COMPANY_TEAMS, response.data)
      }
    });
  },
  fetchCompanyTeam({ commit}, params) {
    let user_id = params.user_id
    let team_id = params.team_id

    if(!user_id || !team_id) return;

    Vue.$api.get('/team/get/'+user_id+'/'+team_id)
    .then((response) => {
      if(!response.data.err) {
        commit(FETCH_COMPANY_ONE_TEAM, response.data)
      }
    });
  },
  fetchCompanyOwnerOf({ commit }, user_id) {
    if(!user_id) return;

    Vue.$api.get('/company/list/owner_of/'+user_id)
    .then((response) => {
      if(!response.data.err) {
        commit(FETCH_COMPANY_OWNER_OF, response.data)
      }
    });
  },
  fetchCompanyMemberOf({ commit }, user_id) {
    Vue.$api.get('/company/list/member_of/'+user_id)
    .then((response) => {
      if(!response.data.err) {
        commit(FETCH_COMPANY_MEMBER_OF, response.data)
      }
    });
  },

  fetchOneCompany({ commit }, params) {
    let id = params.id
    let type = params.type

    Vue.$api.get('/company/get/'+type+'/'+id)
    .then((response) => {
      commit(FETCH_ONE_COMPANY, response.data)
    });
  }
}
const mutations = {
  [FETCH_COMPANY_OWNER_OF] (state, data) {
    state.companyOwnerOf = data
  },
  [FETCH_COMPANY_MEMBER_OF] (state, data) {
    state.companyMemberOf = data
  },
  [FETCH_ONE_COMPANY] (state, data) {
    state.oneFetched = data
    state.companyFetched[data._id] = data
  },
  [FETCH_CURRENT_COMPANY] (state, data) {
    state.currentCompany = data
  },
  [FETCH_COMPANY_MEMBERS] (state, data) {
    state.companyMembers = data
  },
  [FETCH_COMPANY_TEAMS] (state, data) {
    state.companyTeams = data
  },
  [FETCH_COMPANY_ONE_TEAM] (state, data) {
    state.companyFetchOneTeam = data
  }
}

export default {
    state,
    getters,
    actions,
    mutations
}
