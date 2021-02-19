import { cid, container, mockTransient, resetContainer } from "inversify-props"
import { containerBuilder } from "@@/src/ui/plugins/inversify"
import { ParseError } from "@@/src/app/shared/error/ParseError"
import { HttpError } from "@@/src/app/shared/http"
import { TestActions } from "@@/src/app/shared/http/HttpService.mock"
import { ITaskRepository } from "../../domain"
import { mockTaskData } from "../../domain/__tests__/Task.mock"
import { MockTaskService } from "../../infrastructure/__tests__/TaskService.mock"
import { GetMany } from "../GetMany"

beforeEach(() => {
    resetContainer()
    containerBuilder()
    mockTransient<ITaskRepository>(cid.TaskService, MockTaskService)
})

describe('GetMany', () => {

    it('should call success callback', async () => {
        container.bind<TestActions>('ActionType').toConstantValue('ok')
        const getMany = new GetMany()
        const mockCallbacks = {
            respondWithSuccess: jest.fn(),
            respondWithClientError: jest.fn(),
            respondWithParseError: jest.fn(),
            respondWithServerError: jest.fn()
        }
        await getMany.execute(null, mockCallbacks)
        expect(mockCallbacks.respondWithSuccess).toHaveBeenCalledWith(mockTaskData())
    })
    it('should call client error callback', async () => {
        container.bind<TestActions>('ActionType').toConstantValue('clientError')
        const getMany = new GetMany()
        const mockCallbacks = {
            respondWithSuccess: jest.fn(),
            respondWithClientError: jest.fn(),
            respondWithParseError: jest.fn(),
            respondWithServerError: jest.fn()
        }
        await getMany.execute(null, mockCallbacks)
        expect(mockCallbacks.respondWithClientError.mock.calls[0][0]).toBeInstanceOf(HttpError)
    })
    it('should call server error callback', async () => {
        container.bind<TestActions>('ActionType').toConstantValue('serverError')
        const getMany = new GetMany()
        const mockCallbacks = {
            respondWithSuccess: jest.fn(),
            respondWithClientError: jest.fn(),
            respondWithParseError: jest.fn(),
            respondWithServerError: jest.fn()
        }
        await getMany.execute(null, mockCallbacks)
        expect(mockCallbacks.respondWithServerError.mock.calls[0][0]).toBeInstanceOf(HttpError)
    })
    it('should call parse error callback', async () => {
        container.bind<TestActions>('ActionType').toConstantValue('parseError')
        const getMany = new GetMany()
        const mockCallbacks = {
            respondWithSuccess: jest.fn(),
            respondWithClientError: jest.fn(),
            respondWithParseError: jest.fn(),
            respondWithServerError: jest.fn()
        }
        await getMany.execute(null, mockCallbacks)
        expect(mockCallbacks.respondWithParseError.mock.calls[0][0]).toBeInstanceOf(ParseError)
    })
})
