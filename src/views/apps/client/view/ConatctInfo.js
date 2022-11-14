// ** React Imports
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
// ** Table Columns
import { columns } from './columns'

// ** Third Party Components
import DataTable from 'react-data-table-component'
import { ChevronDown } from 'react-feather'

// ** Reactstrap Imports
import {
  Card
} from 'reactstrap'

// ** Store & Actions
import { getConatctInfo } from '@src/views/apps/client/store'
import { useDispatch, useSelector } from 'react-redux'

// ** Styles
import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

const ConatctInfo = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.client.clientInformations)
  const {id}  = useParams()
  useEffect(() => {
    dispatch(getConatctInfo(id))
    
  }, [])

  const dataToRender = () => {
  
    return store
  }

  return (
    <div className='invoice-list-wrapper'>
      <Card>

        <div className='invoice-list-dataTable react-dataTable'>
          <DataTable
            noHeader
            sortServer
            columns={columns}
            responsive={true}
            data={dataToRender()}
            sortIcon={<ChevronDown />}
            className='react-dataTable'
            defaultSortField='invoiceId'
          />
        </div>
      </Card>
    </div>
  )
}

export default ConatctInfo
