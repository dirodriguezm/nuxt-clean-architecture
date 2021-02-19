import { ITask, TaskState, ITaskData } from './Task.types'
export class Task implements ITask {
  title: string
  description: string | null
  state: TaskState
  schedule: Date | null
  due: Date | null

  constructor(data: ITaskData) {
    this.validate(data)
    this.title = data.title
    this.description = data.description
    this.state = data.state
    this.schedule = data.schedule
    this.due = data.due
  }

  validate(data: ITaskData): void {
    if (data.schedule && data.schedule < new Date()) {
      throw new Error('Invalid schedule date')
    }
    if (data.due && data.due < new Date()) {
      throw new Error('Invalid due date')
    }
  }

  changeState(state: TaskState) {
    this.state = state
  }

  serialize(): ITaskData {
    return { ...this }
  }
}
