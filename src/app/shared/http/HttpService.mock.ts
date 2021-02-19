import axios, { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { inject } from 'inversify-props';
import { IAxiosCreator } from '.';
import { HttpTask, ITaskResponse } from '../../modules/task/infrastructure';

const nextYear = new Date().setFullYear(new Date().getFullYear() + 1)
export const mockApiTask: HttpTask[] = [
    {
        title: 'Create Nuxt App',
        description: 'I have to make a nuxt sample app',
        state: 'DOING',
        schedule: null,
        due: null,
    },
    {
        title: 'Drink water',
        description: 'Always drink water',
        state: 'TODO',
        schedule: null,
        due: nextYear.toLocaleString(),
    },
]


export type TestActions = 'ok' | 'error' | 'timeout' | 'parseError' | 'clientError' | 'serverError'

export class MockAxiosCreator implements IAxiosCreator {
    mock!: MockAdapter
    actionType: TestActions
    constructor(@inject('ActionType') actionType: TestActions) {
        this.actionType = actionType
    }


    createAxiosInstance(_baseUrl: string): AxiosInstance {
        const instance = axios.create({ baseURL: _baseUrl });
        this.mock = new MockAdapter(instance);
        if (this.actionType === 'ok')
            this.setMockActions()
        if (this.actionType === 'error')
            this.setErrorActions()
        if (this.actionType === 'timeout')
            this.setTimeoutActions()
        return instance
    }

    setMockActions() {
        this.mock.onGet('/tasks').reply((_config: any) => {
            const response: ITaskResponse = {
                total: 2,
                page: 1,
                hasNext: false,
                hasPrev: false,
                items: mockApiTask
            }
            return [200, JSON.stringify(response)]
        })
    }

    setErrorActions() {
        this.mock.onGet('/tasks').networkError()
    }
    setTimeoutActions() {
        this.mock.onGet('/tasks').timeout()
    }

}
