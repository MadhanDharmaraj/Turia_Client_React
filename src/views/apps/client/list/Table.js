// ** React Imports
import { Fragment, useState, useEffect, forwardRef } from 'react'
import { Link } from 'react-router-dom'

// ** Table Columns
import { columns } from './columns'
import UILoader from '@components/ui-loader'
import Spinner from '@components/spinner/Loading-spinner'

// ** Store & Actions
import { getData } from '../store'
import { useDispatch, useSelector } from 'react-redux'
import axios from '../../../../configs/axios/axiosConfig'

// ** Third Party Components
import Select from 'react-select'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown } from 'react-feather'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Input,
  Label,
  Button,
  CardBody
} from 'reactstrap'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

// ** Table Header
const CustomHeader = ({ handlePerPage, rowsPerPage, handleFilter, searchTerm }) => {

  return (
    <div className='invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75'>
      <Row>
        <Col xl='6' className='d-flex align-items-center p-0'>
          <div className='d-flex align-items-center w-100'>
            <label htmlFor='rows-per-page'>Show</label>
            <Input
              className='mx-50'
              type='select'
              id='rows-per-page'
              value={rowsPerPage}
              onChange={handlePerPage}
              style={{ width: '5rem' }}
            >
              <option value='10'>10</option>
              <option value='25'>25</option>
              <option value='50'>50</option>
            </Input>
            <label htmlFor='rows-per-page'>Entries</label>
          </div>
        </Col>
        <Col
          xl='6'
          className='d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1'
        >
          <div className='d-flex align-items-center mb-sm-0 mb-1 me-1'>
            <label className='mb-0' htmlFor='search-invoice'>
              Search:
            </label>
            <Input
              id='search-invoice'
              className='ms-50 w-100'
              type='text'
              value={searchTerm}
              onChange={e => handleFilter(e.target.value)}
            />
          </div>

          <div className='d-flex align-items-center table-header-actions'>
            <Button color='primary' tag={Link} to='/client/add'>
              Add Client
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  )
}

const UsersList = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.users)

  // ** Bootstrap Checkbox Component
  const BootstrapCheckbox = forwardRef((props, ref) => (
    <div className='form-check'>
      <Input type='checkbox' ref={ref} {...props} />
    </div>
  ))
  const [block, setBlock] = useState(false)
  const Loader = () => {
    return (
      <Fragment>
        <Spinner />
      </Fragment>
    )
  }

  // ** States
  const [sort, setSort] = useState('desc')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState('id')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [businessEntity, setBusinessEntity] = useState({id: '', name: 'Select Entity'})
  const [currentStatus, setCurrentStatus] = useState({ id: 1, name: 'Active' })

  // ** Client filter options
  const [businessEntityOptions, setBusinessEntityOptions] = useState([])
  const statusOptions = [
    { id: '', name: 'Select Status'},
    { id: 1, name: 'Active' },
    { id: 2, name: 'Inactive'}
  ]

  const getBusinessEntity = () => {
    axios.post(`/businessentities/list`).then(response => {
      const arr = response.data.businessentities
      setBusinessEntityOptions(arr)

    })
  }

  // ** Get data on mount
  useEffect(async () => {
    getBusinessEntity()
    setBlock(true)
    await dispatch(
      getData({
        sort,
        sortColumn,
        q: searchTerm,
        page: currentPage,
        perPage: rowsPerPage,
        status: currentStatus.id,
        businessEntityId: businessEntity.id
      })
    )
    setBlock(false)
  }, [dispatch, store.data.length, sort, sortColumn, currentPage])

  // ** Function in get data on page change
  const handlePagination = async page => {
    setBlock(true)
    await dispatch(
      getData({
        sort,
        sortColumn,
        q: searchTerm,
        perPage: rowsPerPage,
        page: page.selected + 1,
        status: currentStatus.id,
        businessEntityId: businessEntity.id
      })
    )
    setBlock(false)
    setCurrentPage(page.selected + 1)
  }

  // ** Function in get data on rows per page
  const handlePerPage = async e => {
    const value = parseInt(e.currentTarget.value)
    setBlock(true)
    await dispatch(
      getData({
        sort,
        sortColumn,
        q: searchTerm,
        perPage: value,
        page: currentPage,
        businessEntityId: businessEntity.id,
        status: currentStatus.id
      })
    )
    setBlock(false)
    setRowsPerPage(value)
  }

  // ** Function in get data on search query change
  const handleFilter = async val => {
    setSearchTerm(val)
    setBlock(true)
    await dispatch(
      getData({
        sort,
        q: val,
        sortColumn,
        page: currentPage,
        perPage: rowsPerPage,
        status: currentStatus.id,
        businessEntityId: businessEntity.id
      })
    )
    setBlock(false)
  }

  // ** Custom Pagination
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

  // ** Table data to render
  const dataToRender = () => {
    const filters = {
      businessEntityId: businessEntity.id,
      status: currentStatus.id,
      q: searchTerm
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
        sort,
        sortColumn,
        q: searchTerm,
        page: currentPage,
        perPage: rowsPerPage,
        status: currentStatus.id,
        businessEntityId: businessEntity.id
      })
    )
  }

  return (
    <Fragment>
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
                      businessEntityId: businessEntity.id,
                      status: data.id
                    })
                  )
                  setBlock(false)
                }}
              />
            </Col>
            <Col className='my-md-0 my-1' md='4'>
              <Label for='plan-select'>Business Entity</Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className='react-select'
                classNamePrefix='select'
                options={businessEntityOptions}
                value={businessEntity}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                onChange={async data => {
                  setBusinessEntity(data)
                  setBlock(true)
                  await dispatch(
                    getData({
                      sort,
                      sortColumn,
                      q: searchTerm,
                      page: currentPage,
                      perPage: rowsPerPage,
                      businessEntityId: data.id,
                      status: currentStatus.id
                    })
                  )
                  setBlock(false)
                }}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card className='overflow-hidden'>
        <div className='react-dataTable'>
          <UILoader blocking={block} loader={<Loader />}>
            <DataTable
              noHeader
              subHeader
              sortServer
              pagination
              responsive
              selectableRows
              paginationServer
              columns={columns}
              onSort={handleSort}
              sortIcon={<ChevronDown />}
              className='react-dataTable'
              paginationComponent={CustomPagination}
              data={dataToRender()}
              selectableRowsComponent={BootstrapCheckbox}
              subHeaderComponent={
                <CustomHeader
                  store={store}
                  searchTerm={searchTerm}
                  rowsPerPage={rowsPerPage}
                  handleFilter={handleFilter}
                  handlePerPage={handlePerPage}
                />
              }
            />
          </UILoader>
        </div>
      </Card>

    </Fragment>
  )
}

export default UsersList
