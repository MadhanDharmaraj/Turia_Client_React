// ** React Imports
import { useState, useEffect } from 'react'

// ** Table Columns
import { columns } from './attendance_columns'
import ReactPaginate from 'react-paginate'
// ** Third Party Components
import DataTable from 'react-data-table-component'
import { ChevronDown, ExternalLink, Printer, FileText, File, Clipboard, Copy } from 'react-feather'

// ** Reactstrap Imports
import {
  Card,
  CardTitle,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledButtonDropdown
} from 'reactstrap'

// ** Store & Actions
import { attendaceList } from './store/index'
import { useDispatch, useSelector } from 'react-redux'

// ** Styles
import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { useParams } from 'react-router-dom'

const Attendance = (data) => {
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.profile)
  const { id } = useParams()
  // ** States
  const [value] = useState('')

  const [rowsPerPage] = useState(6)
  const [currentPage, setCurrentPage] = useState(1)
  const [statusValue] = useState('')
  const [sort] = useState('desc')
  const [sortColumn] = useState('punchin')

  useEffect(() => {
    if (data.tabId === 'attendance') {
      dispatch(
        attendaceList({
          sort,
          q: value,
          sortColumn,
          page: currentPage,
          perPage: rowsPerPage,
          status: statusValue,
          userId: id
        })
      )
    }
  }, [dispatch, store.employeeAttendances.length, data.tabId])

  const dataToRender = () => {
    const filters = {
      status: statusValue,
      userId: id,
      q: value
    }

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0
    })

    if (store.employeeAttendances.length > 0) {
      return store.employeeAttendances.slice(0, rowsPerPage)
    } else if (store.employeeAttendances.length === 0 && isFiltered) {
      return []
    }
  }

    // ** Get data on mount
    useEffect(() => {
      dispatch(
        attendaceList({
          sort,
          q: value,
          sortColumn,
          page: currentPage,
          perPage: rowsPerPage,
          status: statusValue,
          userId: id
        })
      )
    }, [dispatch, store.data.length, currentPage])

  const handlePagination = page => {
    dispatch(
      attendaceList({
        q: value,
        page: currentPage,
        status: statusValue,
        userId: id,
        perPage: rowsPerPage
      })
    )
    setCurrentPage(page.selected + 1)
  }

  const CustomPagination = () => {
    const count = Number(Math.ceil(store.total / rowsPerPage))

    return (
      <ReactPaginate
        previousLabel={''}
        nextLabel={''}
        pageCount={count || 1}
        activeClassName='active'
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={page => handlePagination(page)}
        pageClassName={'page-item'}
        nextLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousClassName={'page-item prev'}
        previousLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        containerClassName={'pagination react-paginate justify-content-end my-2 pe-1'}
      />
    )
  }

  return (
    <div className='invoice-list-wrapper'>
      <Card>
        <CardHeader className='py-1'>
          <UncontrolledButtonDropdown>
            <DropdownToggle color='secondary' outline caret>
              <ExternalLink className='font-small-4 me-50' />
              <span>Export</span>
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem className='w-100'>
                <Printer className='font-small-4 me-50' />
                <span>Print</span>
              </DropdownItem>
              <DropdownItem className='w-100'>
                <FileText className='font-small-4 me-50' />
                <span>CSV</span>
              </DropdownItem>
              <DropdownItem className='w-100'>
                <File className='font-small-4 me-50' />
                <span>Excel</span>
              </DropdownItem>
              <DropdownItem className='w-100'>
                <Clipboard className='font-small-4 me-50' />
                <span>PDF</span>
              </DropdownItem>
              <DropdownItem className='w-100'>
                <Copy className='font-small-4 me-50' />
                <span>Copy</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledButtonDropdown>
        </CardHeader>
        <div className='invoice-list-dataTable react-dataTable'>
        <DataTable
            noHeader
            sortServer
            pagination
            responsive
            paginationServer
            columns={columns}
            sortIcon={<ChevronDown />}
            className='react-dataTable'
            paginationComponent={CustomPagination}
            data={dataToRender()}
          />
        </div>
      </Card>
    </div>
  )
}

export default Attendance
