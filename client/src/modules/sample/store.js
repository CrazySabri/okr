import Vue from 'vue';
import Vuex from 'vuex';
import cookies from '@/cookies'

Vue.use(Vuex);

const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";
const LOGIN = "LOGIN";
const REFRESH_LOGIN = "REFRESH_LOGIN";
const FETCH_ACCOUNTS = "FETCH_ACCOUNTS";

const state = {
  isLoggedIn: false,
  loggedInUser: false,
  list: []
}

const getters = {
  getLoggedInAccountId: state => {
    if(state.loggedInUser) {
      return state.loggedInUser._id
    }
    return false
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
  fetchAccounts({commit}, list) {
    commit(FETCH_ACCOUNTS, list)
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
  }
}

export default {
    state,
    getters,
    actions,
    mutations
}
