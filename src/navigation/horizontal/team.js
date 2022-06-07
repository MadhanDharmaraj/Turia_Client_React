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
      }
    ]
  }
]