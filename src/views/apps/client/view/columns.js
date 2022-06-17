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
  Edit,
  Save,
  Info,
  PieChart,
  Download,
  TrendingUp,
  CheckCircle,
  ArrowDownCircle,
  User
} from 'react-feather'

// ** Table columns
export const columns = [
  {
    name: '#',
    sortable: true,
    sortField: 'id',
    minWidth: '80px',
    selector: row => row.task_id,
    cell: row => <Link className='fw-bolder' to={`/task/view/${row.id}`}>{row.task_id}</Link>
  },
  {
    name: 'Client',
    minWidth: '180px',
    sortable: true,
    sortField: 'invoiceStatus',
    selector: row => row.client,
    cell: row =>  <span>{row.client || 0}</span>
  },

  {
    name: 'Service',
    sortable: true,
    minWidth: '180px',
    sortField: 'total',
    selector: row => row.task,
    cell: row => <span>{row.task || 0}</span>
  },
  {
    name: 'Priority',
    sortable: true,
    minWidth: '135px',
    sortField: 'total',
    selector: row => row.priority,
    cell: row => <span>{row.priority || 0}</span>
  },
  {
    name: 'Status',
    sortable: true,
    minWidth: '120px',
    sortField: 'total',
    selector: row => row.status,
    cell: row => <span>{row.status || 0}</span>
  },
  {
    minWidth: '127px',
    name: 'End Date',
    cell: row => row.endDate
  }
]
