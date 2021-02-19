import Vuex, { Store } from 'vuex'
import { inject } from 'inversify-props'
import { getModule } from 'nuxt-property-decorator'
import { ITaskState, TaskStore } from '../../modules/task/storage'
export interface IRootState {
    tasks: ITaskState
}

export interface IStoreCreator {
    makeStore(): Store<IRootState>
}

export class StoreCreator implements IStoreCreator {
    private store: Store<IRootState> | null = null
    makeStore(): Store<IRootState> {
        if (!this.store) {
            this.store = new Vuex.Store<IRootState>({
                modules: {
                    tasks: TaskStore,
                },
            })
        }
        return this.store
    }
}


export interface IStorage {
    getStores(): { taskStore: TaskStore }
}

export class Storage implements IStorage {
    private taskStore: TaskStore
    constructor(@inject() storeCreator: IStoreCreator) {
        const store = storeCreator.makeStore()
        this.taskStore = getModule(TaskStore, store)
    }
    getStores() {
        return { taskStore: this.taskStore }
    }
}
