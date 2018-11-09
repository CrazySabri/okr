import Vue from 'vue'
import Vuex from 'vuex'
import cookies from '@/cookies'

Vue.use(Vuex)

const state = {
    modules: {
        access: true,
        comment: true,
        account: true,
        admin: true,
        manager: true,
        team: true,
        okr: true,
        news: true,
        notification: true,
        timeline: true
    }
}

const getters = {}
const actions = {}
const mutations = {}

export default {
    state,
    getters,
    actions,
    mutations
}

