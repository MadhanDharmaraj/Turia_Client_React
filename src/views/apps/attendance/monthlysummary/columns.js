// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { store } from '@store/store'

// ** Icons Imports
import { Slack, User, Settings, Database, Edit2, Eye, Edit } from 'react-feather'

// ** Reactstrap Imports
import { Badge, Col } from 'reactstrap'

// ** Renders Client Columns
const renderClient = row => {
  if (row.avatar.length) {

    <Avatar
      initials
      className='me-1'
      color={'light-primary'}
      content={row.username || 'John Doe'}
    />
  }

}

// ** Renders Role Columns
const renderRole = row => {
  const roleObj = {
    subscriber: {
      class: 'text-primary',
      icon: User
    },
    maintainer: {
      class: 'text-success',
      icon: Database
    },
    editor: {
      class: 'text-info',
      icon: Edit2
    },
    author: {
      class: 'text-warning',
      icon: Settings
    },
    admin: {
      class: 'text-danger',
      icon: Slack
    }
  }

  const Icon = roleObj[row.role] ? roleObj[row.role].icon : Edit2

  return (
    <span className='text-truncate text-capitalize align-middle'>
      <Icon size={18} className={`${roleObj[row.role] ? roleObj[row.role].class : ''} me-50`} />
      {row.role}
    </span>
  )
}

const statusObj = {
  pending: 'light-warning',
  active: 'light-success',
  inactive: 'light-secondary'
}

export const columns = [
  {
    name: 'User',
    sortable: true,
    minWidth: '300px',
    sortField: 'fullName',
    selector: row => row.fullName,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {renderClient(row)}
        <div className='d-flex flex-column'>
          <small className='text-truncate text-muted mb-0'>{row.email}</small>
        </div>
      </div>
    )
  },
  {
    name: 'Role',
    sortable: true,
    minWidth: '172px',
    sortField: 'role',
    selector: row => row.role,
    cell: row => renderRole(row)
  },
  {
    name: 'Designation',
    minWidth: '138px',
    sortable: true,
    sortField: 'designation',
    selector: row => row.designation,
    cell: row => <span className='text-capitalize'>{row.designation}</span>
  },
  {
    name: 'Department',
    minWidth: '230px',
    sortable: true,
    sortField: 'department',
    selector: row => row.department,
    cell: row => <span className='text-capitalize'>{row.department}</span>
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
      <div className='column-action d-flex align-items-center'>
        <Col tag={Link} lg={4}
          to={`/team/view/${row.id}`}
          onClick={() => store.dispatch(getData(row.id))}>
          <Eye
            className='cursor-pointer mt-0' size={16} />
        </Col>
        <Col tag={Link} lg={4}
          to={`/team/edit/${row.id}`}
          onClick={() => store.dispatch(getData(row.id))} >
          <Edit
            className='cursor-pointer ms-1 mt-0' size={16} />
        </Col>
      </div>
    )
  }
]
