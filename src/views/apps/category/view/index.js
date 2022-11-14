// ** React Imports
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

// ** Store & Actions
import { getCategory } from '../store'
import { useSelector, useDispatch } from 'react-redux'

// ** Reactstrap Imports
import { Row, Col, Alert } from 'reactstrap'

// ** User View Components
import UserTabs from './Tabs'
import UserInfoCard from './UserInfoCard'

// ** Styles
import '@styles/react/apps/app-users.scss'

const CategoryView = () => {
  // ** Store Vars
  const store = useSelector(state => state.service)
  const dispatch = useDispatch()

  // ** Hooks
  const { id } = useParams()

  // ** Get suer on mount
  useEffect(() => {
    dispatch(getCategory(parseInt(id)))
  }, [dispatch])

  const [active, setActive] = useState('1')

  const toggleTab = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }

  return store.selectedCategory !== null && store.selectedCategory !== undefined ? (
    <div className='app-user-view'>
      <Row>
        <Col xl='4' lg='5' xs={{ order: 0 }} md={{ order: 0, size: 5 }} sm={{ order: 0 }}>
          <UserInfoCard selectedCategory={store.selectedCategory} />
        </Col>
        <Col xl='8' lg='7' xs={{ order: 1 }} md={{ order: 1, size: 7 }} sm={{ order: 1 }}>
          <UserTabs active={active} toggleTab={toggleTab} />
        </Col>
      </Row>
    </div>
  ) : (
    <Alert color='danger'>
      <h4 className='alert-heading'>Category not found</h4>
      <div className='alert-body'>
        Category with id: {id} doesn't exist. Check list of all Category: <Link to='/services/list'>Category List</Link>
      </div>
    </Alert>
  )
}
export default CategoryView
