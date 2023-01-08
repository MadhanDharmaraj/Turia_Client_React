// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { store } from '@store/store'
import { getTask, deleteTask } from '../store'

// ** Icons Imports
import { MoreVertical, FileText, Trash2, Archive, Eye, Edit, CheckCircle, XCircle } from 'react-feather'

// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Col } from 'reactstrap'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

// ** Renders Client Columns
const renderClient = row => {

  return (
    <Avatar
      initials
      className='me-1'
      color={'light-primary'}
      content={row.servicename.charAt(0) || 'T'}
    />
  )

}

const deletefn = (id) => {

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
      await store.dispatch(deleteTask(id))
      MySwal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: 'Invoice has been deleted.',
        customClass: {
          confirmButton: 'btn btn-success'
        }
      })
    }
  })
}

const statusObj = [
  'light-warning',
  'light-success',
  'light-secondary'
]

const priorityOptions = ['Low', 'Medium', 'High']
const statusOptions = ['To Do', 'In progress', 'Completed', 'On Hold', 'Cancelled', 'Sent to Review', 'Request Changes']

export const columns = [
  {
    name: 'Task ID',
    sortable: true,
    minWidth: '138px',
    sortField: 'uniqueidentity',
    selector: row => row.uniqueidentity,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {renderClient(row)}
        <div className='d-flex flex-column'>
          <Link
            to={`/task/view/${row.id}`}
            className='user_name text-truncate text-body'
            onClick={() => store.dispatch(getTask(row.id))}
          >
            <span className='fw-bolder'>{row.uniqueidentity}</span>
          </Link>
        </div>
      </div>
    )
  },
  {
    name: 'Client',
    sortable: true,
    minWidth: '172px',
    sortField: 'clientname',
    selector: row => row.clientname,
    cell: row => <span className='text-capitalize'>{row.clientname}</span>
  },
  {
    name: 'Service',
    minWidth: '172px',
    sortable: true,
    sortField: 'servicename',
    selector: row => row.servicename,
    cell: row => <span className='text-capitalize'>{row.servicename}</span>
  },
  {
    name: 'Priority',
    minWidth: '230px',
    sortable: true,
    sortField: 'priority',
    selector: row => row.priority,
    cell: row => <span className='text-capitalize'>{priorityOptions[row.priority]}</span>
  },
  {
    name: 'Status',
    minWidth: '138px',
    sortable: true,
    sortField: 'taskstatus',
    selector: row => row.taskstatus,
    cell: row => (
      <Badge className='text-capitalize' color={statusObj[row.taskstatus]} pill>
        {statusOptions[row.taskstatus]}
      </Badge>
    )
  },
  {
    name: 'Actions',
    minWidth: '100px',
    cell: row => (
      <div className='column-action d-flex align-items-center'>
        <Col tag={Link} lg={4}
          to={`/task/view/${row.id}`}
          onClick={() => store.dispatch(getTask(row.id))} >
          <Eye className='cursor-pointer mt-0' size={16} />
        </Col>
        <Col tag={Link} to={`/task/edit/${row.id}`} lg={4}
          onClick={() => store.dispatch(getTask(row.id))} >
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
                deletefn(row.id)
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
