import { ParseError } from '@@/src/app/shared/error/ParseError'
import { Result } from 'neverthrow'
import { ITask, ITaskData } from '../domain'

export type HttpTask = {
  title: string
  description: string | null
  state: string
  schedule: string | null
  due: string | null
}

export type ITaskResponse = {
  total: number
  page: number
  hasNext: boolean
  hasPrev: boolean
  items: HttpTask[]
}

export interface ITaskParser {
  toDomain(data: HttpTask): Result<ITask, ParseError>
  fromDomain(data: ITaskData): Result<HttpTask, ParseError>
}
