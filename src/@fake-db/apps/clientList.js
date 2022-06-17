import mock from '../mock'

// ** Utils
import { paginateArray } from '../utils'

const data = {
  users: [
    {
      id: 1,
      name: 'Manual - Credit Card',
      businessName: 'Galen Slixby',
      contactNo: '(479) 232-9151',
      email: 'gslixby0@abc.net.au',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 2,
      name: 'Manual - Credit Card',
      businessName: 'Galen Slixby',
      contactNo: '(479) 232-9151',
      email: 'gslixby0@abc.net.au',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 3,
      name: 'Manual - Credit Card',
      businessName: 'Galen Slixby',
      contactNo: '(479) 232-9151',
      email: 'gslixby0@abc.net.au',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 4,
      name: 'Manual - Credit Card',
      businessName: 'Galen Slixby',
      contactNo: '(479) 232-9151',
      email: 'gslixby0@abc.net.au',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 5,
      name: 'Manual - Credit Card',
      businessName: 'Galen Slixby',
      contactNo: '(479) 232-9151',
      email: 'gslixby0@abc.net.au',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 6,
      name: 'Manual - Credit Card',
      businessName: 'Galen Slixby',
      contactNo: '(479) 232-9151',
      email: 'gslixby0@abc.net.au',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 7,
      name: 'Manual - Credit Card',
      businessName: 'Galen Slixby',
      contactNo: '(479) 232-9151',
      email: 'gslixby0@abc.net.au',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 8,
      name: 'Manual - Credit Card',
      businessName: 'Galen Slixby',
      contactNo: '(479) 232-9151',
      email: 'gslixby0@abc.net.au',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 9,
      name: 'Manual - Credit Card',
      businessName: 'Galen Slixby',
      contactNo: '(479) 232-9151',
      email: 'gslixby0@abc.net.au',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 10,
      name: 'Manual - Credit Card',
      businessName: 'Galen Slixby',
      contactNo: '(479) 232-9151',
      email: 'gslixby0@abc.net.au',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 11,
      name: 'Manual - Credit Card',
      businessName: 'Galen Slixby',
      contactNo: '(479) 232-9151',
      email: 'gslixby0@abc.net.au',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 12,
      name: 'Manual - Credit Card',
      businessName: 'Galen Slixby',
      contactNo: '(479) 232-9151',
      email: 'gslixby0@abc.net.au',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 13,
      name: 'Manual - Credit Card',
      businessName: 'Galen Slixby',
      contactNo: '(479) 232-9151',
      email: 'gslixby0@abc.net.au',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 14,
      name: 'Manual - Credit Card',
      businessName: 'Galen Slixby',
      contactNo: '(479) 232-9151',
      email: 'gslixby0@abc.net.au',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 15,
      name: 'Manual - Credit Card',
      businessName: 'Galen Slixby',
      contactNo: '(479) 232-9151',
      email: 'gslixby0@abc.net.au',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 16,
      name: 'Manual - Credit Card',
      businessName: 'Galen Slixby',
      contactNo: '(479) 232-9151',
      email: 'gslixby0@abc.net.au',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 17,
      name: 'Manual - Credit Card',
      businessName: 'Galen Slixby',
      contactNo: '(479) 232-9151',
      email: 'gslixby0@abc.net.au',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 18,
      name: 'Manual - Credit Card',
      businessName: 'Galen Slixby',
      contactNo: '(479) 232-9151',
      email: 'gslixby0@abc.net.au',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 19,
      name: 'Manual - Credit Card',
      businessName: 'Galen Slixby',
      contactNo: '(479) 232-9151',
      email: 'gslixby0@abc.net.au',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 20,
      name: 'Manual - Credit Card',
      businessName: 'Galen Slixby',
      contactNo: '(479) 232-9151',
      email: 'gslixby0@abc.net.au',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 21,
      name: 'Manual - Credit Card',
      businessName: 'Galen Slixby',
      contactNo: '(479) 232-9151',
      email: 'gslixby0@abc.net.au',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 22,
      name: 'Manual - Credit Card',
      businessName: 'Galen Slixby',
      contactNo: '(479) 232-9151',
      email: 'gslixby0@abc.net.au',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 23,
      name: 'Manual - Credit Card',
      businessName: 'Galen Slixby',
      contactNo: '(479) 232-9151',
      email: 'gslixby0@abc.net.au',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 24,
      name: 'Manual - Credit Card',
      businessName: 'Galen Slixby',
      contactNo: '(479) 232-9151',
      email: 'gslixby0@abc.net.au',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 25,
      name: 'Manual - Credit Card',
      businessName: 'Galen Slixby',
      contactNo: '(479) 232-9151',
      email: 'gslixby0@abc.net.au',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 26,
      name: 'Manual - Credit Card',
      businessName: 'Galen Slixby',
      contactNo: '(479) 232-9151',
      email: 'gslixby0@abc.net.au',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 27,
      name: 'Manual - Credit Card',
      businessName: 'Galen Slixby',
      contactNo: '(479) 232-9151',
      email: 'gslixby0@abc.net.au',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 28,
      name: 'Manual - Credit Card',
      businessName: 'Galen Slixby',
      contactNo: '(479) 232-9151',
      email: 'gslixby0@abc.net.au',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 29,
      name: 'Manual - Credit Card',
      businessName: 'Galen Slixby',
      contactNo: '(479) 232-9151',
      email: 'gslixby0@abc.net.au',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    }
  ]
}

// GET ALL DATA
mock.onGet('/api/client/list/all-data').reply(200, data.users)

// POST: Add new user
mock.onPost('/apps/client/add-user').reply(config => {
  // Get event from post data
  const user = JSON.parse(config.data)
  const highestValue = data.users.reduce((a, b) => (a.id > b.id ? a : b)).id

  user.id = highestValue + 1

  data.users.push(user)

  return [201, { user }]
})

// GET Updated DATA
mock.onGet('/api/client/list/data').reply(config => {
  const {
    q = '',
    page = 1,
    role = null,
    perPage = 10,
    sort = 'asc',
    status = null,
    currentPlan = null,
    sortColumn = 'fullName'
  } = config

  /* eslint-disable  */
  const queryLowered = q.toLowerCase()

  const dataAsc = data.users.sort((a, b) => (a[sortColumn] < b[sortColumn] ? -1 : 1))

  const dataToFilter = sort === 'asc' ? dataAsc : dataAsc.reverse()

  const filteredData = dataToFilter.filter(
    user =>
      (user.email.toLowerCase().includes(queryLowered) ||
        user.fullName.toLowerCase().includes(queryLowered) ||
        user.billing.toLowerCase().includes(queryLowered)) &&
      user.role === (role || user.role) &&
      user.currentPlan === (currentPlan || user.currentPlan) &&
      user.status === (status || user.status)
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
mock.onGet('/api/client').reply(config => {
  const { id } = config
  const user = data.users.find(i => i.id === id)
  return [200, { user }]
})

// DELETE: Deletes User
mock.onDelete('/apps/client/delete').reply(config => {
  // Get user id from URL
  let userId = config.id

  // Convert Id to number
  userId = Number(userId)

  const userIndex = data.users.findIndex(t => t.id === userId)
  data.users.splice(userIndex, 1)

  return [200]
})
