// ** React Imports
import { Link } from 'react-router-dom'
import { useState, useEffect, forwardRef } from 'react'

// ** Table Columns
import { columns } from './columns'

import Select from 'react-select'
// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'

// ** Reactstrap Imports
import { Button, Input, Row, Col, Card, CardBody, Label } from 'reactstrap'

// ** Store & Actions
import { getData } from '../store'
import { useDispatch, useSelector } from 'react-redux'

// ** Styles
import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { selectThemeColors } from '@utils'

const CustomHeader = ({ handleFilter, value, handlePerPage, rowsPerPage }) => {
  return (
    <div className='invoice-list-table-header w-100 py-2'>
      <Row>
        <Col lg='6' className='d-flex align-items-center px-0 px-lg-1'>
          <div className='d-flex align-items-center me-2'>
            <label htmlFor='rows-per-page'>Show</label>
            <Input
              type='select'
              id='rows-per-page'
              value={rowsPerPage}
              onChange={handlePerPage}
              className='form-control ms-50 pe-3'
            >
              <option value='10'>10</option>
              <option value='25'>25</option>
              <option value='50'>50</option>
            </Input>
          </div>
          <Button tag={Link} to='/invoice/add' color='primary'>
            Add Record
          </Button>
        </Col>
        <Col
          lg='6'
          className='actions-right d-flex align-items-center justify-content-lg-end flex-lg-nowrap flex-wrap mt-lg-0 mt-1 pe-lg-1 p-0'
        >
          <div className='d-flex align-items-center'>
            <label htmlFor='search-invoice'>Search</label>
            <Input
              id='search-invoice'
              className='ms-50 me-2 w-100'
              type='text'
              value={value}
              onChange={e => handleFilter(e.target.value)}
              placeholder='Search Invoice'
            />
          </div>
        </Col>
      </Row>
    </div>
  )
}

const InvoiceList = () => {
  // ** Store vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.invoice)

  // ** States
  const [value, setValue] = useState('')
  const [sort, setSort] = useState('desc')
  const [sortColumn, setSortColumn] = useState('id')
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [currentStatus, setCurrentStatus] = useState({ id: 1, name: 'Active' })

  const statusOptions = [
    { id: '', name: 'Select Status' },
    { id: 1, name: 'Active' },
    { id: 2, name: 'Inactive' }
  ]

  // ** Bootstrap Checkbox Component
  const BootstrapCheckbox = forwardRef((props, ref) => (
    <div className='form-check'>
      <Input type='checkbox' ref={ref} {...props} />
    </div>
  ))

  useEffect(() => {
    dispatch(
      getData({
        sort,
        q: value,
        sortColumn,
        page: currentPage,
        perPage: rowsPerPage,
        status: currentStatus.id
      })
    )
  }, [dispatch, store.data.length])

  const handleFilter = val => {
    setValue(val)
    dispatch(
      getData({
        sort,
        q: val,
        sortColumn,
        page: currentPage,
        perPage: rowsPerPage,
        status: currentStatus.id
      })
    )
  }

  const handlePerPage = e => {
    dispatch(
      getData({
        sort,
        q: value,
        sortColumn,
        page: currentPage,
        status: currentStatus.id,
        perPage: parseInt(e.target.value)
      })
    )
    setRowsPerPage(parseInt(e.target.value))
  }

  const handleStatusValue = e => {
    setCurrentStatus(e.target.value)
    dispatch(
      getData({
        sort,
        q: value,
        sortColumn,
        page: currentPage,
        perPage: rowsPerPage,
        status: e.target.value
      })
    )
  }

  const handlePagination = page => {
    dispatch(
      getData({
        sort,
        q: value,
        sortColumn,
        status: currentStatus.id,
        perPage: rowsPerPage,
        page: page.selected + 1
      })
    )
    setCurrentPage(page.selected + 1)
  }

  const CustomPagination = () => {
    const count = Number((store.total / rowsPerPage).toFixed(0))

    return (
      <ReactPaginate
        nextLabel=''
        breakLabel='...'
        previousLabel=''
        pageCount={count || 1}
        activeClassName='active'
        breakClassName='page-item'
        pageClassName={'page-item'}
        breakLinkClassName='page-link'
        nextLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousLinkClassName={'page-link'}
        previousClassName={'page-item prev'}
        onPageChange={page => handlePagination(page)}
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        containerClassName={'pagination react-paginate justify-content-end p-1'}
      />
    )
  }

  const dataToRender = () => {
    const filters = {
      q: value,
      status: currentStatus.id
    }

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0
    })

    if (store.data.length > 0) {
      return store.data
    } else if (store.data.length === 0 && isFiltered) {
      return []
    } else {
      return store.allData.slice(0, rowsPerPage)
    }
  }

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection)
    setSortColumn(column.sortField)
    dispatch(
      getData({
        q: value,
        page: currentPage,
        sort: sortDirection,
        status: currentStatus.id,
        perPage: rowsPerPage,
        sortColumn: column.sortField
      })
    )
  }

  return (
    <div className='invoice-list-wrapper'>
      <Card>
        <CardBody>
          <Row>
            <Col md='4'>
              <Label for='status-select'>Status</Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className='react-select'
                classNamePrefix='select'
                options={statusOptions}
                value={currentStatus}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                onChange={async data => {
                  setCurrentStatus(data)
                  setBlock(true)
                  await dispatch(
                    getData({
                      sort,
                      sortColumn,
                      q: searchTerm,
                      page: currentPage,
                      perPage: rowsPerPage,
                      status: data.id
                    })
                  )
                }}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card>
        <div className='invoice-list-dataTable react-dataTable'>
          <DataTable
            noHeader
            pagination
            sortServer
            paginationServer
            subHeader={true}
            columns={columns}
            responsive={true}
            selectableRows
            onSort={handleSort}
            data={dataToRender()}
            sortIcon={<ChevronDown />}
            className='react-dataTable'
            defaultSortField='invoiceId'
            paginationDefaultPage={currentPage}
            selectableRowsComponent={BootstrapCheckbox}
            paginationComponent={CustomPagination}
            subHeaderComponent={
              <CustomHeader
                value={value}
                currentStatus={currentStatus}
                rowsPerPage={rowsPerPage}
                handleFilter={handleFilter}
                handlePerPage={handlePerPage}
                handleStatusValue={handleStatusValue}
              />
            }
          />
        </div>
      </Card>
    </div>
  )
}

export default InvoiceList
