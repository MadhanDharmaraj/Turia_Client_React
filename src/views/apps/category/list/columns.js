// ** Custom Components
import Avatar from '@components/avatar'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
// ** Store & Actions
import { store } from '@store/store'
import { deleteCategory } from '../store'
// ** Icons Imports
import { Edit, Trash } from 'react-feather'

// ** Reactstrap Imports
import { Col } from 'reactstrap'
const MySwal = withReactContent(Swal)
// ** Renders Client Columns
const renderCategory = row => {
  return (<Avatar
    initials
    className='me-1'
    color={'light-primary'}
    content={row.name}
  />)
}


const deleteCategoryfun = (id) => {

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
      await store.dispatch(deleteCategory(id))
      MySwal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: 'Category has been deleted.',
        customClass: {
          confirmButton: 'btn btn-success'
        }
      })
    }
  })
}

export const columns = [
  {
    name: 'Category',
    sortable: true,
    minWidth: '300px',
    sortField: 'name',
    selector: row => row.name,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {renderCategory(row)}
        <div className='d-flex flex-column'>
          <span className='fw-bolder'>{row.name}</span>
        </div>
      </div>
    )
  },
  {
    name: 'Actions',
    minWidth: '100px',
    cell: row => (
      <div className='column-action d-flex align-items-center'>
        <Col lg={4}>
          <Edit onClick={() => clickMe()}
            className='cursor-pointer ms-1 mt-0' size={16} />
        </Col>
        <Col lg={4}>
          <Trash onClick={e => {
            e.preventDefault()
            deleteCategoryfun(row.id)
          }}
            className='cursor-pointer ms-1 mt-0' size={16} />
        </Col>
      </div>
    )
  }
]
