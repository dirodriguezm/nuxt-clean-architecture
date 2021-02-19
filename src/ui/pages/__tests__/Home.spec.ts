import { createLocalVue, mount } from "@vue/test-utils"
import { cid, container, mockTransient, resetContainer } from "inversify-props"
import Vuex from 'vuex'
import Vue from 'vue'
import Vuetify from 'vuetify'
import { containerBuilder } from "../../plugins/inversify"
//@ts-ignore
import HomePage from '@ui/pages/index.vue'
import { ITaskRepository } from "@@/src/app/modules/task/domain"
import { MockTaskService } from "@@/src/app/modules/task/infrastructure/__tests__/TaskService.mock"
import { TestActions } from "@@/src/app/shared/http/HttpService.mock"
import { IStorage } from "@@/src/app/shared/storage/Storage"
import { mockTaskData } from "@@/src/app/modules/task/domain/__tests__/Task.mock"
import flushPromises from 'flush-promises'
import { HttpError } from "@@/src/app/shared/http"
import { ParseError } from "@@/src/app/shared/error/ParseError"


describe('HomePage', () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    Vue.use(Vuetify)
    let vuetify: Vuetify

    beforeEach(() => {
        resetContainer()
        containerBuilder()
        mockTransient<ITaskRepository>(cid.TaskService, MockTaskService)
        vuetify = new Vuetify()
    })

    it('mounts and renders tasks', async () => {
        container.bind<TestActions>('ActionType').toConstantValue('ok')
        const wrapper = mount(HomePage, {
            localVue,
            vuetify,
        })
        await flushPromises()
        const titles = wrapper.findAll('.v-card__title')
        expect(titles.length).toBe(mockTaskData().length)
        const storage = container.get<IStorage>(cid.Storage)
        const store = storage.getStores().taskStore
        expect(store.taskList).toStrictEqual(mockTaskData())
    })

    it('mounts and renders server error', async () => {
        container.bind<TestActions>('ActionType').toConstantValue('serverError')
        const wrapper = mount(HomePage, {
            localVue,
            vuetify,
        })
        await flushPromises()
        expect(wrapper.find('.v-alert__content').text()).toContain('Server Error')
        const storage = container.get<IStorage>(cid.Storage)
        const store = storage.getStores().taskStore
        expect(store.taskList).toStrictEqual([])
        expect(store.error).toBeInstanceOf(HttpError)
    })
    it('mounts and renders client error', async () => {
        container.bind<TestActions>('ActionType').toConstantValue('clientError')
        const wrapper = mount(HomePage, {
            localVue,
            vuetify,
        })
        await flushPromises()
        expect(wrapper.find('.v-alert__content').text()).toContain('Client Error')
        const storage = container.get<IStorage>(cid.Storage)
        const store = storage.getStores().taskStore
        expect(store.taskList).toStrictEqual([])
        expect(store.error).toBeInstanceOf(HttpError)
    })
    it('mounts and renders parse error', async () => {
        container.bind<TestActions>('ActionType').toConstantValue('parseError')
        const wrapper = mount(HomePage, {
            localVue,
            vuetify,
        })
        await flushPromises()
        expect(wrapper.find('.v-alert__content').text()).toContain('Parse Error')
        const storage = container.get<IStorage>(cid.Storage)
        const store = storage.getStores().taskStore
        expect(store.taskList).toStrictEqual([])
        expect(store.error).toBeInstanceOf(ParseError)
    })
})
