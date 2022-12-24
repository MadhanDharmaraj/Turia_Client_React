// ** React Imports
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { store } from '@store/store'
import { deleteInvociePayments } from './store/index'
// ** Reactstrap Imports
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledTooltip,
  UncontrolledDropdown
} from 'reactstrap'

// ** Third Party Components
import {
  Eye,
  Send,
  Edit,
  Copy,
  Trash,
  Download,
  TrendingUp,
  MoreVertical
} from 'react-feather'
import moment from 'moment'


const dateFormat = (value) => {

  return moment.unix(value).format("MMM DD, YYYY")

}

// ** Table columns
export const columns = [
  {
    name: 'Payment #',
    sortable: true,
    sortField: 'id',
    minWidth: '107px',
    cell: row => <Link to={`/invoice/view/${row.id}`}>{`${row.uniqueno}`}</Link>
  },
  {
    sortable: true,
    minWidth: '120px',
    sortField: '',
    name: 'Payment Date',
    cell: row => <span>{dateFormat(row.paymentdate)}</span>
  },
  {
    name: 'Refernce',
    sortable: true,
    minWidth: '150px',
    cell: row => <span>{row.referenceno}</span>
  },
  {
    name: 'Amount',
    sortable: true,
    minWidth: '150px',
    cell: row => <span>{row.billingcurrency} {row.totalamountpaid || 0}</span>
  },
  {
    sortable: true,
    minWidth: '200px',
    name: 'Aomount With Held',
    cell: row => <span>{row.billingcurrency}{row.amountwithheld || 0}</span>
  },
  {
    name: 'Action',
    minWidth: '110px',
    cell: row => (
      <div className='column-action d-flex align-items-center'>
        <UncontrolledDropdown>
          <DropdownToggle tag='span'>
            <MoreVertical size={17} className='cursor-pointer' />
          </DropdownToggle>
          <DropdownMenu end>
            <DropdownItem tag={Link} to={`/invoice/edit/${row.id}`} className='w-100'>
              <Edit size={14} className='me-50' />
              <span className='align-middle'>Edit</span>
            </DropdownItem>
            <DropdownItem
              tag='a'
              href='/'
              className='w-100'
              onClick={e => {
                e.preventDefault()
                store.dispatch(deleteInvociePayments(row.id))
              }}
            >
              <Trash size={14} className='me-50' />
              <span className='align-middle'>Delete</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    )
  }
]
