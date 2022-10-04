import mock from '../mock'

// ** Utils
import { paginateArray } from '../utils'

const data = {
  tasks: [
    {
      id: 1,
      task_id: '#TSK00001',
      client: 'Manual - Credit Card',
      task: 'Galen Slixby',
      priority: 'Medium',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 2,
      task_id: '#TSK00002',
      client: 'Manual - Credit Card',
      task: 'Galen Slixby',
      priority: 'Medium',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 3,
      task_id: '#TSK00003',
      client: 'Manual - Credit Card',
      task: 'Galen Slixby',
      priority: 'Medium',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 4,
      task_id: '#TSK00004',
      client: 'Manual - Credit Card',
      task: 'Galen Slixby',
      priority: 'Medium',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 5,
      task_id: '#TSK00005',
      client: 'Manual - Credit Card',
      task: 'Galen Slixby',
      priority: 'Medium',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 6,
      task_id: '#TSK00006',
      client: 'Manual - Credit Card',
      task: 'Galen Slixby',
      priority: 'Medium',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 7,
      task_id: '#TSK00007',
      client: 'Manual - Credit Card',
      task: 'Galen Slixby',
      priority: 'Medium',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 8,
      task_id: '#TSK00008',
      client: 'Manual - Credit Card',
      task: 'Galen Slixby',
      priority: 'Medium',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 9,
      task_id: '#TSK00009',
      client: 'Manual - Credit Card',
      task: 'Galen Slixby',
      priority: 'Medium',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 10,
      task_id: '#TSK00010',
      client: 'Manual - Credit Card',
      task: 'Galen Slixby',
      priority: 'Medium',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 11,
      task_id: '#TSK00011',
      client: 'Manual - Credit Card',
      task: 'Galen Slixby',
      priority: 'Medium',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 12,
      task_id: '#TSK00012',
      client: 'Manual - Credit Card',
      task: 'Galen Slixby',
      priority: 'Medium',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 13,
      task_id: '#TSK00013',
      client: 'Manual - Credit Card',
      task: 'Galen Slixby',
      priority: 'Medium',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 14,
      task_id: '#TSK00014',
      client: 'Manual - Credit Card',
      task: 'Galen Slixby',
      priority: 'Medium',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 15,
      task_id: '#TSK00015',
      client: 'Manual - Credit Card',
      task: 'Galen Slixby',
      priority: 'Medium',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 16,
      task_id: '#TSK00016',
      client: 'Manual - Credit Card',
      task: 'Galen Slixby',
      priority: 'Medium',
      status: 'active',
      avatar: '',
      avatarColor: 'light-primary'
    }
  ]
}

const utilities = {
  clients: [
    {
      label: 'Turia',
      value: 1
    },
    {
      label: 'IndiaStartup',
      value: 2
    },
    {
      label: 'True Minds',
      value: 3
    },
    {
      label: 'TCS',
      value: 5
    },
    {
      label: 'Kreiger Info',
      value: 5
    }
  ],
  services: [
    {
      label: 'GSTR3B filing',
      value: 1
    },
    {
      label: 'Employee PF',
      value: 2
    },
    {
      label: 'Form 11 for LLP',
      value: 3
    },
    {
      label: 'Private Limited Inc',
      value: 5
    },
    {
      label: 'Tax Audit',
      value: 5
    }
  ],
  priority: [
    {
      label: 'Low',
      value: 1
    },
    {
      label: 'Medium',
      value: 2
    },
    {
      label: 'High',
      value: 3
    }
  ],
  users: [
    {
      label: 'Madhan',
      value: 1
    },
    {
      label: 'Kavin Raj',
      value: 2
    },
    {
      label: 'Akhalya',
      value: 3
    }
  ],
  tax_group: [
    {
      label: 'GST 0%',
      value: 1
    },
    {
      label: 'GST 5%',
      value: 2
    },
    {
      label: 'GST 10%',
      value: 3
    },
    {
      label: 'GST 12%',
      value: 4
    },
    {
      label: 'GST 15%',
      value: 5
    },
    {
      label: 'GST 18%',
      value: 6
    }
  ]

}

// GET ALL DATA
mock.onGet('/api/task/list/all-data').reply(200, data.tasks)

mock.onGet('/api/task/utilities').reply(200, utilities)

// POST: Add new task
mock.onPost('/apps/task/add-task').reply(config => {
  // Get event from post data
  const task = JSON.parse(config.data)
  const highestValue = data.tasks.reduce((a, b) => (a.id > b.id ? a : b)).id

  task.id = highestValue + 1

  data.tasks.push(task)

  return [201, { task }]
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
    task => task.status === (status || task.status)
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
  const task = data.tasks.find(i => i.id === id)
  return [200, { task }]
})

// DELETE: Deletes User
mock.onDelete('/apps/task/delete').reply(config => {
  // Get task id from URL
  let taskId = config.id

  // Convert Id to number
  taskId = Number(taskId)

  const taskIndex = data.tasks.findIndex(t => t.id === taskId)
  data.tasks.splice(taskIndex, 1)

  return [200]
})
