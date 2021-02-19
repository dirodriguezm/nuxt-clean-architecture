import { ParseError } from '@@/src/app/shared/error/ParseError'
import { Result, ok, err } from 'neverthrow'
import { ITask, ITaskData, Task, TaskState } from '../domain'
import { ITaskParser, HttpTask } from './TaskService.types'
export class TaskParser implements ITaskParser {
  toDomain(data: HttpTask): Result<ITask, ParseError> {
    try {
      const taskData: ITaskData = {
        title: data.title,
        description: data.description,
        state: data.state as TaskState,
        schedule: data.schedule ? new Date(data.schedule) : null,
        due: data.due ? new Date(data.due) : null,
      }
      const task = new Task(taskData)
      return ok(task)
    } catch (error) {
      return err(new ParseError(error.message))
    }
  }
  fromDomain(data: ITaskData): Result<HttpTask, ParseError> {
    try {
      const httpData = {
        title: data.title,
        description: data.description,
        state: data.state,
        schedule: data.schedule ? data.schedule.toDateString() : null,
        due: data.due ? data.due.toDateString() : null,
      }
      return ok(httpData)
    } catch (error) {
      return err(new ParseError(error.message))
    }
  }
}
