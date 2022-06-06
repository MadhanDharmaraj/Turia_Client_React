// ** Icons Import
import { Circle, FilePlus } from 'react-feather'

export default [
  {
    id: 'sales',
    title: 'Sales',
    icon: <FilePlus />,
    children: [
      {
        id: 'proposal',
        title: 'Proposal',
        icon: <Circle />,
        navLink: '/proposal/list'
      },
      {
        id: 'invoice',
        title: 'Invoice',
        icon: <Circle />,
        navLink: '/invoice/list'
      }
    ]
  }
]