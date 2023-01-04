// ** Reactstrap Imports
import { Card, CardBody, CardText, Button, Row, Col } from 'reactstrap'

// ** Images
//import medal from '@src/assets/images/illustration/badge.svg'
import { LogIn, LogOut } from 'react-feather'

// ** Custom Components
import { activeOrganizationid, orgUserId } from '@src/helper/sassHelper'
import Avatar from '@components/avatar'
import { punchIn, punchOut, getAttendance } from '../../../dashboard/ecommerce/store'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'

const activeOrgId = activeOrganizationid()
const userId = orgUserId()
const CardAttendance = () => {

  const dispatch = useDispatch()
  const store = useSelector(state => state.dashboard)
  const [loggedIn, setLoggedIn] = useState(false)
  const [data, setData] = useState(null)
  const [punchInTime, setPunchInTime] = useState(null)
  const [punchInTimeWithDate, setPunchInTimeWithDate] = useState(null)
  const [clockRunningTime, setClockRunningTime] = useState(null)
  const [punchOutTime, setPunchoutTime] = useState(null)

  const item_login = {
    color: 'light-success',
    icon: <LogIn size={24} />
  }

  const item_logout = {
    color: 'light-danger',
    icon: <LogOut size={24} />
  }

  const punchInfn = async () => {
    const data = {
      organizationId: activeOrgId,
      punchIn: moment().unix(),
      userId,
      createdBy : userId
    }
    await dispatch(punchIn(data))
  }

  const msToTime = (ms) => {

    let seconds = ms / 1000
    const hours = parseInt(seconds / 3600)
    seconds = seconds % 3600
    const minutes = parseInt(seconds / 60)
    seconds = seconds % 60
    return `${hours} Hrs : ${minutes} Mins`
  }

  const clockcounter = () => {
    if (punchInTimeWithDate !== undefined && punchInTimeWithDate !== null) {
      const now = moment()
      const ms = moment(now, "DD/MM/YYYY HH:mm:ss").diff(moment(punchInTimeWithDate, "DD/MM/YYYY HH:mm:ss"))
      setClockRunningTime(msToTime(ms))
    }
  }
  const punchoutfn = async () => {
    const datatemp = {
      organizationId: activeOrgId,
      punchOut: moment().unix(),
      userId,
      id: data.id,
      updatedBy : userId
    }
    await dispatch(punchOut(datatemp))

  }

  useEffect(() => {
    if (punchInTimeWithDate !== undefined && punchInTimeWithDate !== null) {
      const now = moment()
      const ms = moment(now, "DD/MM/YYYY HH:mm:ss").diff(moment(punchInTimeWithDate, "DD/MM/YYYY HH:mm:ss"))
      setClockRunningTime(msToTime(ms))
    }
  }, [punchInTimeWithDate])

  useEffect(() => {
    const temp = JSON.parse(localStorage.getItem('loggedIn'))
    if (temp === null) {
      setLoggedIn(false)
    } else {
      setLoggedIn(true)
      setPunchoutTime(temp.punchout)
      setData(temp)
      setPunchInTime(moment.unix(temp.punchin).format('h:m a'))
      const tempdate = moment.unix(temp.punchin).format('DD/MM/YYYY HH:mm:ss')
      setPunchInTimeWithDate(tempdate)
      if (temp.punchout) {
        setLoggedIn(false)
        setPunchoutTime(moment.unix(temp.punchout).format('h:m a'))
      }

    }

  }, [])

  useEffect(() => {
    if (Object.keys(store.data).length > 0) {
      setLoggedIn(true)
      const temp = store.data
      setData(temp)
      localStorage.setItem('loggedIn', JSON.stringify(temp))
      setPunchInTime(moment.unix(temp.punchin).format('h:m a'))
      setPunchInTimeWithDate(moment.unix(temp.punchin).format('DD/MM/YYYY HH:mm:ss'))
      if (temp.punchout) {
        setLoggedIn(false)
        setPunchoutTime(moment.unix(temp.punchout).format('h:m a'))
      }
      if (temp.punchout === null) {
        setInterval(() => {
          clockcounter()
        }, 1000)
      }

    } else {
      localStorage.removeItem('loggedIn')
      setData(null)
      setLoggedIn(false)
      setPunchoutTime(null)
      setPunchInTime(null)
      setPunchInTimeWithDate(null)
    }
  }, [store.data])

  useEffect(async () => {
    await dispatch(getAttendance({ userId }))
  }, [])

  return (
    <Card className='card-congratulations-medal'>
      <CardBody className='flex'>
        <h5>Welcome 🎉 John!</h5>
        {
          !loggedIn ? (<Button color='success' onClick={() => punchInfn()}>Punch In</Button>) : (<Button color='danger' onClick={() => punchoutfn()}>Punch Out</Button>)
        }

        <Row className='mt-2'>
          <Col className='d-flex align-items-center' sm={12} lg={6}>
            <Avatar color={item_login.color} icon={item_login.icon} className='me-2 p-1' />
            <Col>
              <h6 className='fw-bolder mb-0'>Punch In</h6>
              <CardText className='font-small-3 mb-0'>{punchInTime === null ? '00:00:00' : punchInTime}</CardText>
            </Col>
          </Col>
          <Col className='d-flex align-items-center' sm={12} lg={6}>
            <Avatar color={item_logout.color} icon={item_logout.icon} className='me-2 p-1' />
            <Col>
              <h6 className='fw-bolder mb-0'>Punch Out</h6>
              <CardText className='font-small-3 mb-0'>{punchOutTime === null ? clockRunningTime : punchOutTime}</CardText>
            </Col>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

export default CardAttendance
