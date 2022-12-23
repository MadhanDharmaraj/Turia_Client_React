// ** React Imports
import { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// ** Reactstrap Imports
import {
    Row,
    Col,
    Card,
    Label,
    Input,
    Table,
    Modal,
    Button,
    CardBody,
    ModalBody,
    ModalHeader,
    FormFeedback,
    UncontrolledTooltip
} from 'reactstrap'

// ** Third Party Components
import { Copy, Info } from 'react-feather'
import { useForm, Controller } from 'react-hook-form'

// ** Custom Components
import AvatarGroup from '@components/avatar-group'
import { getData, addRole } from './store/roles' //updateRole, deleteRole
// ** FAQ Illustrations
import illustration from '@src/assets/images/illustration/faq-illustrations.svg'
import { useDispatch, useSelector } from 'react-redux'

const rolesArr = [
    'User Management',
    'Content Management',
    'Disputes Management',
    'Database Management',
    'Financial Management',
    'Reporting',
    'API Control',
    'Repository Management',
    'Payroll'
]

const Roles = (tabId) => {
    // ** States
    const [show, setShow] = useState(false)
    const [data, setData] = useState([])
    const [modalType, setModalType] = useState('Add New')

    const store = useSelector(state => state.role)
    const dispatch = useDispatch()

    // ** Hooks
    const {
        reset,
        control,
        setValue,
        handleSubmit,
        formState: { errors }
    } = useForm({ defaultValues: { name: '', description: '' } })

    const onSubmit = async data => {

        await dispatch(addRole(data))

    }

    const onReset = () => {
        setShow(false)
        reset({ name: '', description: '' })
    }

    const handleModalClosed = () => {
        setModalType('Add New')
        setValue('name')
    }

    useEffect(async () => {
        if (tabId.data === 'roles') {
            await dispatch(getData())
        }

    }, [tabId])

    useEffect(() => {
        setData(store.data)
    }, [store.data])

    return (
        <Fragment>
            <Row>
                {data.map((item, index) => {
                    return (
                        <Col key={index} xl={4} md={6}>
                            <Card>
                                <CardBody>
                                    <div className='d-flex justify-content-between'>
                                        <span>{`Total ${item.totalUsers} users`}</span>
                                        <AvatarGroup data={item.users} />
                                    </div>
                                    <div className='d-flex justify-content-between align-items-end mt-1 pt-25'>
                                        <div className='role-heading'>
                                            <h4 className='fw-bolder'>{item.title}</h4>
                                            <Link
                                                to='/'
                                                className='role-edit-modal'
                                                onClick={e => {
                                                    e.preventDefault()
                                                    setModalType('Edit')
                                                    setShow(true)
                                                }}
                                            >
                                                <small className='fw-bolder'>Edit Role</small>
                                            </Link>
                                        </div>
                                        <Link to='' className='text-body' onClick={e => e.preventDefault()}>
                                            <Copy className='font-medium-5' />
                                        </Link>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    )
                })}
                <Col xl={4} md={6}>
                    <Card>
                        <Row>
                            <Col sm={5}>
                                <div className='d-flex align-items-end justify-content-center h-100'>
                                    <img className='img-fluid mt-2' src={illustration} alt='Image' width={85} />
                                </div>
                            </Col>
                            <Col sm={7}>
                                <CardBody className='text-sm-end text-center ps-sm-0'>
                                    <Button
                                        color='primary'
                                        className='text-nowrap mb-1'
                                        onClick={() => {
                                            setModalType('Add New')
                                            setShow(true)
                                        }}
                                    >
                                        Add New Role
                                    </Button>
                                    <p className='mb-0'>Add a new role, if it does not exist</p>
                                </CardBody>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
            <Modal
                isOpen={show}
                onClosed={handleModalClosed}
                toggle={() => setShow(!show)}
                className='modal-dialog-centered modal-lg'
            >
                <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
                <ModalBody className='px-5 pb-5'>
                    <div className='text-center mb-4'>
                        <h1>{modalType} Role</h1>
                        <p>Set role permissions</p>
                    </div>
                    <Row tag='form' onSubmit={handleSubmit(onSubmit)}>
                        <Col xs={12}>
                            <Label className='form-label' for='name'>
                                Role Name
                            </Label>
                            <Controller
                                name='name'
                                control={control}
                                render={({ field }) => (
                                    <Input {...field} id='name' placeholder='Enter role name' invalid={errors.name && true} />
                                )}
                            />
                            {errors.name && <FormFeedback>Please enter a valid role name</FormFeedback>}
                        </Col>
                        <Col xs={12} className='mt-1'>
                            <Label className='form-label' for='name'>
                                Description
                            </Label>
                            <Controller
                                name='description'
                                control={control}
                                render={({ field }) => (
                                    <Input type='text' {...field} id='name' placeholder='Enter Description' invalid={errors.name && true} />
                                )}
                            />
                            {errors.name && <FormFeedback>Please enter a valid role name</FormFeedback>}
                        </Col>
                        <Col xs={12}>
                            <h4 className='mt-2 pt-50'>Role Permissions</h4>
                            <Table className='table-flush-spacing' responsive>
                                <tbody>
                                    <tr>
                                        <td className='text-nowrap fw-bolder'>
                                            <span className='me-50'> Administrator Access</span>
                                            <Info size={14} id='info-tooltip' />
                                            <UncontrolledTooltip placement='top' target='info-tooltip'>
                                                Allows a full access to the system
                                            </UncontrolledTooltip>
                                        </td>
                                        <td>
                                            <div className='form-check'>
                                                <Input type='checkbox' id='select-all' />
                                                <Label className='form-check-label' for='select-all'>
                                                    Select All
                                                </Label>
                                            </div>
                                        </td>
                                    </tr>
                                    {rolesArr.map((role, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className='text-nowrap fw-bolder'>{role}</td>
                                                <td>
                                                    <div className='d-flex'>
                                                        <div className='form-check me-3 me-lg-5'>
                                                            <Input type='checkbox' id={`read-${role}`} />
                                                            <Label className='form-check-label' for={`read-${role}`}>
                                                                Read
                                                            </Label>
                                                        </div>
                                                        <div className='form-check me-3 me-lg-5'>
                                                            <Input type='checkbox' id={`write-${role}`} />
                                                            <Label className='form-check-label' for={`write-${role}`}>
                                                                Write
                                                            </Label>
                                                        </div>
                                                        <div className='form-check me-3 me-lg-5'>
                                                            <Input type='checkbox' id={`delete-${role}`} />
                                                            <Label className='form-check-label' for={`create-${role}`}>
                                                                Delete
                                                            </Label>
                                                        </div>
                                                        <div className='form-check me-3 me-lg-5'>
                                                            <Input type='checkbox' id={`import-${role}`} />
                                                            <Label className='form-check-label' for={`create-${role}`}>
                                                                Import
                                                            </Label>
                                                        </div>
                                                        <div className='form-check me-3 me-lg-5'>
                                                            <Input type='checkbox' id={`export-${role}`} />
                                                            <Label className='form-check-label' for={`create-${role}`}>
                                                                Export
                                                            </Label>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </Col>
                        <Col className='text-center mt-2' xs={12}>
                            <Button type='submit' color='primary' className='me-1'>
                                Submit
                            </Button>
                            <Button type='reset' outline onClick={onReset}>
                                Discard
                            </Button>
                        </Col>
                    </Row>
                </ModalBody>
            </Modal>
        </Fragment>
    )
}

export default Roles
