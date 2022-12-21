// ** Invoice Add Components
import AddCard from './AddCard'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/base/pages/app-invoice.scss'

const InvoiceAdd = () => {
  return (
    <div className='invoice-add-wrapper'>
      <AddCard />
    </div>
  )
}

export default InvoiceAdd
