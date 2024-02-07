import { InitialDataInf } from '../types/list';

export const initialData: InitialDataInf = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Take Me the garbage' },
    'task-2': { id: 'task-2', content: 'Eat' },
    'task-3': { id: 'task-3', content: 'Slepp toginh' },
    'task-4': { id: 'task-4', content: 'Charge my phone' },
    'task-5': { id: 'task-5', content: 'Do homework' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'Todo',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4', 'task-5'],
    },
    'column-2': {
      id: 'column-2',
      title: 'On Progres',
      taskIds: [],
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: [],
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3'],
};
