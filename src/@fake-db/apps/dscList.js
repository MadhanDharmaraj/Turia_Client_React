import mock from '../mock'

// ** Utils
import { paginateArray } from '../utils'

const data = {
  digitalsignatures: [
    {
      id: 1,
      uniqueId : '#DSC00001',
      client: 'Manual - Credit Card',
      email: 'gslixby0@abc.net.au',
      issuedDate: '01-Jun 2022',
      expiryDate: '31-Jul 2022',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 2,
      uniqueId : '#DSC00002',
      client: 'Manual - Credit Card',
      email: 'gslixby0@abc.net.au',
      issuedDate: '01-Jun 2022',
      expiryDate: '31-Jul 2022',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 3,
      uniqueId : '#DSC00003',
      client: 'Manual - Credit Card',
      email: 'gslixby0@abc.net.au',
      issuedDate: '01-Jun 2022',
      expiryDate: '31-Jul 2022',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 4,
      uniqueId : '#DSC00004',
      client: 'Manual - Credit Card',
      email: 'gslixby0@abc.net.au',
      issuedDate: '01-Jun 2022',
      expiryDate: '31-Jul 2022',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 5,
      uniqueId : '#DSC00005',
      client: 'Manual - Credit Card',
      email: 'gslixby0@abc.net.au',
      issuedDate: '01-Jun 2022',
      expiryDate: '31-Jul 2022',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 6,
      uniqueId : '#DSC00006',
      client: 'Manual - Credit Card',
      email: 'gslixby0@abc.net.au',
      issuedDate: '01-Jun 2022',
      expiryDate: '31-Jul 2022',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 7,
      uniqueId : '#DSC00007',
      client: 'Manual - Credit Card',
      email: 'gslixby0@abc.net.au',
      issuedDate: '01-Jun 2022',
      expiryDate: '31-Jul 2022',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 8,
      uniqueId : '#DSC00008',
      client: 'Manual - Credit Card',
      email: 'gslixby0@abc.net.au',
      issuedDate: '01-Jun 2022',
      expiryDate: '31-Jul 2022',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 9,
      uniqueId : '#DSC00009',
      client: 'Manual - Credit Card',
      email: 'gslixby0@abc.net.au',
      issuedDate: '01-Jun 2022',
      expiryDate: '31-Jul 2022',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 10,
      uniqueId : '#DSC00010',
      client: 'Manual - Credit Card',
      email: 'gslixby0@abc.net.au',
      issuedDate: '01-Jun 2022',
      expiryDate: '31-Jul 2022',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 11,
      uniqueId : '#DSC00011',
      client: 'Manual - Credit Card',
      email: 'gslixby0@abc.net.au',
      issuedDate: '01-Jun 2022',
      expiryDate: '31-Jul 2022',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 12,
      uniqueId : '#DSC00012',
      client: 'Manual - Credit Card',
      email: 'gslixby0@abc.net.au',
      issuedDate: '01-Jun 2022',
      expiryDate: '31-Jul 2022',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 13,
      uniqueId : '#DSC00013',
      client: 'Manual - Credit Card',
      email: 'gslixby0@abc.net.au',
      issuedDate: '01-Jun 2022',
      expiryDate: '31-Jul 2022',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 14,
      uniqueId : '#DSC00014',
      client: 'Manual - Credit Card',
      email: 'gslixby0@abc.net.au',
      issuedDate: '01-Jun 2022',
      expiryDate: '31-Jul 2022',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 15,
      uniqueId : '#DSC00015',
      client: 'Manual - Credit Card',
      email: 'gslixby0@abc.net.au',
      issuedDate: '01-Jun 2022',
      expiryDate: '31-Jul 2022',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 16,
      uniqueId : '#DSC00016',
      client: 'Manual - Credit Card',
      email: 'gslixby0@abc.net.au',
      issuedDate: '01-Jun 2022',
      expiryDate: '31-Jul 2022',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    }
  ]
}

// GET ALL DATA
mock.onGet('/digital-signature/list').reply(200, data)

// POST: Add new user
mock.onPost('/apps/digital-signature/add-user').reply(config => {
  // Get event from post data
  const user = JSON.parse(config.data)
  const highestValue = data.users.reduce((a, b) => (a.id > b.id ? a : b)).id

  user.id = highestValue + 1

  data.users.push(user)

  return [201, { user }]
})

// GET Updated DATA
mock.onGet('/api/digital-signature/list/data').reply(config => {
  const {
    q = '',
    page = 1,
    role = null,
    perPage = 10,
    sort = 'asc',
    status = null,
    currentPlan = null,
    sortColumn = 'name'
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
mock.onGet('/api/digital-signature').reply(config => {
  const { id } = config
  const user = data.users.find(i => i.id === id)
  return [200, { user }]
})

// DELETE: Deletes User
mock.onDelete('/apps/digital-signature/delete').reply(config => {
  // Get user id from URL
  let userId = config.id

  // Convert Id to number
  userId = Number(userId)

  const userIndex = data.users.findIndex(t => t.id === userId)
  data.users.splice(userIndex, 1)

  return [200]
})
