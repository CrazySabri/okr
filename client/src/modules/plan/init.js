import Vue from 'vue'
import Store from './store'
import Routes from './routes'

export default {
    routes: Routes,
    stores: {
        plan: Store
    }
}