// ** React Imports
import { useState, useEffect } from 'react'

// ** Table Columns
import { columns } from './attendance_columns'

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
  const [currentPage] = useState(1)
  const [statusValue] = useState('')
  const [sort, setSort] = useState('desc')
  const [sortColumn, setSortColumn] = useState('id')

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

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection)
    setSortColumn(column.sortField)
    dispatch(
      attendaceList({
        q: value,
        page: currentPage,
        sort: sortDirection,
        status: statusValue,
        userId: id,
        perPage: rowsPerPage,
        sortColumn: column.sortField
      })
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
            columns={columns}
            responsive={true}
            onSort={handleSort}
            data={dataToRender()}
            sortIcon={<ChevronDown />}
            className='react-dataTable'
            defaultSortField='invoiceId'
          />
        </div>
      </Card>
    </div>
  )
}

export default Attendance
