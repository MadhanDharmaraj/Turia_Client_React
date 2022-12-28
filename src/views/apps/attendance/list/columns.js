// ** Custom Components
import Avatar from '@components/avatar'
import moment from 'moment'

// ** Renders Client Columns
const renderClient = row => {

  return (
    <Avatar
      initials
      className='me-1'
      color={'light-primary'}
      content={row.username}
    />
  )

}

const dateFormat = (value) => {
  return moment.unix(value).format("H:m A")
}


export const columns = [
  {
    name: 'Team Members',
    sortable: true,
    minWidth: '300px',
    sortField: 'username',
    selector: row => row.username,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {renderClient(row)}
        <div className='d-flex flex-column'>
          <small className='text-truncate text-muted mb-0'>{row.username}</small>
        </div>
      </div>
    )
  },
  {
    name: 'Clock In',
    sortable: true,
    minWidth: '172px',
    sortField: 'punchin',
    cell: row => <span>{dateFormat(row.punchin)}</span>
  },
  {
    name: 'Clock Out',
    minWidth: '138px',
    sortable: true,
    sortField: 'punchout',
    cell: row => <span>{row.punchout ? dateFormat(row.punchout) : ''}</span>
  },
  {
    name: 'Running Time',
    minWidth: '230px',
    sortable: true,
    sortField: 'department',
    selector: row => row.department,
    cell: row => <span className='text-capitalize'>{row.totalhours}</span>
  },
  {
    name: 'Entry Type',
    minWidth: '138px',
    sortable: true,
    sortField: 'status',
    selector: row => row.status,
    cell: row => <span className='text-capitalize'>{row.totalhours}</span>
  }
]
