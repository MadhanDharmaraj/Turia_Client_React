// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

// ** Store & Actions
import { store } from '@store/store'
import { getClient, deleteClient, updateStatus } from '../store'

// ** Icons Imports
import { MoreVertical, Trash2, Eye, XCircle, CheckCircle, Edit } from 'react-feather'

// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Col } from 'reactstrap'
const MySwal = withReactContent(Swal)
// ** Renders Client Columns
const renderClient = row => {
  return (
    <Avatar
      initials
      className='me-1'
      color={'light-primary'}
      content={row.name.charAt(0).toUpperCase()}
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

const deleteClientfun = (id) => {

  return MySwal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    customClass: {
      confirmButton: 'btn btn-primary',
      cancelButton: 'btn btn-outline-danger ms-1'
    },
    buttonsStyling: false
  }).then(async (result) => {
    if (result.value) {
      await store.dispatch(deleteClient(id))
      MySwal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: 'Client has been deleted.',
        customClass: {
          confirmButton: 'btn btn-success'
        }
      })
    }
  })
}

export const columns = [
  {
    name: 'Client',
    sortable: true,
    minWidth: '300px',
    sortField: 'email',
    selector: row => row.contactpersonname,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {renderClient(row)}
        <div className='d-flex flex-column'>
          <Link
            to={`/client/view/${row.id}`}
            className='user_name text-truncate text-body'
            onClick={() => store.dispatch(getClient(row.id))}
          >
            <span className='fw-bolder'>{row.contactpersonname}</span>
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
    sortField: 'name',
    selector: row => row.name,
    cell: row => <span className='text-capitalize'>{row.name}</span>
  },
  {
    name: 'Contact',
    minWidth: '138px',
    sortable: true,
    sortField: 'contactnumber',
    selector: row => row.contactnumber,
    cell: row => <span className='text-capitalize'>{row.contactnumber}</span>
  },
  {
    name: 'Status',
    minWidth: '138px',
    sortable: true,
    sortField: 'status',
    selector: row => statusArr[row.status],
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
            {row.status === 2 && (
              <DropdownItem tag='a' href='/' className='w-100' onClick={e => {
                e.preventDefault()
                const id = row.id
                const status = 1
                const obj = { id, status }
                store.dispatch(updateStatus(obj))
              }}>
                <CheckCircle size={14} className='me-50' />
                <span className='align-middle'>Mark as Active</span>
              </DropdownItem>)
            }
            {row.status === 1 && (
              <DropdownItem tag='a' href='/' className='w-100' onClick={e => {
                e.preventDefault()
                const id = row.id
                const status = 2
                const obj = { id, status }
                store.dispatch(updateStatus(obj))
              }}>
                <XCircle size={14} className='me-50' />
                <span className='align-middle'>Mark as Inactive</span>
              </DropdownItem>)
            }
            <DropdownItem
              tag='a'
              href='/'
              className='w-100'
              onClick={e => {
                e.preventDefault()
                deleteClientfun(row.id)
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
