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
        navLink: '/team/list'
      },
      {
        id: 'attendance',
        title: 'Attendance',
        icon: <Circle />,
        navLink: '/attendance/list'
      },
      {
        id: 'leaves',
        title: 'Leave',
        icon: <Circle />,
        navLink: '/leaves/list'
      },
      {
        id: 'timesheet',
        title: 'Time Sheet',
        icon: <Circle />,
        navLink: '/timesheet/list'
      }
    ]
  }
]