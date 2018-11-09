import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const ADD_PLAN = 'ADD_PLAN'

const state = {
  showingPlan: {}
}

const getters = {}

const actions = {
  addPlan({commit}, data) {
    commit(ADD_PLAN, data)      
  }
}

const mutations = {
  [ADD_PLAN](state, payload) {
    state.showingPlan = payload
  }
}

export default {
    state,
    getters,
    actions,
    mutations
}