// ** Reactstrap Imports
//import moment from 'moment'
import { useEffect, useState, forwardRef } from 'react'
//import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Card, CardBody, Input } from 'reactstrap'
import { getData } from './store/index'

import { columns } from './columns'
// ** Custom Components
import DataTable from 'react-data-table-component'
import { useDispatch, useSelector } from 'react-redux'

const InvoicePayments = ({ data, tabId }) => {

  const { id } = useParams()
  const dispatch = useDispatch()
  const store = useSelector(state => state.invoicepayment)
  const [payments, setPayments] = useState([])

  useEffect(async () => {
    if (tabId === '2' && id) {
      await dispatch(getData({ invoiceId: id }))
    }
  }, [tabId])

  useEffect(() => {
    setPayments(store.invoicePayments)
  }, [store.invoicePayments])

  const BootstrapCheckbox = forwardRef((props, ref) => (
    <div className='form-check'>
      <Input type='checkbox' ref={ref} {...props} />
    </div>
  ))


  return data !== null ? (
    <Card className='invoice-preview-card'>
      <CardBody className='invoice-padding pb-0'>
        <div className='invoice-list-dataTable react-dataTable'>
          <DataTable
            sortServer
            paginationServer            
            columns={columns}
            responsive={true}
            selectableRows
            data={payments}
            className='react-dataTable'
            defaultSortField='invoiceId'
            selectableRowsComponent={BootstrapCheckbox}
          />
        </div>
      </CardBody>
    </Card>
  ) : null
}

export default InvoicePayments
