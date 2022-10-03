// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { store } from '@store/store'
import { getClient, deleteClient } from '../store'

// ** Icons Imports
import { Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, Archive, Eye, XCircle, CheckCircle, Edit } from 'react-feather'

// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Row, Col } from 'reactstrap'

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
        content={row.fullName || 'John Doe'}
      />
    )
  }
}

// ** Renders Role Columns

const statusObj = {
  pending: 'light-warning',
  active: 'light-success',
  inactive: 'light-secondary'
}

export const columns = [
  {
    name: 'Client',
    sortable: true,
    minWidth: '300px',
    sortField: 'name',
    selector: row => row.contact_person_name,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {renderClient(row)}
        <div className='d-flex flex-column'>
          <Link
            to={`/client/view/${row.id}`}
            className='user_name text-truncate text-body'
            onClick={() => store.dispatch(getClient(row.id))}
          >
            <span className='fw-bolder'>{row.contact_person_name}</span>
          </Link>
          <small className='text-truncate text-muted mb-0'>{row.email}</small>
        </div>
      </div>
    )
  },
  {
    name: 'Business Name',
    minWidth: '230px',
    sortable: true,
    sortField: 'businessName',
    selector: row => row.businessName,
    cell: row => <span className='text-capitalize'>{row.businessName}</span>
  },
  {
    name: 'Contact',
    minWidth: '138px',
    sortable: true,
    sortField: 'contact_no',
    selector: row => row.contact_no,
    cell: row => <span className='text-capitalize'>{row.contact_no}</span>
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
          to={`/client/view/${row.id}`}
          onClick={() => store.dispatch(getClient(row.id))}>
          <Eye className='cursor-pointer mt-0' size={16} />
        </Col>
        <Col lg={4} tag={Link} to={`/client/edit/${row.id}`}
          onClick={() => store.dispatch(getClient(row.id))}>
          <Edit
            className='cursor-pointer ms-1 mt-0' size={16} />
        </Col>
        <UncontrolledDropdown>
          <DropdownToggle tag='div' className='btn btn-sm'>
            <MoreVertical size={14} className='cursor-pointer' />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
              <CheckCircle size={14} className='me-50' />
              <span className='align-middle'>Mark as Active</span>
            </DropdownItem>
            <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
              <XCircle size={14} className='me-50' />
              <span className='align-middle'>Mark as Inactive</span>
            </DropdownItem>
            <DropdownItem
              tag='a'
              href='/'
              className='w-100'
              onClick={e => {
                e.preventDefault()
                store.dispatch(deleteClient(row.id))
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
