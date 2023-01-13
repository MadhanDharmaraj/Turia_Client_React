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
  Download
} from 'react-feather'
import moment from 'moment'

const statuArr = ["", "Applied", "Pending", "Approved"]
const dateFormat = (value) => {

  return moment.unix(value).format("MMM DD, YYYY")

}
// ** Table columns
export const columns = [
  {
    name: 'Applicant',
    sortable: true,
    sortField: 'id',
    minWidth: '107px',
    selector: row => row.id,
    cell: row => <span>{row.name}</span>
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
    cell: row => `${dateFormat(row.fromdate)} - ${dateFormat(row.todate)} `
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
        <Send className='text-body cursor-pointer' size={17} id={`send-tooltip-${row.id}`} />
        <UncontrolledTooltip placement='top' target={`send-tooltip-${row.id}`}>
          Send Mail
        </UncontrolledTooltip>

        <Link className='text-body' to={`/apps/invoice/preview/${row.id}`} id={`pw-tooltip-${row.id}`}>
          <Eye size={17} className='mx-1' />
        </Link>
        <UncontrolledTooltip placement='top' target={`pw-tooltip-${row.id}`}>
          Preview Invoice
        </UncontrolledTooltip>

        <Download className='text-body cursor-pointer' size={17} id={`download-tooltip-${row.id}`} />
        <UncontrolledTooltip placement='top' target={`download-tooltip-${row.id}`}>
          Download Invoice
        </UncontrolledTooltip>
      </div>
    )
  }
]
