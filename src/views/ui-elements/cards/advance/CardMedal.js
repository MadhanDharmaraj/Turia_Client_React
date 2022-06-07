// ** Reactstrap Imports
import { Card, CardBody, CardText, Button, Row, Col } from 'reactstrap'

// ** Images
//import medal from '@src/assets/images/illustration/badge.svg'
import { LogIn, LogOut } from 'react-feather'

// ** Custom Components
import Avatar from '@components/avatar'


const CardMedal = () => {

  const item_login = {
    color: 'light-success',
    icon: <LogIn size={24} />
  }

  const item_logout = {
    color: 'light-danger',
    icon: <LogOut size={24} />
  }

  return (
    <Card className='card-congratulations-medal'>
      <CardBody className='flex'>
        <h5>Welcome 🎉 John!</h5>

        <Button color='success'>Punch In</Button>
        {/* <img className='congratulation-medal' src={medal} alt='Medal Pic' /> */}

        <Row className='mt-2'>
          <Col className='d-flex align-items-center' sm={12} lg={6}>
            <Avatar color={item_login.color} icon={item_login.icon} className='me-2 p-1' />
            <Col>
              <h6 className='fw-bolder mb-0'>Punch In</h6>
              <CardText className='font-small-3 mb-0'>00:00:00</CardText>
            </Col>  
          </Col>
          <Col className='d-flex align-items-center' sm={12} lg={6}> 
            <Avatar color={item_logout.color} icon={item_logout.icon} className='me-2 p-1' />
            <Col> 
              <h6 className='fw-bolder mb-0'>Punch Out</h6> 
              <CardText className='font-small-3 mb-0'>00:00:00</CardText> 
            </Col>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

export default CardMedal
