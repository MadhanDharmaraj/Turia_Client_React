// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { store } from '@store/store'
import { getDsc, deleteDigitalSignature } from '../store'

// ** Icons Imports
import { MoreVertical, Trash2, Eye, Edit, CheckCircle, XCircle } from 'react-feather'

// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Col } from 'reactstrap'
import moment from 'moment'

// ** Renders Client Columns
const renderClient = row => {

  return (
    <Avatar
      initials
      className='me-1'
      color={'light-primary'}
      content={row.name || ''}
    />
  )

}

const statusObj = [
  '',
  'light-primary',
  'light-warning'
]

const statusArr = [
  '',
  "Active",
  "In Active"

]

const dateFormat = (value) => {

  return moment.unix(value).format("MMM DD, YYYY")

}

export const columns = [
  {
    name: 'ID',
    sortable: true,
    minWidth: '172px',
    sortField: 'role',
    selector: row => row.id,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        <Link
          to={`/digital-signature/view/${row.id}`}
          className='user_name text-truncate text-body'
          onClick={() => store.dispatch(getDsc(row.id))}
        >
          <span className='text-capitalize fw-bolder'>{row.id}</span>
        </Link>
      </div>
    )
  },
  {
    name: 'Client',
    sortable: true,
    minWidth: '300px',
    sortField: 'client',
    selector: row => row.name,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {renderClient(row)}
        <div className='d-flex flex-column'>
          <span className='fw-bolder'>{row.name}</span>
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
    selector: row => row.issueddate,
    cell: row => <span className='text-capitalize'>{dateFormat(row.issueddate)}</span>
  },
  {
    name: 'Expiry Date',
    minWidth: '138px',
    sortable: true,
    sortField: 'currentPlan',
    selector: row => row.expirydate,
    cell: row => <span className='text-capitalize'>{dateFormat(row.expirydate)}</span>
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
          to={`/digital-signature/view/${row.id}`}
          onClick={() => store.dispatch(getDsc(row.id))}>
          <Eye
            className='cursor-pointer mt-0' size={16} />
        </Col>
        <Col tag={Link} lg={4}
          to={`/digital-signature/edit/${row.clientid}`}>
          <Edit
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
                store.dispatch(deleteDigitalSignature(row.id))
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
