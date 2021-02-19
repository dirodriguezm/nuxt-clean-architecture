import { cid, container, mockTransient, resetContainer } from "inversify-props"
import { ITaskRepository } from "../../domain"
import { mockTaskData } from '../../domain/__tests__/Task.mock'
import { MockTaskService } from "../../infrastructure/__tests__/TaskService.mock"

import Vuex from 'vuex'
import { createLocalVue } from '@vue/test-utils'
import { containerBuilder } from "@@/src/ui/plugins/inversify"
import { TestActions } from "@@/src/app/shared/http/HttpService.mock"
import { IStorage } from "@@/src/app/shared/storage/Storage"
import { HttpError } from "@@/src/app/shared/http"
import { ParseError } from "@@/src/app/shared/error/ParseError"
const Vue = createLocalVue()
Vue.use(Vuex)

beforeEach(() => {
    resetContainer()
    containerBuilder()
    mockTransient<ITaskRepository>(cid.TaskService, MockTaskService)
})

describe('TaskStore', () => {
    describe('Actions', () => {
        describe('fetchTasks', () => {
            it('should respond with success', async () => {
                container.bind<TestActions>('ActionType').toConstantValue('ok')
                const storage = container.get<IStorage>(cid.Storage)
                const store = storage.getStores().taskStore
                await store.fetchTasks()
                expect(store.taskList).toStrictEqual(mockTaskData())
                expect(store.error).toBeNull()
                expect(store.loading).toBeFalsy()
            })
            it('should respond with client error', async () => {
                container.bind<TestActions>('ActionType').toConstantValue('clientError')
                const storage = container.get<IStorage>(cid.Storage)
                const store = storage.getStores().taskStore
                await store.fetchTasks()
                expect(store.taskList).toStrictEqual([])
                expect(store.error).toBeInstanceOf(HttpError)
                expect(store.loading).toBeFalsy()
            })
            it('should respond with server error', async () => {
                container.bind<TestActions>('ActionType').toConstantValue('serverError')
                const storage = container.get<IStorage>(cid.Storage)
                const store = storage.getStores().taskStore
                await store.fetchTasks()
                expect(store.taskList).toStrictEqual([])
                expect(store.error).toBeInstanceOf(HttpError)
                expect(store.loading).toBeFalsy()
            })
            it('should respond with parse error', async () => {
                container.bind<TestActions>('ActionType').toConstantValue('parseError')
                const storage = container.get<IStorage>(cid.Storage)
                const store = storage.getStores().taskStore
                await store.fetchTasks()
                expect(store.taskList).toStrictEqual([])
                expect(store.error).toBeInstanceOf(ParseError)
                expect(store.loading).toBeFalsy()
            })
        })
    })
})
