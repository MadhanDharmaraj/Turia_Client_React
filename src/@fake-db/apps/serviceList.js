import mock from '../mock'

// ** Utils
import { paginateArray } from '../utils'

const data = {
  users: [
    {
      id: 1,
      name: 'Manual - Credit Card',
      category: 'Galen Slixby',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary',
      description: 'Galen Slixby',
      fee : '1200',
      taxRate :  'GST - 18%',
      exemptionReason : '',
      sacCode : '12345'
    },
    {
      id: 2,
      name: 'Manual - Credit Card',
      category: 'Galen Slixby',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary',
      description: 'Galen Slixby',
      fee : '1200',
      taxRate :  'GST - 18%',
      exemptionReason : '',
      sacCode : '12345'
    },
    {
      id: 3,
      name: 'Manual - Credit Card',
      category: 'Galen Slixby',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary',
      description: 'Galen Slixby',
      fee : '1200',
      taxRate :  'GST - 18%',
      exemptionReason : '',
      sacCode : '12345'
    },
    {
      id: 4,
      name: 'Manual - Credit Card',
      category: 'Galen Slixby',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary',
      description: 'Galen Slixby',
      fee : '1200',
      taxRate :  'GST - 18%',
      exemptionReason : '',
      sacCode : '12345'
    },
    {
      id: 5,
      name: 'Manual - Credit Card',
      category: 'Galen Slixby',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary',
      description: 'Galen Slixby',
      fee : '1200',
      taxRate :  'GST - 18%',
      exemptionReason : '',
      sacCode : '12345'
    },
    {
      id: 6,
      name: 'Manual - Credit Card',
      category: 'Galen Slixby',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary',
      description: 'Galen Slixby',
      fee : '1200',
      taxRate :  'GST - 18%',
      exemptionReason : '',
      sacCode : '12345'
    },
    {
      id: 7,
      name: 'Manual - Credit Card',
      category: 'Galen Slixby',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary',
      description: 'Galen Slixby',
      fee : '1200',
      taxRate :  'GST - 18%',
      exemptionReason : '',
      sacCode : '12345'
    },
    {
      id: 8,
      name: 'Manual - Credit Card',
      category: 'Galen Slixby',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary',
      description: 'Galen Slixby',
      fee : '1200',
      taxRate :  'GST - 18%',
      exemptionReason : '',
      sacCode : '12345'
    },
    {
      id: 9,
      name: 'Manual - Credit Card',
      category: 'Galen Slixby',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary',
      description: 'Galen Slixby',
      fee : '1200',
      taxRate :  'GST - 18%',
      exemptionReason : '',
      sacCode : '12345'
    },
    {
      id: 10,
      name: 'Manual - Credit Card',
      category: 'Galen Slixby',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary',
      description: 'Galen Slixby',
      fee : '1200',
      taxRate :  'GST - 18%',
      exemptionReason : '',
      sacCode : '12345'
    },
    {
      id: 11,
      name: 'Manual - Credit Card',
      category: 'Galen Slixby',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary',
      description: 'Galen Slixby',
      fee : '1200',
      taxRate :  'GST - 18%',
      exemptionReason : '',
      sacCode : '12345'
    },
    {
      id: 12,
      name: 'Manual - Credit Card',
      category: 'Galen Slixby',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary',
      description: 'Galen Slixby',
      fee : '1200',
      taxRate :  'GST - 18%',
      exemptionReason : '',
      sacCode : '12345'
    },
    {
      id: 13,
      name: 'Manual - Credit Card',
      category: 'Galen Slixby',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary',
      description: 'Galen Slixby',
      fee : '1200',
      taxRate :  'GST - 18%',
      exemptionReason : '',
      sacCode : '12345'
    },
    {
      id: 14,
      name: 'Manual - Credit Card',
      category: 'Galen Slixby',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 15,
      name: 'Manual - Credit Card',
      category: 'Galen Slixby',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary',
      description: 'Galen Slixby',
      fee : '1200',
      taxRate :  'GST - 18%',
      exemptionReason : '',
      sacCode : '12345'
    },
    {
      id: 16,
      name: 'Manual - Credit Card',
      category: 'Galen Slixby',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary',
      description: 'Galen Slixby',
      fee : '1200',
      taxRate :  'GST - 18%',
      exemptionReason : '',
      sacCode : '12345'
    },
    {
      id: 17,
      name: 'Manual - Credit Card',
      category: 'Galen Slixby',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary',
      description: 'Galen Slixby',
      fee : '1200',
      taxRate :  'GST - 18%',
      exemptionReason : '',
      sacCode : '12345'
    },
    {
      id: 18,
      name: 'Manual - Credit Card',
      category: 'Galen Slixby',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary',
      description: 'Galen Slixby',
      fee : '1200',
      taxRate :  'GST - 18%',
      exemptionReason : '',
      sacCode : '12345'
    },
    {
      id: 19,
      name: 'Manual - Credit Card',
      category: 'Galen Slixby',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary',
      description: 'Galen Slixby',
      fee : '1200',
      taxRate :  'GST - 18%',
      exemptionReason : '',
      sacCode : '12345'
    },
    {
      id: 20,
      name: 'Manual - Credit Card',
      category: 'Galen Slixby',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary',
      description: 'Galen Slixby',
      fee : '1200',
      taxRate :  'GST - 18%',
      exemptionReason : '',
      sacCode : '12345'
    },
    {
      id: 21,
      name: 'Manual - Credit Card',
      category: 'Galen Slixby',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary',
      description: 'Galen Slixby',
      fee : '1200',
      taxRate :  'GST - 18%',
      exemptionReason : '',
      sacCode : '12345'
    },
    {
      id: 22,
      name: 'Manual - Credit Card',
      category: 'Galen Slixby',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary',
      description: 'Galen Slixby',
      fee : '1200',
      taxRate :  'GST - 18%',
      exemptionReason : '',
      sacCode : '12345'
    },
    {
      id: 23,
      name: 'Manual - Credit Card',
      category: 'Galen Slixby',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary',
      description: 'Galen Slixby',
      fee : '1200',
      taxRate :  'GST - 18%',
      exemptionReason : '',
      sacCode : '12345'
    },
    {
      id: 24,
      name: 'Manual - Credit Card',
      category: 'Galen Slixby',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary',
      description: 'Galen Slixby',
      fee : '1200',
      taxRate :  'GST - 18%',
      exemptionReason : '',
      sacCode : '12345'
    },
    {
      id: 25,
      name: 'Manual - Credit Card',
      category: 'Galen Slixby',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary',
      description: 'Galen Slixby',
      fee : '1200',
      taxRate :  'GST - 18%',
      exemptionReason : '',
      sacCode : '12345'
    },
    {
      id: 26,
      name: 'Manual - Credit Card',
      category: 'Galen Slixby',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary',
      description: 'Galen Slixby',
      fee : '1200',
      taxRate :  'GST - 18%',
      exemptionReason : '',
      sacCode : '12345'
    },
    {
      id: 27,
      name: 'Manual - Credit Card',
      category: 'Galen Slixby',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary',
      description: 'Galen Slixby',
      fee : '1200',
      taxRate :  'GST - 18%',
      exemptionReason : '',
      sacCode : '12345'
    },
    {
      id: 28,
      name: 'Manual - Credit Card',
      category: 'Galen Slixby',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary',
      description: 'Galen Slixby',
      fee : '1200',
      taxRate :  'GST - 18%',
      exemptionReason : '',
      sacCode : '12345'
    },
    {
      id: 29,
      name: 'Manual - Credit Card',
      category: 'Galen Slixby',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary',
      description: 'Galen Slixby',
      fee : '1200',
      taxRate :  'GST - 18%',
      exemptionReason : '',
      sacCode : '12345'
    },
    {
      id: 30,
      name: 'Manual - Credit Card',
      category: 'Galen Slixby',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary',
      description: 'Galen Slixby',
      fee : '1200',
      taxRate :  'Tax Exempted',
      exemptionReason : 'No Tax Available',
      sacCode : '12345'
    }
  ]
}

// GET ALL DATA
mock.onGet('/api/service/list/all-data').reply(200, data.users)

// POST: Add new user
mock.onPost('/apps/service/add-user').reply(config => {
  // Get event from post data
  const user = JSON.parse(config.data)
  const highestValue = data.users.reduce((a, b) => (a.id > b.id ? a : b)).id

  user.id = highestValue + 1

  data.users.push(user)

  return [201, { user }]
})

// GET Updated DATA
mock.onGet('/api/service/list/data').reply(config => {
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
mock.onGet('/api/service').reply(config => {
  const { id } = config
  const user = data.users.find(i => i.id === id)
  return [200, { user }]
})

// DELETE: Deletes User
mock.onDelete('/apps/service/delete').reply(config => {
  // Get user id from URL
  let userId = config.id

  // Convert Id to number
  userId = Number(userId)

  const userIndex = data.users.findIndex(t => t.id === userId)
  data.users.splice(userIndex, 1)

  return [200]
})
