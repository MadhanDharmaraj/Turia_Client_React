// ** React Imports
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

// ** Third Party Components
import axios from '@src/configs/axios/axiosConfig'
// ** Reactstrap Imports
import { Row, Col, Alert, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap'

// ** Invoice Preview Components
import PreviewCard from './PreviewCard'
import PreviewActions from './PreviewActions'
import InvoicePayments from './InvoicePayment/index'
import AddPayment from './InvoicePayment/AddPayment'
import SendInvoiceSidebar from '../shared-sidebar/SidebarSendInvoice'

// ** Styles
import '@styles/base/pages/app-invoice.scss'
import { User, Lock } from 'react-feather'

const InvoicePreview = () => {
  // ** HooksVars
  const { id } = useParams()

  // ** States
  const [sendSidebarOpen, setSendSidebarOpen] = useState(false)
  const [addPaymentOpen, setAddPaymentOpen] = useState(false)
  const [data, setData] = useState(null)
  const [active, setActive] = useState('1')
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

  const toggleTab = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }

  // ** Get invoice on mount based on id

  return data !== null && data !== undefined ? (
    <div className='invoice-preview-wrapper'>
      <Row className='invoice-preview'>
        <Col xl={10} md={8} sm={12}>

          <Nav pills className='mb-2'>
            <NavItem>
              <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
                <User className='font-medium-3 me-50' />
                <span className='fw-bold'>Invoice</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
                <Lock className='font-medium-3 me-50' />
                <span className='fw-bold'>Payments</span>
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={active}>
            <TabPane tabId='1'>
              <PreviewCard data={data} tabId={active} />
            </TabPane>
            <TabPane tabId='2'>
              <InvoicePayments data={data}  tabId={active}/>
            </TabPane>
          </TabContent>

        </Col>
        <Col xl={2} md={4} sm={12}>
          <PreviewActions id={id} setSendSidebarOpen={setSendSidebarOpen} setAddPaymentOpen={setAddPaymentOpen} />
        </Col>
      </Row>
      <SendInvoiceSidebar toggleSidebar={toggleSendSidebar} open={sendSidebarOpen} />
      <AddPayment toggleSidebar={toggleAddSidebar} open={addPaymentOpen}  data={data}/>
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
