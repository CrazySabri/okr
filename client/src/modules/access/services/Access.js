import store from '@/store'
import Vue from 'vue';

export default function() {
    return {
        hasModuleAccess(key) {
            if(key in Vue.$module && Vue.$module[key] !== true) return false;

            let module = store.state.access.modules[key]
            if(module) {
                if(module === true) {
                    return true
                }
                if(module.access === true) {
                    return true
                }
            }
            return false
        }
    }
}