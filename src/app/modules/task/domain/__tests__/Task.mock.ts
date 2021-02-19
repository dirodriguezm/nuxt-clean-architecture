import { ITaskData } from '../Task.types'
export const mockTaskData = (): ITaskData[] => [
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
        due: null,
    },
]
