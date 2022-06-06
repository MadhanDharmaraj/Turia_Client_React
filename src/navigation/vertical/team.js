import { CheckSquare, Circle, Users } from 'react-feather'

export default [
  {
    id: 'team',
    title: 'Team',
    icon: <Users />,
    children: [
      {
        id: 'team-members',
        title: 'Team Members',
        icon: <Circle />,
        navLink: '/charts/chartjs'
      },
      {
        id: 'leave',
        title: 'Leave',
        icon: <Circle />,
        navLink: '/charts/apex'
      },
      {
        id: 'attendance',
        title: 'Attendance',
        icon: <Circle />,
        navLink: '/charts/apex'
      },
      {
        id: 'time-sheet',
        title: 'Time Sheet',
        icon: <Circle />,
        navLink: '/charts/apex'
      }
    ]
  }
]