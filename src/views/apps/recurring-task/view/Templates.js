// ** Reactstrap Imports
import { Card, CardBody, CardHeader, Progress, Row } from 'reactstrap'

// ** Third Party Components
import { ChevronDown, Heart } from 'react-feather'
import DataTable from 'react-data-table-component'

// ** Custom Components
import Avatar from '@components/avatar'
import pdf from '@src/assets/images/icons/file-icons/pdf.png'
// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'

export const columns = [
  {
    sortable: true,
    minWidth: '300px',
    name: 'Project',
    selector: row => row.title,
    cell: row => {
      return (
        <div className='d-flex justify-content-left align-items-center'>
          <div className='avatar-wrapper'>
            <Avatar className='me-1' img={row.img} alt={row.title} imgWidth='32' />
          </div>
          <div className='d-flex flex-column'>
            <span className='text-truncate fw-bolder'>{row.title}</span>
            <small className='text-muted'>{row.subtitle}</small>
          </div>
        </div>
      )
    }
  },
  {
    name: 'Total Tasks',
    selector: row => row.totalTasks
  },
  {
    name: 'Progress',
    selector: row => row.progress,
    sortable: true,
    cell: row => {
      return (
        <div className='d-flex flex-column w-100'>
          <small className='mb-1'>{`${row.progress}%`}</small>
          <Progress
            value={row.progress}
            style={{ height: '6px' }}
            className={`w-100 progress-bar-${row.progressColor}`}
          />
        </div>
      )
    }
  },
  {
    name: 'Hours',
    selector: row => row.hours
  }
]

const UserProjectsList = () => {
  return (
    <Card>
      <CardHeader tag='h4'>Task Templates</CardHeader>
      <CardBody>
        <div className='d-flex align-items-start my-1'>
          <Avatar className='mt-25 me-75' imgHeight='34' imgWidth='34' />
          <div className='profile-user-info w-100'>
            <div className='d-flex align-items-center justify-content-between'>
              <h6 className='mb-0'>Madhan</h6>
              <a href='/' onClick={e => e.preventDefault()}>
                <Heart
                  size={18}

                />
                <span className='align-middle ms-25 text-muted'>2</span>
              </a>
            </div>
            <small>Test</small>
          </div>
        </div>
        <div className='d-flex align-items-start my-1'>
          <Avatar className='mt-25 me-75' imgHeight='34' imgWidth='34' />
          <div className='profile-user-info w-100'>
            <div className='d-flex align-items-center justify-content-between'>
              <h6 className='mb-0'>Madhan</h6>
              <a href='/' onClick={e => e.preventDefault()}>
                <Heart
                  size={18}
                />
                <span className='align-middle ms-25 text-muted'>2</span>
              </a>
            </div>
            <small>Test</small>
            <Row lg={12} sm={12} className='my-1'>
              <div className='d-flex align-items-center col-lg-4 col-sm-12'>
                <img className='me-1' src={pdf} alt='pdf' height='23' />
                <h6 className='mb-0'>invoice.pdf</h6>
              </div>
              <div className='d-flex align-items-center col-lg-4 col-sm-12'>
                <img className='me-1' src={pdf} alt='pdf' height='23' />
                <h6 className='mb-0'>invoice.pdf</h6>
              </div>
            </Row>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default UserProjectsList
