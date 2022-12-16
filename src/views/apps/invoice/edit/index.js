// ** React Imports
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

// ** Third Party Components
import axios from '@src/configs/axios/axiosConfig'

// ** Reactstrap Imports
import { Alert, Row, Col } from 'reactstrap'

// ** Invoice Edit Components
import EditCard from './EditCard'

const InvoiceEdit = () => {
  // ** Hooks
  const { id } = useParams()

  // ** States
  const [data, setData] = useState(null)

  // ** Get invoice on mount based on id
  const getInvoice = async () => {
    axios.post('/taskinvoices/get', { id }).then((res) => {
      setData(res.data.taskinvoices)
    }).catch((err) => { console.log(err) })

  }

  useEffect(() => {
    getInvoice()
  }, [])

  return data !== null && data !== undefined ? (
    <div className='invoice-edit-wrapper'>
      <Row className='invoice-edit'>
        <Col xl={12} md={8} sm={12}>
          <EditCard data={data} />
        </Col>
      </Row>
    </div>
  ) : (
    <Alert color='danger'>
      <h4 className='alert-heading'>Invoice not found</h4>
      <div className='alert-body'>
        Invoice with id: {id} doesn't exist. Check list of all invoices:{' '}
        <Link to='/apps/invoice/list'>Invoice List</Link>
      </div>
    </Alert>
  )
}

export default InvoiceEdit
