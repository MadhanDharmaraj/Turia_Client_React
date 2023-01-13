// ** React Imports
import moment from 'moment'
import { Button } from 'reactstrap'

const dateFormat = (value) => {

  return moment(value, 'x').format("MMM DD, YYYY")

}

const timeFormat = (value) => {
  return moment.unix(value).format("H:m A")
}
// ** Table columns
export const columns = [
  {
    name: 'Date',
    sortable: true,
    sortField: 'id',
    minWidth: '107px',
    cell: row => <span>{dateFormat(row.actualdate)}</span>
  },
  {
    name: 'Punch In',
    sortable: true,
    sortField: 'id',
    minWidth: '107px',
    cell: row => <span>{timeFormat(row.punchin)}</span>
  },
  {
    name: 'Punch Out',
    sortable: true,
    sortField: 'id',
    minWidth: '107px',
    cell: row => <span>{row.punchout ? timeFormat(row.punchout) : ''}</span>
  },
  {
    name: 'Total Hours',
    sortable: true,
    sortField: 'id',
    minWidth: '107px',
    cell: row => <span>{row.totalhours}</span>
  }
]
