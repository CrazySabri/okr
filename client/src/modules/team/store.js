import Vue from 'vue';
import Vuex from 'vuex';
import cookies from '@/cookies'
import store from '@/store';

Vue.use(Vuex);

const FETCH_TEAMS = 'FETCH_COMPANY_TEAMS'
const FETCH_ONE_TEAM = 'FETCH_ONE_TEAM'
const RESET_ONE_TEAM = 'RESET_ONE_TEAM'
const FETCH_TEAMS_MANAGER_OF = 'FETCH_TEAMS_MANAGER_OF'

const state = {
  list: [],
  listManagerOf: [],
  entities: []
}
const getters = {
  getTeam: (state) => {
    return teamId => {
      if(state.entities) {
        return state.entities.find((x) => {
          return x._id === teamId
        })
      }
    }
  }
}
const actions = {
  fetchTeams({ commit}, data) {
    commit(FETCH_TEAMS, data)
  },
  fetchTeamsManagerOf({ commit }, data) {
    commit(FETCH_TEAMS_MANAGER_OF, data)
  },
  fetchOneTeam({ commit }, data) {
    commit(FETCH_ONE_TEAM, data)
  },
  resetOneTeam({ commit }) {
    commit(RESET_ONE_TEAM)
  }
}
const mutations = {
  [FETCH_TEAMS] (state, data) {
    state.list = data
  },
  [FETCH_ONE_TEAM] (state, data) {
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
  [FETCH_TEAMS_MANAGER_OF] (state, data) {
    state.listManagerOf = data
  },
  [RESET_ONE_TEAM] (state, data) {
    state.entities = []
  }
}

export default {
    state,
    getters,
    actions,
    mutations
}
