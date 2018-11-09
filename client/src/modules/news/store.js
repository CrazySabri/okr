import Vue from 'vue'
import Vuex from 'vuex'
import cookies from '@/cookies'

Vue.use(Vuex)

const FETCH_NEWS = 'FETCH_COMPANY_NEWS'
const FETCH_ONE_NEW = 'FETCH_ONE_NEW'
const DELETE_NEW = 'DELETE_NEW'

const state = {
  list: [],
  entities: []
}

const getters = {
  getNew: (state) => {
    return newId => {
      if(state.entities) {
        return state.entities.find((x) => {
          return x._id === newId
        })
      }
    }
  }
}

const actions = {
  fetchNews({commit}, data) {
    commit(FETCH_NEWS, data)
  },
  deleteNews({commit}, news_id) {
    if(!news_id) return
    commit(DELETE_NEW, news_id)
  },
  fetchOneNew({commit}, data) {
    commit(FETCH_ONE_NEW, data)
  },
}

const mutations = {
  [FETCH_NEWS](state, payload) {
    state.list = payload
  },
  [FETCH_ONE_NEW](state, payload) {
    if(payload) {
      let i = state.entities.findIndex((x) => {
        return x._id === data._id
      })
      if(i >= 0) {
        state.entities.splice(i, 1)
      }
      state.entities.push(payload)
    }
  },
  [DELETE_NEW](state, payload) {
    let index = state.list.findIndex((x) => {
      return x.id == payload
    })
    state.list.splice(index, 1)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
