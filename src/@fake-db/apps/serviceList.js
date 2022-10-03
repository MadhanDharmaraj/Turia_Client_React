import mock from '../mock'

// ** Utils
import { paginateArray } from '../utils'

const data = {
  services: [
    {
      id: 1,
      name: 'Manual - Credit Card',
      category: 'Galen Slixby',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary',
      description: 'Galen Slixby',
      fee: '1200',
      tax_rate: 'GST - 18%',
      exemption_reason: '',
      sacCode: '12345'
    },
    {
      id: 2,
      name: 'Manual - Credit Card',
      category: 'Galen Slixby',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary',
      description: 'Galen Slixby',
      fee: '1200',
      taxRate: 'GST - 18%',
      exemptionReason: '',
      sacCode: '12345'
    },
    {
      id: 3,
      name: 'Manual - Credit Card',
      category: 'Galen Slixby',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary',
      description: 'Galen Slixby',
      fee: '1200',
      taxRate: 'GST - 18%',
      exemptionReason: '',
      sacCode: '12345'
    },
    {
      id: 4,
      name: 'Manual - Credit Card',
      category: 'Galen Slixby',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary',
      description: 'Galen Slixby',
      fee: '1200',
      taxRate: 'GST - 18%',
      exemptionReason: '',
      sacCode: '12345'
    },
    {
      id: 5,
      name: 'Manual - Credit Card',
      category: 'Galen Slixby',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary',
      description: 'Galen Slixby',
      fee: '1200',
      taxRate: 'GST - 18%',
      exemptionReason: '',
      sacCode: '12345'
    },
    {
      id: 6,
      name: 'Manual - Credit Card',
      category: 'Galen Slixby',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary',
      description: 'Galen Slixby',
      fee: '1200',
      taxRate: 'GST - 18%',
      exemptionReason: '',
      sacCode: '12345'
    },
    {
      id: 7,
      name: 'Manual - Credit Card',
      category: 'Galen Slixby',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary',
      description: 'Galen Slixby',
      fee: '1200',
      taxRate: 'GST - 18%',
      exemptionReason: '',
      sacCode: '12345'
    },
    {
      id: 8,
      name: 'Manual - Credit Card',
      category: 'Galen Slixby',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary',
      description: 'Galen Slixby',
      fee: '1200',
      taxRate: 'GST - 18%',
      exemptionReason: '',
      sacCode: '12345'
    },
    {
      id: 9,
      name: 'Manual - Credit Card',
      category: 'Galen Slixby',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary',
      description: 'Galen Slixby',
      fee: '1200',
      taxRate: 'GST - 18%',
      exemptionReason: '',
      sacCode: '12345'
    },
    {
      id: 10,
      name: 'Manual - Credit Card',
      category: 'Galen Slixby',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary',
      description: 'Galen Slixby',
      fee: '1200',
      taxRate: 'GST - 18%',
      exemptionReason: '',
      sacCode: '12345'
    },
    {
      id: 11,
      name: 'Manual - Credit Card',
      category: 'Galen Slixby',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary',
      description: 'Galen Slixby',
      fee: '1200',
      taxRate: 'GST - 18%',
      exemptionReason: '',
      sacCode: '12345'
    },
    {
      id: 12,
      name: 'Manual - Credit Card',
      category: 'Galen Slixby',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary',
      description: 'Galen Slixby',
      fee: '1200',
      taxRate: 'GST - 18%',
      exemptionReason: '',
      sacCode: '12345'
    },
    {
      id: 13,
      name: 'Manual - Credit Card',
      category: 'Galen Slixby',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary',
      description: 'Galen Slixby',
      fee: '1200',
      taxRate: 'GST - 18%',
      exemptionReason: '',
      sacCode: '12345'
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
      fee: '1200',
      taxRate: 'GST - 18%',
      exemptionReason: '',
      sacCode: '12345'
    },
    {
      id: 16,
      name: 'Manual - Credit Card',
      category: 'Galen Slixby',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary',
      description: 'Galen Slixby',
      fee: '1200',
      taxRate: 'GST - 18%',
      exemptionReason: '',
      sacCode: '12345'
    },
    {
      id: 17,
      name: 'Manual - Credit Card',
      category: 'Galen Slixby',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary',
      description: 'Galen Slixby',
      fee: '1200',
      taxRate: 'GST - 18%',
      exemptionReason: '',
      sacCode: '12345'
    },
    {
      id: 18,
      name: 'Manual - Credit Card',
      category: 'Galen Slixby',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary',
      description: 'Galen Slixby',
      fee: '1200',
      taxRate: 'GST - 18%',
      exemptionReason: '',
      sacCode: '12345'
    },
    {
      id: 19,
      name: 'Manual - Credit Card',
      category: 'Galen Slixby',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary',
      description: 'Galen Slixby',
      fee: '1200',
      taxRate: 'GST - 18%',
      exemptionReason: '',
      sacCode: '12345'
    },
    {
      id: 20,
      name: 'Manual - Credit Card',
      category: 'Galen Slixby',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary',
      description: 'Galen Slixby',
      fee: '1200',
      taxRate: 'GST - 18%',
      exemptionReason: '',
      sacCode: '12345'
    },
    {
      id: 21,
      name: 'Manual - Credit Card',
      category: 'Galen Slixby',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary',
      description: 'Galen Slixby',
      fee: '1200',
      taxRate: 'GST - 18%',
      exemptionReason: '',
      sacCode: '12345'
    },
    {
      id: 22,
      name: 'Manual - Credit Card',
      category: 'Galen Slixby',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary',
      description: 'Galen Slixby',
      fee: '1200',
      taxRate: 'GST - 18%',
      exemptionReason: '',
      sacCode: '12345'
    },
    {
      id: 23,
      name: 'Manual - Credit Card',
      category: 'Galen Slixby',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary',
      description: 'Galen Slixby',
      fee: '1200',
      taxRate: 'GST - 18%',
      exemptionReason: '',
      sacCode: '12345'
    },
    {
      id: 24,
      name: 'Manual - Credit Card',
      category: 'Galen Slixby',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary',
      description: 'Galen Slixby',
      fee: '1200',
      taxRate: 'GST - 18%',
      exemptionReason: '',
      sacCode: '12345'
    },
    {
      id: 25,
      name: 'Manual - Credit Card',
      category: 'Galen Slixby',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary',
      description: 'Galen Slixby',
      fee: '1200',
      taxRate: 'GST - 18%',
      exemptionReason: '',
      sacCode: '12345'
    },
    {
      id: 26,
      name: 'Manual - Credit Card',
      category: 'Galen Slixby',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary',
      description: 'Galen Slixby',
      fee: '1200',
      taxRate: 'GST - 18%',
      exemptionReason: '',
      sacCode: '12345'
    },
    {
      id: 27,
      name: 'Manual - Credit Card',
      category: 'Galen Slixby',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary',
      description: 'Galen Slixby',
      fee: '1200',
      taxRate: 'GST - 18%',
      exemptionReason: '',
      sacCode: '12345'
    },
    {
      id: 28,
      name: 'Manual - Credit Card',
      category: 'Galen Slixby',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary',
      description: 'Galen Slixby',
      fee: '1200',
      taxRate: 'GST - 18%',
      exemptionReason: '',
      sacCode: '12345'
    },
    {
      id: 29,
      name: 'Manual - Credit Card',
      category: 'Galen Slixby',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary',
      description: 'Galen Slixby',
      fee: '1200',
      taxRate: 'GST - 18%',
      exemptionReason: '',
      sacCode: '12345'
    },
    {
      id: 30,
      name: 'Manual - Credit Card',
      category: 'Galen Slixby',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary',
      description: 'Galen Slixby',
      fee: '1200',
      taxRate: 'Tax Exempted',
      exemptionReason: 'No Tax Available',
      sacCode: '12345'
    }
  ]
}

// GET ALL DATA
mock.onGet('/api/service/list/all-data').reply(200, data.services)

// POST: Add new service
mock.onPost('/apps/service/add-service').reply(config => {
  // Get event from post data
  const service = JSON.parse(config.data)
  const highestValue = data.services.reduce((a, b) => (a.id > b.id ? a : b)).id

  service.id = highestValue + 1

  data.services.push(service)

  return [201, { service }]
})

// GET Updated DATA
mock.onGet('/api/service/list/data').reply(config => {
  const {
    q = '',
    page = 1,
    perPage = 10,
    sort = 'asc',
    sortColumn = 'name'
  } = config

  /* eslint-disable  */
  const queryLowered = q.toLowerCase()

  const dataAsc = data.services.sort((a, b) => (a[sortColumn] < b[sortColumn] ? -1 : 1))

  const dataToFilter = sort === 'asc' ? dataAsc : dataAsc.reverse()

  const filteredData = dataToFilter.filter(
    service =>
      (service.name.toLowerCase().includes(queryLowered))
  )
  /* eslint-enable  */

  return [
    200,
    {
      total: filteredData.length,
      services: paginateArray(filteredData, perPage, page)
    }
  ]
})

// GET USER
mock.onGet('/api/service').reply(config => {
  const { id } = config
  const service = data.services.find(i => i.id === id)
  return [200, { service }]
})

// DELETE: Deletes Service
mock.onDelete('/apps/service/delete').reply(config => {
  // Get service id from URL
  let serviceId = config.id

  // Convert Id to number
  serviceId = Number(serviceId)

  const serviceIndex = data.services.findIndex(t => t.id === serviceId)
  data.services.splice(serviceIndex, 1)

  return [200]
})
