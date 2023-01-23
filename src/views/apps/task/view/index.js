// ** React Imports
import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

// ** Store & Actions
import { getTask } from '../store'
import { useSelector, useDispatch } from 'react-redux'

// ** Reactstrap Imports
import { Row, Col, Alert } from 'reactstrap'

// ** User View Components
import UserInfoCard from './UserInfoCard'

// ** Styles
import '@styles/react/apps/app-users.scss'

const TaskView = () => {
  // ** Store Vars
  const store = useSelector(state => state.task)
  const dispatch = useDispatch()

  // ** Hooks
  const { id } = useParams()

  // ** Get suer on mount
  useEffect(() => {
    dispatch(getTask(parseInt(id)))
  }, [dispatch])


  return store.selectedTask !== null && store.selectedTask !== undefined ? (
    <div className='app-user-view'>
      <Row>
        <Col xl='12' lg='12' >
          <UserInfoCard selectedTask={store.selectedTask} />
        </Col>
      </Row>
    </div>
  ) : (
    <Alert color='danger'>
      <h4 className='alert-heading'>Task not found</h4>
      <div className='alert-body'>
        Task with id: {id} doesn't exist. Check list of all Tasks: <Link to='/task/list'>Tasks List</Link>
      </div>
    </Alert>
  )
}
export default TaskView
