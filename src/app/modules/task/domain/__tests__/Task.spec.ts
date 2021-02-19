import { Task } from '../Task'
import { mockTaskData } from './Task.mock'

describe('Task', () => {
  describe('constructor', () => {
    it('should create instance with valid data', () => {
      const task = new Task(mockTaskData()[0])
      expect(task).toBeInstanceOf(Task)
    })
    it('should throw error with invalid date', () => {
      const data = mockTaskData()[0]
      const today = new Date()
      today.setFullYear(today.getFullYear() - 1)
      data.schedule = today
      expect(() => new Task(data)).toThrow()
    })
  })

  describe('changeState', () => {
    it('should set a new state', () => {
      const task = new Task(mockTaskData()[0])
      task.changeState('DONE')
      expect(task.state).toBe('DONE')
    })
  })

  describe('serialize', () => {
    it('should return object with correct data', () => {
      const task = new Task(mockTaskData()[0])
      expect(task.serialize()).toStrictEqual(mockTaskData()[0])
    })
  })
})
