import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const ADD_COMMENT = 'ADD_COMMENT'
const DELETE_COMMENT = 'DELETE_COMMENT'

const state = {
    comments: [
        {
            id:1 ,
            date: 1528475635,
            comment: 'This is a sample comment !',
            commentCount: 4,
            likeCount: 3,
            user: {
            firstname: 'Firstname',
            lastname: 'Lastname',
            id: 1
            },
            okr: {
            id: 1,
            name: 'Okr name'
            }
        },
        {
            id:2 ,
            date: 1528475635,
            comment: 'This is a sample comment !',
            commentCount: 4,
            likeCount: 3,
            user: {
            firstname: 'Firstname',
            lastname: 'Lastname',
            id: 1
            },
            okr: {
            id: 1,
            name: 'Okr name'
            }
        },
        {
            id:3 ,
            date: 1528475635,
            comment: 'This is a sample comment !',
            commentCount: 4,
            likeCount: 3,
            user: {
            firstname: 'Firstname',
            lastname: 'Lastname',
            id: 1
            },
            okr: {
            id: 1,
            name: 'Okr name'
            }
        },
    ]
}

const getters = {
    getComments: state => {
        return state.comments
    }
}

const actions = {
    addComment({commit}, comment) {
        commit(ADD_COMMEN, comment)
    },
    deleteComment({commit}, index) {
        commit(DELETE_COMMENT, index)
    }
}

const mutations = {
    [ADD_COMMENT](state, payload) {
        // 本当はここでapiを叩く
        payload = {
            id: 99 ,
            date: 1528475635,
            comment: 'This is a sample comment !',
            commentCount: 4,
            likeCount: 3,
            user: {
            firstname: 'Firstname',
            lastname: 'Lastname',
            id: 1
            },
            okr: {
            id: 1,
            name: 'Okr name'
            }
        }
        state.comments = {
            payload,
            ...state.comments
        }
    },
    [DELETE_COMMENT](state, payload) {
        state.comments.splice(payload, 1)
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
