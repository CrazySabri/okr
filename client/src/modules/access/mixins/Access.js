import Vue from 'vue'

export default {
    methods: {
        hasModuleAccess(key) {
            return Vue.$service.access.hasModuleAccess(key)
        }
    }
}