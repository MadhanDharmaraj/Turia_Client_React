// ** React Imports
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

// ** Reactstrap Imports
import { Card, CardBody, Button, Input } from 'reactstrap'

const AddActions = () => {
  return (
    <Fragment>
      <Card>
        <CardBody>
          <Button color='warning' outline>
            Cancel
          </Button>
          <Button color='primary' type="submit" >
            Save
          </Button>
        </CardBody>
      </Card>
    </Fragment>
  )
}

export default AddActions
