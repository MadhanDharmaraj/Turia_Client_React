// ** React Imports
import {
  Card,
  CardBody,
  Input
} from 'reactstrap'

// ** Third Party Components
import axios from '@src/configs/axios/axiosConfig'
import DataTable from 'react-data-table-component'
import { useEffect, useState } from 'react'
const columns = [
  {
    name: 'Default',
    sortable: false,
    minWidth: '80px',
    selector: row => row.id,
    cell: row => <span><Input type='radio' value={row.id} name='taxrate'/></span>
  },
  {
    name: 'Tax Rate',
    minWidth: '180px',
    sortable: false,
    selector: row => row.name,
    cell: row => <span>{row.name || 0}</span>
  },
  {
    name: 'Percentage',
    sortable: false,
    minWidth: '120px',
    selector: row => row.percentage,
    cell: row => <span>{row.percentage || 0} %</span>
  }
]

const taxRate = (tabId) => {
  // ** States

  const [data, setData] = useState([])

  const getTaxList = () => {
    axios.post('/taxgroups/list')
      .then((res) => {
        setData(res.data.taxgroups)
      })
      .catch((err) => { console.log(err) })
  }

  useEffect(async () => {
    if (tabId.data === 'taxrate') {
      getTaxList()
    }

  }, [tabId])

  return (

    <Card>
      <CardBody className='py-25'>
        <DataTable
          noHeader
          sortServer
          columns={columns}
          responsive={true}
          data={data}
          className='react-dataTable'
        />
      </CardBody>
    </Card>

  )
}

export default taxRate
