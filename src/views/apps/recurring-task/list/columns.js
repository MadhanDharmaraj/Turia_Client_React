// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { store } from '@store/store'
import { getTask, deleteUser } from '../store'

// ** Icons Imports
import { Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, Archive } from 'react-feather'

// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

// ** Renders Client Columns
// const renderClient = row => {
//   if (row.avatar.length) {
//     return <Avatar className='me-1' img={row.avatar} width='32' height='32' />
//   } else {
//     return (
//       <Avatar
//         initials
//         className='me-1'
//         color={row.avatarColor || 'light-primary'}
//         content={row.fullName || 'John Doe'}
//       />
//     )
//   }
// }

const statusObj = {
  pending: 'light-warning',
  active: 'light-success',
  inactive: 'light-secondary'
}

export const columns = [
  {
    name: 'Task ID',
    sortable: true,
    minWidth: '138px',  
    sortField: 'task_id',
    selector: row => row.task_id,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        
        <div className='d-flex flex-column'>
          <Link
            to={`/task/view/${row.id}`}
            className='user_name text-truncate text-body'
            onClick={() => store.dispatch(getTask(row.id))}
          >
            <span className='fw-bolder'>{row.task_id}</span>
          </Link>
        </div>
      </div>
    )
  },
  {
    name: 'Client',
    sortable: true,
    minWidth: '172px',
    sortField: 'role',
    selector: row => row.client,
    cell: row => <span className='text-capitalize'>{row.client}</span>
  },
  {
    name: 'Service',
    minWidth: '172px',
    sortable: true,
    sortField: 'currentPlan',
    selector: row => row.task,
    cell: row => <span className='text-capitalize'>{row.task}</span>
  },
  {
    name: 'Priority',
    minWidth: '230px',
    sortable: true,
    sortField: 'billing',
    selector: row => row.priority,
    cell: row => <span className='text-capitalize'>{row.priority}</span>
  },
  {
    name: 'Status',
    minWidth: '138px',
    sortable: true,
    sortField: 'status',
    selector: row => row.status,
    cell: row => (
      <Badge className='text-capitalize' color={statusObj[row.status]} pill>
        {row.status}
      </Badge>
    )
  },
  {
    name: 'Actions',
    minWidth: '100px',
    cell: row => (
      <div className='column-action'>
        <UncontrolledDropdown>
          <DropdownToggle tag='div' className='btn btn-sm'>
            <MoreVertical size={14} className='cursor-pointer' />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              tag={Link}
              className='w-100'
              to={`/task/view/${row.id}`}
              onClick={() => store.dispatch(getTask(row.id))}
            >
              <FileText size={14} className='me-50' />
              <span className='align-middle'>Details</span>
            </DropdownItem>
            <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
              <Archive size={14} className='me-50' />
              <span className='align-middle'>Edit</span>
            </DropdownItem>
            <DropdownItem
              tag='a'
              href='/'
              className='w-100'
              onClick={e => {
                e.preventDefault()
                store.dispatch(deleteUser(row.id))
              }}
            >
              <Trash2 size={14} className='me-50' />
              <span className='align-middle'>Delete</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    )
  }
]
