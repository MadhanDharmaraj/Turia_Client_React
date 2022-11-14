// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
// ** Store & Actions
import { store } from '@store/store'
import { getService, deleteService, updateStatus } from '../store'

// ** Icons Imports
import { MoreVertical, Trash2, Eye, Edit, CheckCircle, XCircle } from 'react-feather'

// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Col } from 'reactstrap'
const MySwal = withReactContent(Swal)
// ** Renders Client Columns
const renderService = row => {
  return (<Avatar
    initials
    className='me-1'
    color='light-primary'
    content={row.name}
  />
  )
}

const deleteServicefun = (id) => {

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
      await store.dispatch(deleteService(id))
      MySwal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: 'Service has been deleted.',
        customClass: {
          confirmButton: 'btn btn-success'
        }
      })
    }
  })
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

export const columns = [
  {
    name: 'Service',
    sortable: true,
    minWidth: '300px',
    sortField: 'name',
    selector: row => row.name,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {renderService(row)}
        <div className='d-flex flex-column'>
          <Link
            to={`/service/view/${row.id}`}
            className='user_name text-truncate text-body'
            onClick={() => store.dispatch(getService(row.id))}
          >
            <span className='fw-bolder'>{row.name}</span>
          </Link>
        </div>
      </div>
    )
  },
  {
    name: 'Category',
    sortable: true,
    minWidth: '172px',
    sortField: 'role',
    selector: row => row.categoriesname,
    cell: row => <span className='text-capitalize'>{row.categoriesname}</span>
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
          to={`/service/view/${row.id}`}
          onClick={() => store.dispatch(getService(row.id))}>
          <Eye className='cursor-pointer mt-0' size={16} />
        </Col>
        <Col lg={4} tag={Link} to={`/service/edit/${row.id}`}
          onClick={() => store.dispatch(getService(row.id))}>
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
              </DropdownItem>)}
            <DropdownItem
              tag='a'
              href='/'
              className='w-100'
              onClick={e => {
                e.preventDefault()
                deleteServicefun(row.id)
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
