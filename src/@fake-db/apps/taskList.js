import mock from '../mock'

// ** Utils
import { paginateArray } from '../utils'

const data = {
  tasks: [
    {
      id: 1,
      task_id : '#TSK00001',
      client: 'Manual - Credit Card',
      task: 'Galen Slixby',
      priority: 'Medium',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 2,
      task_id : '#TSK00002',
      client: 'Manual - Credit Card',
      task: 'Galen Slixby',
      priority: 'Medium',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 3,
      task_id : '#TSK00003',
      client: 'Manual - Credit Card',
      task: 'Galen Slixby',
      priority: 'Medium',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 4,
      task_id : '#TSK00004',
      client: 'Manual - Credit Card',
      task: 'Galen Slixby',
      priority: 'Medium',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 5,
      task_id : '#TSK00005',
      client: 'Manual - Credit Card',
      task: 'Galen Slixby',
      priority: 'Medium',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 6,
      task_id : '#TSK00006',
      client: 'Manual - Credit Card',
      task: 'Galen Slixby',
      priority: 'Medium',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 7,
      task_id : '#TSK00007',
      client: 'Manual - Credit Card',
      task: 'Galen Slixby',
      priority: 'Medium',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 8,
      task_id : '#TSK00008',
      client: 'Manual - Credit Card',
      task: 'Galen Slixby',
      priority: 'Medium',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 9,
      task_id : '#TSK00009',
      client: 'Manual - Credit Card',
      task: 'Galen Slixby',
      priority: 'Medium',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 10,
      task_id : '#TSK00010',
      client: 'Manual - Credit Card',
      task: 'Galen Slixby',
      priority: 'Medium',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 11,
      task_id : '#TSK00011',
      client: 'Manual - Credit Card',
      task: 'Galen Slixby',
      priority: 'Medium',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 12,
      task_id : '#TSK00012',
      client: 'Manual - Credit Card',
      task: 'Galen Slixby',
      priority: 'Medium',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 13,
      task_id : '#TSK00013',
      client: 'Manual - Credit Card',
      task: 'Galen Slixby',
      priority: 'Medium',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 14,
      task_id : '#TSK00014',
      client: 'Manual - Credit Card',
      task: 'Galen Slixby',
      priority: 'Medium',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 15,
      task_id : '#TSK00015',
      client: 'Manual - Credit Card',
      task: 'Galen Slixby',
      priority: 'Medium',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 16,
      task_id : '#TSK00016',
      client: 'Manual - Credit Card',
      task: 'Galen Slixby',
      priority: 'Medium',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    }
  ]
}

// GET ALL DATA
mock.onGet('/api/task/list/all-data').reply(200, data.tasks)

// POST: Add new user
mock.onPost('/apps/task/add-user').reply(config => {
  // Get event from post data
  const user = JSON.parse(config.data)
  const highestValue = data.tasks.reduce((a, b) => (a.id > b.id ? a : b)).id

  user.id = highestValue + 1

  data.tasks.push(user)

  return [201, { user }]
})

// GET Updated DATA
mock.onGet('/api/task/list/data').reply(config => {
  const {
    q = '',
    page = 1,
    perPage = 10,
    sort = 'asc',
    status = null,
    sortColumn = 'name'
  } = config

  /* eslint-disable  */
  const queryLowered = q.toLowerCase()

  const dataAsc = data.tasks.sort((a, b) => (a[sortColumn] < b[sortColumn] ? -1 : 1))

  const dataToFilter = sort === 'asc' ? dataAsc : dataAsc.reverse()

  const filteredData = dataToFilter.filter(
    user => user.status === (status || user.status)
  )
  /* eslint-enable  */

  return [
    200,
    {
      total: filteredData.length,
      users: paginateArray(filteredData, perPage, page)
    }
  ]
})

// GET USER
mock.onGet('/api/task').reply(config => {
  const { id } = config
  const user = data.tasks.find(i => i.id === id)
  return [200, { user }]
})

// DELETE: Deletes User
mock.onDelete('/apps/task/delete').reply(config => {
  // Get user id from URL
  let userId = config.id

  // Convert Id to number
  userId = Number(userId)

  const userIndex = data.tasks.findIndex(t => t.id === userId)
  data.tasks.splice(userIndex, 1)

  return [200]
})
