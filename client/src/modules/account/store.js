import Vue from 'vue';
import Vuex from 'vuex';
import cookies from '@/cookies'

Vue.use(Vuex);

const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";
const LOGIN = "LOGIN";
const REFRESH_LOGIN = "REFRESH_LOGIN";
const FETCH_ACCOUNTS = "FETCH_ACCOUNTS";
const FETCH_ONE_ACCOUNT = "FETCH_ONE_ACCOUNT"

const state = {
  isLoggedIn: false,
  loggedInUser: false,
  list: [],
  entities: []
}

const getters = {
  getLoggedInAccountId: state => {
    if(state.loggedInUser) {
      return state.loggedInUser._id
    }
    return false
  },
  getLoggedInAccountRole: state => {
    if(state.loggedInUser.role) {
      return state.loggedInUser.role
    }
    else if(state.loggedInUser.company) {
      return state.loggedInUser.company.role
    }
    return null
  },
  loggedInUser: state => {
    return state.loggedInUser
  },
  getAccount: state => {
    return userId => {
      return state.entities.find((x) => {
        return x._id === userId
      })
    }
  }
}

const actions = {
  login({ commit }, account) {

    commit(LOGIN);
    commit(LOGIN_SUCCESS, account);
  },
  logout({ commit }) {
    commit(LOGOUT);
  },
  isLoggedIn({ commit }) {
    let committed = false;
    let check = sessionStorage.getItem('c_account_session')
    if(!check) {
      commit(LOGOUT);
      committed = true
    } else {

      let check2 = cookies.get('c_account')
      if(!check2) {
        commit(LOGOUT);
        committed = true
      }
    }

    if(!committed) {
      commit(LOGIN)
      commit(REFRESH_LOGIN, JSON.parse(check))
    }
  },
  fetchAccounts({commit}, data) {
    commit(FETCH_ACCOUNTS, data)
  },
  fetchOneAccount({commit}, data) {
    commit(FETCH_ONE_ACCOUNT, data)
  }
}

const mutations = {
  [LOGIN_SUCCESS] (state, account) {
    state.loggedInUser = account
  },
  [LOGIN] (state) {
    state.isLoggedIn = true;
  },
  [LOGOUT](state) {
    state.isLoggedIn = false;
    state.loggedInUser = false
  },
  [REFRESH_LOGIN](state, user) {
    state.loggedInUser = user
  },
  [FETCH_ACCOUNTS](state, list) {
    state.list = list
  },
  [FETCH_ONE_ACCOUNT](state, user) {
    if(user) {
      let i = state.entities.findIndex((x) => {
        return x._id === data._id
      })
      if(i >= 0) {
        state.entities.splice(i, 1)
      }
      state.entities.push(user)
    }
  }
}

export default {
    state,
    getters,
    actions,
    mutations
}
