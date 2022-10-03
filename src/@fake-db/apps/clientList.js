import mock from '../mock'

// ** Utils
import { paginateArray } from '../utils'

const data = {
  clients: [
    {
      id: 1,
      contact_person_name: 'Manual - Credit Card',
      businessName: 'Galen Slixby',
      contact_no: '(479) 232-9151',
      email: 'gslixby0@abc.net.au',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 2,
      contact_person_name: 'Manual - Credit Card',
      businessName: 'Galen Slixby',
      contact_no: '(479) 232-9151',
      email: 'gslixby0@abc.net.au',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 3,
      contact_person_name: 'Manual - Credit Card',
      businessName: 'Galen Slixby',
      contact_no: '(479) 232-9151',
      email: 'gslixby0@abc.net.au',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 4,
      contact_person_name: 'Manual - Credit Card',
      businessName: 'Galen Slixby',
      contact_no: '(479) 232-9151',
      email: 'gslixby0@abc.net.au',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 5,
      contact_person_name: 'Manual - Credit Card',
      businessName: 'Galen Slixby',
      contact_no: '(479) 232-9151',
      email: 'gslixby0@abc.net.au',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 6,
      contact_person_name: 'Manual - Credit Card',
      businessName: 'Galen Slixby',
      contact_no: '(479) 232-9151',
      email: 'gslixby0@abc.net.au',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 7,
      contact_person_name: 'Manual - Credit Card',
      businessName: 'Galen Slixby',
      contact_no: '(479) 232-9151',
      email: 'gslixby0@abc.net.au',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 8,
      contact_person_name: 'Manual - Credit Card',
      businessName: 'Galen Slixby',
      contact_no: '(479) 232-9151',
      email: 'gslixby0@abc.net.au',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 9,
      contact_person_name: 'Manual - Credit Card',
      businessName: 'Galen Slixby',
      contact_no: '(479) 232-9151',
      email: 'gslixby0@abc.net.au',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 10,
      contact_person_name: 'Manual - Credit Card',
      businessName: 'Galen Slixby',
      contact_no: '(479) 232-9151',
      email: 'gslixby0@abc.net.au',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 11,
      contact_person_name: 'Manual - Credit Card',
      businessName: 'Galen Slixby',
      contact_no: '(479) 232-9151',
      email: 'gslixby0@abc.net.au',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 12,
      contact_person_name: 'Manual - Credit Card',
      businessName: 'Galen Slixby',
      contact_no: '(479) 232-9151',
      email: 'gslixby0@abc.net.au',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 13,
      contact_person_name: 'Manual - Credit Card',
      businessName: 'Galen Slixby',
      contact_no: '(479) 232-9151',
      email: 'gslixby0@abc.net.au',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 14,
      contact_person_name: 'Manual - Credit Card',
      businessName: 'Galen Slixby',
      contact_no: '(479) 232-9151',
      email: 'gslixby0@abc.net.au',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 15,
      contact_person_name: 'Manual - Credit Card',
      businessName: 'Galen Slixby',
      contact_no: '(479) 232-9151',
      email: 'gslixby0@abc.net.au',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 16,
      contact_person_name: 'Manual - Credit Card',
      businessName: 'Galen Slixby',
      contact_no: '(479) 232-9151',
      email: 'gslixby0@abc.net.au',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 17,
      contact_person_name: 'Manual - Credit Card',
      businessName: 'Galen Slixby',
      contact_no: '(479) 232-9151',
      email: 'gslixby0@abc.net.au',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 18,
      contact_person_name: 'Manual - Credit Card',
      businessName: 'Galen Slixby',
      contact_no: '(479) 232-9151',
      email: 'gslixby0@abc.net.au',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 19,
      contact_person_name: 'Manual - Credit Card',
      businessName: 'Galen Slixby',
      contact_no: '(479) 232-9151',
      email: 'gslixby0@abc.net.au',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 20,
      contact_person_name: 'Manual - Credit Card',
      businessName: 'Galen Slixby',
      contact_no: '(479) 232-9151',
      email: 'gslixby0@abc.net.au',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 21,
      contact_person_name: 'Manual - Credit Card',
      businessName: 'Galen Slixby',
      contact_no: '(479) 232-9151',
      email: 'gslixby0@abc.net.au',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 22,
      contact_person_name: 'Manual - Credit Card',
      businessName: 'Galen Slixby',
      contact_no: '(479) 232-9151',
      email: 'gslixby0@abc.net.au',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 23,
      contact_person_name: 'Manual - Credit Card',
      businessName: 'Galen Slixby',
      contact_no: '(479) 232-9151',
      email: 'gslixby0@abc.net.au',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 24,
      contact_person_name: 'Manual - Credit Card',
      businessName: 'Galen Slixby',
      contact_no: '(479) 232-9151',
      email: 'gslixby0@abc.net.au',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 25,
      contact_person_name: 'Manual - Credit Card',
      businessName: 'Galen Slixby',
      contact_no: '(479) 232-9151',
      email: 'gslixby0@abc.net.au',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 26,
      contact_person_name: 'Manual - Credit Card',
      businessName: 'Galen Slixby',
      contact_no: '(479) 232-9151',
      email: 'gslixby0@abc.net.au',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 27,
      contact_person_name: 'Manual - Credit Card',
      businessName: 'Galen Slixby',
      contact_no: '(479) 232-9151',
      email: 'gslixby0@abc.net.au',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 28,
      contact_person_name: 'Manual - Credit Card',
      businessName: 'Galen Slixby',
      contact_no: '(479) 232-9151',
      email: 'gslixby0@abc.net.au',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 29,
      contact_person_name: 'Manual - Credit Card',
      businessName: 'Galen Slixby',
      contact_no: '(479) 232-9151',
      email: 'gslixby0@abc.net.au',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    }
  ]
}

// GET ALL DATA
mock.onGet('/api/client/list/all-data').reply(200, data.clients)

// POST: Add new client
mock.onPost('/apps/client/add-client').reply(config => {
  // Get event from post data
  const client = JSON.parse(config.data)
  const highestValue = data.clients.reduce((a, b) => (a.id > b.id ? a : b)).id

  client.id = highestValue + 1

  data.clients.push(client)

  return [201, { client }]
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

  const dataAsc = data.clients.sort((a, b) => (a[sortColumn] < b[sortColumn] ? -1 : 1))

  const dataToFilter = sort === 'asc' ? dataAsc : dataAsc.reverse()

  const filteredData = dataToFilter.filter(
    client =>
      (client.email.toLowerCase().includes(queryLowered) ||
        client.fullName.toLowerCase().includes(queryLowered) ||
        client.billing.toLowerCase().includes(queryLowered)) &&
      client.role === (role || client.role) &&
      client.currentPlan === (currentPlan || client.currentPlan) &&
      client.status === (status || client.status)
  )
  /* eslint-enable  */

  return [
    200,
    {
      total: filteredData.length,
      clients: paginateArray(filteredData, perPage, page)
    }
  ]
})

// GET USER
mock.onGet('/api/client').reply(config => {
  const { id } = config
  const client = data.clients.find(i => i.id === id)
  return [200, { client }]
})

// DELETE: Deletes User
mock.onDelete('/apps/client/delete').reply(config => {
  // Get client id from URL
  let userId = config.id

  // Convert Id to number
  userId = Number(userId)

  const userIndex = data.clients.findIndex(t => t.id === userId)
  data.clients.splice(userIndex, 1)

  return [200]
})
