// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { store } from '@store/store'
import { getDsc, deleteUser } from '../store'

// ** Icons Imports
import { Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, Archive } from 'react-feather'

// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

// ** Renders Client Columns
const renderClient = row => {
  if (row.avatar.length) {
    return <Avatar className='me-1' img={row.avatar} width='32' height='32' />
  } else {
    return (
      <Avatar
        initials
        className='me-1'
        color={row.avatarColor || 'light-primary'}
        content={row.client || 'John Doe'}
      />
    )
  }
}

const statusObj = {
  pending: 'light-warning',
  active: 'light-success',
  inactive: 'light-secondary'
}

export const columns = [
  {
    name: 'ID',
    sortable: true,
    minWidth: '172px',
    sortField: 'role',
    selector: row => row.uniqueId,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        <Link
          to={`/digital-signature/view/${row.id}`}
          className='user_name text-truncate text-body'
          onClick={() => store.dispatch(getDsc(row.id))}
        >
          <span className='text-capitalize fw-bolder'>{row.uniqueId}</span>
        </Link>
      </div>
    )
  },
  {
    name: 'Client',
    sortable: true,
    minWidth: '300px',
    sortField: 'client',
    selector: row => row.client,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {renderClient(row)}
        <div className='d-flex flex-column'>
          <span className='fw-bolder'>{row.client}</span>
          <small className='text-truncate text-muted mb-0'>{row.email}</small>
        </div>
      </div>
    )
  },
  {
    name: 'Issued Date',
    sortable: true,
    minWidth: '172px',
    sortField: 'role',
    selector: row => row.issuedDate,
    cell: row => <span className='text-capitalize'>{row.issuedDate}</span>
  },
  {
    name: 'Expiry Date',
    minWidth: '138px',
    sortable: true,
    sortField: 'currentPlan',
    selector: row => row.expiryDate,
    cell: row => <span className='text-capitalize'>{row.expiryDate}</span>
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
              to={`/digital-signature/view/${row.id}`}
              onClick={() => store.dispatch(getDsc(row.id))}
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
