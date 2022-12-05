// ** Reactstrap Imports
import { Card, CardHeader } from 'reactstrap'

// ** Third Party Components
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'

// ** Custom Components
import Avatar from '@components/avatar'

import { DSCList } from '../store/index'
// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { useEffect, useState } from 'react'

const dateFormat = (value) => {

  return moment.unix(value).format("MMM DD, YYYY")

}

const statusArr = [
  '',
  "Active",
  "In Active"

]

export const columns = [
  {
    sortable: true,
    minWidth: '300px',
    name: 'Client',
    selector: row => row.name,
    cell: row => {
      return (
        <div className='d-flex justify-content-left align-items-center'>
          <div className='avatar-wrapper'>
            <Avatar className='me-1' content={row.name.charAt(0)} alt={row.name} imgWidth='32' />
          </div>
          <div className='d-flex flex-column'>
            <span className='text-truncate fw-bolder'>{row.name}</span>
            <small className='text-muted'>{row.email}</small>
          </div>
        </div>
      )
    }
  },
  {
    name: 'Contact',
    selector: row => row.contact
  },
  {
    name: 'Issued Date',
    selector: row => dateFormat(row.issueddate)
  },
  {
    name: 'Expiry Date',
    selector: row => dateFormat(row.expirydate)
  },
  {
    name: 'Status',
    selector: row => row.status,
    sortable: true,
    cell: row => {
      return (
        <div className='d-flex flex-column w-100'>
          <small className='mb-1'>{`${statusArr[row.status]}`}</small>
        </div>
      )
    }
  }
]

const UserProjectsList = () => {

  const store = useSelector(state => state.digitalsignature)
  const [dataArray, setDataArray] = useState([])
  const dispatch = useDispatch()

  useEffect(async () => {

    if (store.DSCLists.length > 0) {
      setDataArray(store.DSCLists)
    }

  }, [store.DSCLists])


  useEffect(async () => {
    if (store.selectedDigitalSignature !== null) {
      await dispatch(DSCList(store.selectedDigitalSignature.clientid))
    }

  }, [store.selectedDigitalSignature])

  return (
    <Card>
      <CardHeader tag='h4'>Digital Signature List</CardHeader>
      <div className='react-dataTable user-view-account-projects'>
        <DataTable
          noHeader
          responsive
          columns={columns}
          data={dataArray}
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
        />
      </div>
    </Card>
  )
}

export default UserProjectsList
