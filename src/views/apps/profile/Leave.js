// ** React Imports
import { useState, useEffect } from 'react'
import { Controller, useForm } from "react-hook-form"
// ** Table Columns
import { columns } from './columns'
import classnames from 'classnames'
import Select from 'react-select'
import Flatpickr from 'react-flatpickr'
import axios from '@src/configs/axios/axiosConfig'
// ** Third Party Componentss
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

import DataTable from 'react-data-table-component'
import { ChevronDown, ExternalLink, Printer, FileText, File, Clipboard, Copy } from 'react-feather'
import { Card, CardHeader, DropdownMenu, DropdownItem, DropdownToggle, UncontrolledButtonDropdown, Label, Button, Input, FormFeedback, Modal, ModalHeader, ModalBody, ModalFooter, Form, Row, Col } from 'reactstrap'

// ** Store & Actions
import { leaveList, applyLeave } from './store/index'
import { useDispatch, useSelector } from 'react-redux'

// ** Styles
import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import 'react-slidedown/lib/slidedown.css'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { activeOrganizationid, orgUserId, desId } from '@src/helper/sassHelper'
import moment from 'moment'
import { useParams } from 'react-router-dom'

const activeOrgId = activeOrganizationid()
const userId = orgUserId()
const designationId = desId()
const Leave = (data) => {
  // ** Store Vars
  const [leaveTypeOptions, setLeaveTypeOptions] = useState([])
  const dispatch = useDispatch()
  const store = useSelector(state => state.profile)
  // ** States
  const [value] = useState('')
  const [rowsPerPage] = useState(6)
  const { id } = useParams()
  const [currentPage] = useState(1)
  const [statusValue] = useState('')
  const [sort, setSort] = useState('desc')
  const [sortColumn, setSortColumn] = useState('id')

  const schema = yup.object().shape({
    organizationId: yup.string().default(activeOrgId),
    createdBy: yup.string().default(userId),
    leaveTypeId: yup.string().required("Please Select LeaveType"),
    fromDate: yup.string().required('Please Enter From Date'),
    duration: yup.string().default(1),
    daysCount: yup.string().default(1),
    toDate: yup.string().required('Please Enter From Date'),
    userId: yup.string().default(userId),
    reason: yup.string().required('Please Enter Reason'),
    status: yup.string().default(1)
  })

  const getLeaveType = () => {
    axios.post('/leavetypes/list', { designationId }).then(response => {
      const arr = response.data
      setLeaveTypeOptions(arr.leavetypes)
    })
  }

  const { handleSubmit, control, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: schema.cast()
  })
  const [formModal, setFormModal] = useState(false)
  const closeModal = () => {
    setFormModal(false)
  }

  const onSubmit = async (data) => {

    if (data.duration === 2) {
      const start = moment(data.fromDate, "DD/MM/YYYY")
      const end = moment(data.toDate, "DD/MM/YYYY")
      const duration = moment.duration(start.diff(end))
      setValue('daysCount', duration)
    }

    await dispatch(applyLeave(data))
    setFormModal(false)
    reset({ name: '', organizationId: activeOrgId, fromDate: '', toDate: "", userId: "", reason: '', status: 1, leaveTypeId: '' })
  }

  useEffect(() => {

    if (data.tabId === 'leaves') {
      dispatch(
        leaveList({
          sort,
          q: value,
          sortColumn,
          page: currentPage,
          perPage: rowsPerPage,
          status: statusValue,
          userId: id
        })
      )
      getLeaveType()
    }
  }, [dispatch, store.employeeLeaves.length, data.tabId])

  const dataToRender = () => {
    const filters = {
      status: statusValue,
      userId: id,
      q: value
    }

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0
    })

    if (store.employeeLeaves.length > 0) {
      return store.employeeLeaves.slice(0, rowsPerPage)
    } else if (store.employeeLeaves.length === 0 && isFiltered) {
      return []
    }
  }

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection)
    setSortColumn(column.sortField)
    dispatch(
      leaveList({
        q: value,
        page: currentPage,
        sort: sortDirection,
        userId: id,
        status: statusValue,
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
          <Button color='primary' outline onClick={() => setFormModal(true)}>Apply Leave</Button>
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

        <Modal isOpen={formModal} toggle={() => setFormModal(!formModal)} className='modal-dialog-centered'>
          <ModalHeader toggle={() => closeModal()}>Apply Leave</ModalHeader>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <div className='mb-0'>
                <Label sm='3' size='lg' className='form-label required' for='leaveTypeId'>
                  Leave Type
                </Label>

                <Controller
                  control={control}
                  name="leaveTypeId"
                  id="leaveTypeId"
                  render={({ field, value, ref }) => (
                    <Select
                      {...field}
                      inputRef={ref}
                      className={classnames('react-select', { 'is-invalid': errors.leaveTypeId })}
                      {...field}
                      classNamePrefix='select'
                      options={leaveTypeOptions}
                      value={leaveTypeOptions.find(c => { return c.id === value })}
                      onChange={val => { field.onChange(val.id) }}
                      getOptionLabel={(option) => option.name}
                      getOptionValue={(option) => option.id}
                    />
                  )}

                />
                {errors.leaveTypeId && <FormFeedback className='text-danger'>{errors.leaveTypeId?.message}</FormFeedback>}
              </div>
              <div className='mb-0'>
                <Label sm='3' size='lg' className='form-label required' for='name'>
                  Duration
                </Label>
                <Row>
                  <Controller
                    name='duration'
                    id='duration_1'
                    control={control}
                    render={({ field }) => (<Col><Input name='duration' id='duration_1' type='radio'
                      {...field} onInput={val => { return val.target.value }} value={1} />
                      <Label for="duration_1" className='ms-1'>Single</Label></Col>)}
                  />

                  <Controller
                    name='duration'
                    id='duration_2'
                    control={control}
                    render={({ field }) => (<Col><Input name='duration' id='duration_2' type='radio'
                      {...field} onInput={val => { return val.target.value }} value={2} />
                      <Label for="duration_2" className='ms-1'>Multiple</Label></Col>)}
                  />

                  <Controller
                    name='duration'
                    id='duration_3'
                    control={control}
                    render={({ field }) => (<Col><Input name='duration' id='duration_3' type='radio'
                      {...field} onInput={val => { return val.target.value }} value={3} />
                      <Label for="duration_3" className='ms-1'>Half Day</Label></Col>)}
                  />
                </Row>
              </div>
              <div className='mb-0'>
                <Label sm='3' size='lg' className='form-label required' for='fromDate'>
                  From
                </Label>

                <Controller
                  control={control}
                  id='fromDate'
                  name={`fromDate`}
                  render={({ field }) => (
                    <Flatpickr
                      value={field.value}
                      onChange={(date, dateStr) => { field.onChange(dateStr) }}
                      options={{ altInput: true, altFormat: "F j, Y", dateFormat: "U" }}
                      className='form-control invoice-edit-input date-picker'
                    />
                  )}
                />
                {errors.fromDate && <FormFeedback>{errors.fromDate.message}</FormFeedback>}
              </div>

              <div className='mb-0'>
                <Label sm='3' size='lg' className='form-label required' for='toDate'>
                  To
                </Label>
                <Controller
                  control={control}
                  id='toDate'
                  name={`toDate`}
                  render={({ field }) => (
                    <Flatpickr
                      value={field.value}
                      onChange={(date, dateStr) => { field.onChange(dateStr) }}
                      options={{ altInput: true, altFormat: "F j, Y", dateFormat: "U" }}
                      className='form-control invoice-edit-input date-picker'
                    />
                  )}
                />
                {errors.toDate && <FormFeedback>{errors.toDate.message}</FormFeedback>}
              </div>

              <div className='mb-0'>
                <Label sm='3' size='lg' className='form-label required' for='reason'>
                  Reason
                </Label>

                <Controller
                  id='reason'
                  name='reason'
                  control={control}
                  render={({ field }) => <Input type="textarea" invalid={errors.reason && true} {...field} />}
                />
                {errors.reason && <FormFeedback>{errors.reason.message}</FormFeedback>}
              </div>


            </ModalBody>
            <ModalFooter>
              <Button type="submit" color='warning' onClick={() => closeModal()}>
                Cancel
              </Button>
              <Button color='primary' type='submit' >
                Save
              </Button>
            </ModalFooter>
          </Form>
        </Modal >

      </Card>
    </div>
  )
}

export default Leave
