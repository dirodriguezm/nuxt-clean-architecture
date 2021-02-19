import { Result, combine } from 'neverthrow'
import { ITaskData, ITaskRepository } from '../domain/Task.types'
import { TaskParser } from './TaskParser'
import { ITaskParser, ITaskResponse } from './TaskService.types'
import { inject } from 'inversify-props'
import { HttpError, IHttpService } from '@@/src/app/shared/http'
import { ParseError } from '@@/src/app/shared/error/ParseError'

export class TaskService implements ITaskRepository {
  private parser: ITaskParser
  private httpService: IHttpService

  constructor(@inject() httpService: IHttpService) {
    this.parser = new TaskParser()
    this.httpService = httpService
    this.httpService.initService('https://my-url')
  }
  create(): Promise<Result<ITaskData, ParseError | HttpError>> {
    throw new Error('Method not implemented.')
  }
  remove(): Promise<Result<ITaskData, ParseError | HttpError>> {
    throw new Error('Method not implemented.')
  }
  edit(): Promise<Result<ITaskData, ParseError | HttpError>> {
    throw new Error('Method not implemented.')
  }
  getOne(): Promise<Result<ITaskData, ParseError | HttpError>> {
    throw new Error('Method not implemented.')
  }

  async getMany(): Promise<Result<ITaskData[], ParseError | HttpError>> {
    const parseTo = (taskResponse: ITaskResponse) => {
      const tasks = taskResponse.items.map(this.parser.toDomain)
      return combine(tasks)
    }
    return await this.httpService.get<ITaskResponse, ITaskData[]>(
      { url: '/tasks' },
      { parseTo }
    )
  }
}
