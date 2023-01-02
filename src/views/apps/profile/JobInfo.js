// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Row, Col } from 'reactstrap'

const JobInfo = () => {
  return (
    <Card>
      <CardBody>
        <dl>
          <Row>
            <Col sm='3'>
              <dt>Job Title</dt>
            </Col>
            <Col sm='9'>
              <dd>A description list is perfect for defining terms.</dd>
            </Col>
          </Row>
        </dl>
        <dl>
          <Row>
            <Col sm='3'>
              <dt>Date of Hire</dt>
            </Col>
            <Col sm='9'>
              <dd>Vestibulum id ligula porta felis euismod semper eget lacinia odio sem nec elit.</dd>
            </Col>
          </Row>
        </dl>
        <dl>
          <Row>
            <Col sm='3'>
              <dt>Salary</dt>
            </Col>
            <Col sm='9'>
              <dd>Etiam porta sem malesuada magna mollis euismod.</dd>
            </Col>
          </Row>
        </dl>
        <dl>
          <Row>
            <Col sm='3'>
              <dt>Hourly Rate</dt>
            </Col>
            <Col sm='9'>
              <dd>Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc</dd>
            </Col>
          </Row>
        </dl>
      </CardBody>
    </Card>
  )
}
export default JobInfo
