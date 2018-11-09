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

const state = {
  companyOwnerOf: [],
  companyMemberOf: [],
  companyFetched: {},
  entities: {},
  currentCompany: null,
  companyMembers: []
}
const getters = {
  getCompany: state => {
    return companyId => {
      return state.entities.find((x) => {
        return x._id === companyId
      })
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
  currentCompanyCode: state => {
    if(state.currentCompany) {
      return state.currentCompany.code
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

  setCurrentCompany({ commit }, company) {
    commit(FETCH_CURRENT_COMPANY, company)
  },
  fetchCompanyMembers({ commit }, members) {
    commit(FETCH_COMPANY_MEMBERS, members)
  },
  fetchCompanyOwnerOf({ commit }, data) {
    commit(FETCH_COMPANY_OWNER_OF, data)
  },
  fetchCompanyMemberOf({ commit }, data) {
    commit(FETCH_COMPANY_MEMBER_OF, data)
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
  [FETCH_CURRENT_COMPANY] (state, data) {
    state.currentCompany = data
  },
  [FETCH_COMPANY_MEMBERS] (state, data) {
    state.companyMembers = data
  },
}

export default {
    state,
    getters,
    actions,
    mutations
}
