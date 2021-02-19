import { inject } from 'inversify-props'
import { Module, VuexModule, VuexMutation, VuexAction } from 'nuxt-property-decorator'
import { ITaskData } from '../domain'
import { GetMany } from '../usecase/GetMany'

export interface ITaskState {
    taskList: ITaskData[]
    error: Error | null
    loading: boolean
}

@Module({ namespaced: true, name: 'tasks', stateFactory: true })
export class TaskStore extends VuexModule implements ITaskState {
    @inject() getMany!: GetMany
    taskList: ITaskData[] = []
    error: Error | null = null
    loading: boolean = false

    @VuexMutation
    setTaskList(tList: ITaskData[]) {
        this.taskList = tList
    }

    @VuexMutation
    setError(error: Error | null) {
        this.error = error
    }

    @VuexMutation
    setLoading(loading: boolean) {
        this.loading = loading
    }

    @VuexAction({ rawError: true })
    async fetchTasks() {
        this.setLoading(true)
        this.getMany.execute(null, {
            respondWithSuccess: (data: ITaskData[]) => {
                this.setTaskList(data)
                this.setError(null)
                this.setLoading(false)
            },
            respondWithClientError: (error: Error) => {
                this.setError(error)
                this.setTaskList([])
                this.setLoading(false)
            },
            respondWithServerError: (error: Error) => {
                this.setError(error)
                this.setTaskList([])
                this.setLoading(false)
            },
            respondWithParseError: (error: Error) => {
                this.setError(error)
                this.setTaskList([])
                this.setLoading(false)
            }
        })
    }
}
