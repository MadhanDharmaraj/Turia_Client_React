// ** React Imports
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { UncontrolledTooltip } from 'reactstrap'

// ** Third Party Components
import {
  Eye,
  Send,
  Download,
  CloudLightning
} from 'react-feather'
import moment from 'moment'

const statuArr = ["", "Applied", "Pending", "Approved"]
const dateFormat = (value) => {

  return moment.unix(value).format("MMM DD, YYYY")

}

const renderClient = row => {
  return (
    <Avatar
      initials
      className='me-1'
      color={'light-primary'}
      content={row.name.charAt(0).toUpperCase()}
    />
  )
}

// ** Table columns
export const columns = [
  {
    name: 'Applicant',
    sortable: true,
    sortField: 'id',
    minWidth: '107px',
    selector: row => row.id,
    cell: row => <span>{renderClient(row)} <span className='fw-bolder'>{row.name}</span></span>
  },
  {
    name: 'Leave Type',
    sortable: true,
    sortField: 'id',
    minWidth: '107px',
    selector: row => row.id,
    cell: row => <span>{row.leavetypename}</span>
  },
  {
    name: 'Date',
    sortable: true,
    sortField: 'id',
    minWidth: '107px',
    selector: row => row.id,
    cell: row => `${dateFormat(row.fromdate)} ${row.duration === 2 ? `- ${dateFormat(row.todate)}` : ''} `
  },
  {
    name: 'No of Days',
    sortable: true,
    sortField: 'id',
    minWidth: '107px',
    selector: row => row.id,
    cell: row => <span>{row.dayscount}</span>
  },
  {
    name: 'Status',
    sortable: true,
    sortField: 'id',
    minWidth: '107px',
    selector: row => row.id,
    cell: row => <span>{statuArr[row.status]}</span>
  },
  {
    name: 'Action',
    minWidth: '110px',
    cell: row => (
      <div className='column-action d-flex align-items-center'>
        <CloudLightning className='text-body cursor-pointer' size={17} id={`send-tooltip-${row.id}`} />
        <UncontrolledTooltip placement='top' target={`send-tooltip-${row.id}`}>
          Leave Details
        </UncontrolledTooltip>
      </div>
    )
  }
]
