import { cid, container } from "inversify-props"
import Vuex, { Store } from 'vuex'
import Vue from 'vue'
import { StoreCreator } from "@@/src/app/shared/storage/Storage"

Vue.use(Vuex)
const storeCreator = container.get<StoreCreator>(cid.StoreCreator)

declare module 'vue/types/vue' {
    interface Vue {
        $store: Store<any>
    }
}

Vue.prototype.$store = storeCreator.makeStore()
