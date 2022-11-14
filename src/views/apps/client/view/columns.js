// ** Table columns
export const columns = [
  {
    name: '#',
    sortable: false,
    minWidth: '80px',
    selector: row => row.id,
    cell: row =>  <span>{row.id || 0}</span>
  },
  {
    name: 'Name',
    minWidth: '180px',
    sortable: false,
    selector: row => row.name,
    cell: row =>  <span>{row.name || 0}</span>
  },

  {
    name: 'Email',
    sortable: false,
    minWidth: '180px',
    selector: row => row.email,
    cell: row => <span>{row.email || 0}</span>
  },
  {
    name: 'Contact',
    sortable: false,
    minWidth: '135px',
    selector: row => row.contactNumber,
    cell: row => <span>{row.contactNumber || 0}</span>
  },
  {
    name: 'Designation',
    sortable: false,
    minWidth: '120px',
    selector: row => row.designation,
    cell: row => <span>{row.designation || 0}</span>
  }
]
