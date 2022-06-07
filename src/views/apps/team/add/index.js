// ** Invoice Add Components
import AddCard from './AddCard'

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/base/pages/app-invoice.scss'

const TeamAdd = () => {
  return (
    <div className='invoice-add-wrapper'>
      <Row className='invoice-add'>
        <Col xl={12} md={12} sm={12}>
          <AddCard />
        </Col>
      </Row>
    </div>
  )
}

export default TeamAdd
