// ** Reactstrap Imports
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Card, CardBody, CardText, Row, Col, Table } from 'reactstrap'
import { getInvoiceItems } from '../store'

import { parser } from '../helper/hepler'

// ** Custom Components
import Avatar from '@components/avatar'

const PreviewCard = ({ data }) => {

  const { id } = useParams()
  const dispatch = useDispatch()
  const [invoiceItems, setInvoiceItems] = useState([])
  const [invoiceTaxes, setInvoiceTaxes] = useState([])

  const dateFormat = (value) => {
    return moment.unix(value).format("MMM DD, YYYY")
  }

  const renderOrg = name => {
    const stateNum = Math.floor(Math.random() * 6),
      states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
      color = states[stateNum]
    return <Avatar color={color} className='me-50' content={name !== null ? name.charAt(0) : ''} />

  }

  useEffect(async () => {

    setInvoiceTaxes(parser(data.calculatetaxes))

    const res = await dispatch(getInvoiceItems(id))
    setInvoiceItems(res.payload)
  }, [data])

  return data !== null ? (
    <Card className='invoice-preview-card'>
      <CardBody className='invoice-padding pb-0'>
        {/* Header */}
        <div className='d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0'>
          <div lg={6}>
            <div className='logo-wrapper'>
              {renderOrg(data.organizationname)}
              <h3 className='text-primary invoice-logo'>{data.organizationname}</h3>
            </div>
            <CardText className='mb-25'>{data.organizationaddressline1}</CardText>
            <CardText className='mb-25'>{data.organizationaddressline2}</CardText>
            <CardText className='mb-0'>{data.organizationcity} - {data.organizationzipcode}</CardText>
            <CardText className='mb-0'>{data.organizationstate}</CardText>
            <CardText className='mb-0'>GSTIN - {data.organizationgstin} &nbsp;&nbsp; State Code : {data.organizationgstin.substr(0, 2)}</CardText>
          </div>
          <div lg={6} className='mt-md-0 mt-2'>
            <h4 className='invoice-title'>
              Proposal <span className='invoice-number'>{data.uniqueno}</span>
            </h4>
            <div className='invoice-date-wrapper'>
              <p className='invoice-date-title'>Date Issued:</p>
              <p className='invoice-date'>{dateFormat(data.invoicedate)}</p>
            </div>
            <div className='invoice-date-wrapper'>
              <p className='invoice-date-title'>Due Date:</p>
              <p className='invoice-date'>{dateFormat(data.paymentdue)}</p>
            </div>
          </div>
        </div>
        {/* /Header */}
      </CardBody>

      <hr className='invoice-spacing' />

      {/* Address and Contact */}
      <CardBody className='invoice-padding pt-0'>
        <Row className='invoice-spacing'>
          <Col className='p-0' xl='8'>
            <h6 className='mb-2'>Invoice To:</h6>
            <h6 className='mb-25'>{data.contactname}</h6>
            <CardText className='mb-25'>{data.billingaddressline1}</CardText>
            <CardText className='mb-25'>{data.billingaddressline2}</CardText>
            <CardText className='mb-25'>{data.billingaddresscity} - {data.billingaddresszipcode}</CardText>
            <CardText className='mb-25'>{data.billingaddressstate}</CardText>
            <CardText className='mb-25'>GSTIN - {data.gstin}</CardText>
          </Col>
          <Col className='p-0 mt-xl-0 mt-2' xl='4'>
            <h6 className='mb-2'>Payment Details:</h6>
            <table>
              <tbody>
                <tr>
                  <td className='pe-1'>Total Due:</td>
                  <td>
                    <span className='fw-bold'>{data.dueamount}</span>
                  </td>
                </tr>
                <tr>
                  <td className='pe-1'>Bank name:</td>
                  <td>{data.bankaccountbankname}</td>
                </tr>
                <tr>
                  <td className='pe-1'>Account Name:</td>
                  <td>{data.bankaccountholdername}</td>
                </tr>
                <tr>
                  <td className='pe-1'>Branch Name:</td>
                  <td>{data.bankaccountbranchname}</td>
                </tr>
                <tr>
                  <td className='pe-1'>IFSC code:</td>
                  <td>{data.bankaccountifsccode}</td>
                </tr>
              </tbody>
            </table>
          </Col>
        </Row>
        <Row className='invoice-spacing'>
          <Col className='p-0' xl='8'>
            <CardText className='mb-25'>Place Of Supply: {data.billingaddressstate}</CardText>
            <CardText className='mb-25'>State: {data.billingaddressstate} &nbsp;&nbsp;State Code: 29 </CardText>
          </Col>
          <Col className='p-0 mt-xl-0 mt-2' xl='4'>
            <table>
              <tbody>
                <tr>
                  <td className='pe-1'>Currency code: </td>
                  <td>{data.billingcurrencyshortname}</td>
                </tr>
                <tr>
                  <td className='pe-1'>RCM Applicable:</td>
                  <td>{data.isrcmapplicable ? 'Yes' : 'No'}</td>
                </tr>
              </tbody>
            </table>
          </Col>
        </Row>
      </CardBody>
      {/* /Address and Contact */}

      {/* Invoice Description */}
      <Table responsive>
        <thead>
          <tr>
            <th className='py-1'>Item</th>
            <th className='py-1'>SAC Code</th>
            <th className='py-1'>Price</th>
            <th className='py-1'>Tax</th>
            <th className='py-1'>Total</th>
          </tr>
        </thead>
        <tbody>
          {invoiceItems.map((item, ind) => {
            return (
              <tr key={ind}>
                <td className='py-1'>
                  <p className='card-text fw-bold mb-25'>{item.servicesName}</p>
                  <p className='card-text text-nowrap'>
                    {item.description}
                  </p>
                </td>
                <td className='py-1'>
                  <span className='fw-bold'>{item.sacCode}</span>
                </td>
                <td className='py-1'>
                  <span className='fw-bold'>{item.price}</span>
                </td>
                <td className='py-1'>
                  <span className='fw-bold'>
                    {
                      item.isTaxApplicable === 'true' &&
                      parser(item.taxes).map((obj, k) => {
                        return (<Row key={k}><span>{obj.taxName} - {obj.taxAmount}</span></Row>)

                      })
                    }
                    {
                      item.isTaxApplicable === 'false' && (<Row>
                        <span>{item.taxGroupName}</span>
                        <span>{item.exemptionReasonName}</span></Row>)
                    }
                  </span>
                </td>
                <td className='py-1'>
                  <span className='fw-bold'>{item.subTotalAmount}</span>
                </td>
              </tr>
            )
          })
          }
        </tbody>
      </Table>
      {/* /Invoice Description */}

      {/* Total & Sales Person */}
      <CardBody className='invoice-padding pb-0'>
        <Row className='invoice-sales-total-wrapper'>
          <Col className='mt-md-0 mt-3' md='6' order={{ md: 1, lg: 2 }}>

          </Col>
          <Col className='d-flex justify-content-end' md='6' order={{ md: 2, lg: 1 }}>
            <div className='invoice-total-wrapper'>
              <div className='invoice-total-item'>
                <p className='invoice-total-title'>Total Payable:</p>
                <p className='invoice-total-amount'>{data.totalamount}</p>
              </div>
              <div className='invoice-total-item'>
                <p className='invoice-total-title'>Pre Tax Amount:</p>
                <p className='invoice-total-amount'>{data.subtotalamount}</p>
              </div>
              { invoiceTaxes.length > 0 &&
                invoiceTaxes.map((obj, key) => {
                  return (
                    <div className='invoice-total-item' key={key}>
                      <p className='invoice-total-title'>{obj.taxName}</p>
                      <p className='invoice-total-amount'>{obj.taxAmount}</p>
                    </div>
                  )
                })
              }

              <hr className='my-50' />
              <div className='invoice-total-item'>
                <p className='invoice-total-title'>Balance Due:</p>
                <p className='invoice-total-amount'>{data.dueamount}</p>
              </div>
            </div>
          </Col>
        </Row>
      </CardBody>
      {/* /Total & Sales Person */}

      <hr className='invoice-spacing' />

      {/* Invoice Note */}
      <CardBody className='invoice-padding pt-0'>
        <Row>
          <Col sm='12'>
            <span className='fw-bold'>Note: </span>
            <span>
              {data.note}
            </span>
          </Col>
        </Row>
      </CardBody>
      {/* /Invoice Note */}
    </Card>
  ) : null
}

export default PreviewCard
