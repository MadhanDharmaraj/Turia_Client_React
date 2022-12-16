// ** React Imports
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

// ** Third Party Components
import axios from '@src/configs/axios/axiosConfig'
// ** Reactstrap Imports
import { Row, Col, Alert } from 'reactstrap'

// ** Invoice Preview Components
import PreviewCard from './PreviewCard'
import PreviewActions from './PreviewActions'
import AddPaymentSidebar from '../shared-sidebar/SidebarAddPayment'
import SendInvoiceSidebar from '../shared-sidebar/SidebarSendInvoice'

// ** Styles
import '@styles/base/pages/app-invoice.scss'

const InvoicePreview = () => {
  // ** HooksVars
  const { id } = useParams()

  // ** States
  const [sendSidebarOpen, setSendSidebarOpen] = useState(false)
  const [addPaymentOpen, setAddPaymentOpen] = useState(false)
  const [data, setData] = useState(null)

  // ** Functions to toggle add & send sidebar
  const toggleSendSidebar = () => setSendSidebarOpen(!sendSidebarOpen)
  const toggleAddSidebar = () => setAddPaymentOpen(!addPaymentOpen)

  const getInvoice = async () => {
    axios.post('/taskinvoices/get', { id }).then((res) => {
      setData(res.data.taskinvoices)
    }).catch((err) => { console.log(err) })

  }

  useEffect(() => {
    getInvoice()
  }, [])

  // ** Get invoice on mount based on id

  return data !== null && data !== undefined ? (
    <div className='invoice-preview-wrapper'>
      <Row className='invoice-preview'>
        <Col xl={10} md={8} sm={12}>
          <PreviewCard data={data} />
        </Col>
        <Col xl={2} md={4} sm={12}>
          <PreviewActions id={id} setSendSidebarOpen={setSendSidebarOpen} setAddPaymentOpen={setAddPaymentOpen} />
        </Col>
      </Row>
      <SendInvoiceSidebar toggleSidebar={toggleSendSidebar} open={sendSidebarOpen} />
      <AddPaymentSidebar toggleSidebar={toggleAddSidebar} open={addPaymentOpen} />
    </div>
  ) : (
    <Alert color='danger'>
      <h4 className='alert-heading'>Invoice not found</h4>
      <div className='alert-body'>
        Invoice with id: {id} doesn't exist. Check list of all invoices:{' '}
        <Link to='/invoice/list'>Invoice List</Link>
      </div>
    </Alert>
  )
}

export default InvoicePreview
