// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { store } from '@store/store'
import { getInvitation, deleteUser, inviteMail } from '../store'

// ** Icons Imports
import { MoreVertical, Trash2, Eye, Edit, Send } from 'react-feather'

// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Col } from 'reactstrap'

// ** Renders Client Columns
const renderClient = row => {

  return (
    <Avatar
      initials
      className='me-1'
      color={'light-primary'}
      content={row.name || 'John Doe'}
    />
  )

}

// ** Renders Role Columns
const statusObj = [
  '',
  'light-warning',
  'light-success'
]

const statusArr = [
  '',
  'Invited',
  'Active'
]

export const columns = [
  {
    name: 'User',
    sortable: true,
    minWidth: '300px',
    sortField: 'fullName',
    selector: row => row.name,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {renderClient(row)}
        <div className='d-flex flex-column'>
          <Link
            to={`/team/view/${row.id}`}
            className='user_name text-truncate text-body'
            onClick={() => store.dispatch(getInvitation(row.id))}
          >
            <span className='fw-bolder'>{row.name}</span>
          </Link>
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
    selector: row => row.rolename,
    cell: row => <span className='text-capitalize'>{row.rolename}</span>
  },
  {
    name: 'Designation',
    minWidth: '138px',
    sortable: true,
    sortField: 'designation',
    selector: row => row.designationname,
    cell: row => <span className='text-capitalize'>{row.designationname}</span>
  },
  {
    name: 'Department',
    minWidth: '230px',
    sortable: true,
    sortField: 'department',
    selector: row => row.departmentname,
    cell: row => <span className='text-capitalize'>{row.departmentname}</span>
  },
  {
    name: 'Status',
    minWidth: '138px',
    sortable: true,
    sortField: 'status',
    selector: row => row.status,
    cell: row => (
      <Badge className='text-capitalize' color={statusObj[row.status]} pill>
        {statusArr[row.status]}
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
          onClick={() => store.dispatch(getInvitation(row.id))}>
          <Eye
            className='cursor-pointer mt-0' size={16} />
        </Col>
        <Col
          onClick={() => store.dispatch(inviteMail(row.id))} >
          <Send
            className='cursor-pointer ms-1 mt-0' size={16} />
        </Col>
        <UncontrolledDropdown>
          <DropdownToggle tag='div' className='btn btn-sm'>
            <MoreVertical size={14} className='cursor-pointer' />
          </DropdownToggle>
          <DropdownMenu>
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
            <DropdownItem
              tag={Link} lg={4}
              to={`/team/edit/${row.id}`}
              className='w-100'
            >
              <Edit size={14} className='me-50' />
              <span className='align-middle'>Edit</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    )
  }
]
