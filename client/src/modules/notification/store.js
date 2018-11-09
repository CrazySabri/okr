import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const ADD_NOTIFICATION = 'ADD_NOTIFICATION'
const DELETE_NOTIFICATION = 'DELETE_NOTIFICATION'

const state = {
  notices: [
    {
      type: 'warning',
      text: 'this is a message'
    },
    {
      type: 'success',
      text: 'this is a message this is a message this is a message this is a message'
    },
    {
      type: 'error',
      text: 'this is a message'
    },
  ]
}

const getters = {
  getNotices: state => {
    return state.notices
  }
}

const actions = {
  addNotification({commit}, notification) {
    commit(ADD_NOTIFICATION, notification)
  },
  deleteNotification({commit}, index) {
    commit(DELETE_NOTIFICATION, index)
  }
}

const mutations = {
  [ADD_NOTIFICATION](state, payload) {
    if(typeof payload == 'string') {
      payload = {
        text: payload,
        type: 'default'
      }
    }
    state.notices = [
      payload,
      ...state.notices
    ]
  },
  [DELETE_NOTIFICATION](state, payload) {
    state.notices.splice(payload, 1)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
