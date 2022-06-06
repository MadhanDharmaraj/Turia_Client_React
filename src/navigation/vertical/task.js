import { CheckSquare, Circle } from 'react-feather'

export default [
  {
    id: 'task',
    title: 'Task',
    icon: <CheckSquare />,
    children: [
      {
        id: 'regular-task',
        title: 'Regular Task',
        icon: <Circle />,
        navLink: '/task/list'
      },
      {
        id: 'recurring-task',
        title: 'Recurring Task',
        icon: <Circle />,
        navLink: '/recurring-task/list'
      }
    ]
  }
]