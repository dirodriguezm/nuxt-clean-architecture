import { ParseError } from '@@/src/app/shared/error/ParseError'
import { HttpError, isHttpError } from '@@/src/app/shared/http'
import { inject } from 'inversify-props'
import { ITaskData, ITaskRepository } from '../domain'

export type Callbacks = {
  respondWithSuccess(data: ITaskData[]): void
  respondWithClientError(error: HttpError): void
  respondWithServerError(error: HttpError): void
  respondWithParseError(error: ParseError): void
}
export interface IUseCase {
  execute(params: any, callbacks: Callbacks): void
}
export class GetMany implements IUseCase {
  @inject() taskService!: ITaskRepository
  async execute(
    _params: any,
    {
      respondWithSuccess,
      respondWithClientError,
      respondWithServerError,
      respondWithParseError,
    }: Callbacks
  ): Promise<void> {
    const result = await this.taskService.getMany()
    result.map((tasks) => {
      respondWithSuccess(tasks)
    }).mapErr((error) => {
      if (isHttpError(error)) {
        if (error.isClientError()) {
          respondWithClientError(error)
          return
        }
        respondWithServerError(error)
      }
      respondWithParseError(error)
    })
  }
}
