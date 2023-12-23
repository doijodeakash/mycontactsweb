import _ from 'lodash'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ContactList, DeleteContact } from 'src/store/actions'
// import ContactForm from "./ContactForm";
import { Link } from 'react-router-dom'
import Pagination from 'src/common/components/Pagination'

const { Card, Row, Col, Table, Button } = require('reactstrap')

const List = () => {
    const contactData = useSelector((state) => state.Contact)
    const list = _.get(contactData, 'ContactList')

    const dispatch = useDispatch()
    const { page, limit } = useSelector((state) => state.Pagination)

    useEffect(() => {
        const params = {
            _limit: Number(limit),
            _page: Number(page),
            _sort: 'name',
            _order: 'ASC'
        }
        dispatch(ContactList(params))
    }, [limit, page])

    const handleDelete = async (id) => {
        await dispatch(DeleteContact(id))
        dispatch(ContactList())
    }
    return (
        <Row>
            <Col>
                <div className='d-flex justify-content-end m-4'>
                    <Link
                        color='primary'
                        className='btn btn-primary w-lg waves-effect waves-light'
                        to='/create-contact'
                        state={{}}
                    >
                        Create
                    </Link>
                </div>
                <Card className='m-3'>
                    <Row>
                        <Col>
                            <div className='table-responsive m-4'>
                                <Table className='table mb-0 cust-tab table-centered tab-img'>
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Image</th>
                                            <th className='text-center'>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {list &&
                                            list.map((row, index) => (
                                                <tr id={index} key={index} className='d-table-row'>
                                                    {/* <td>{index + 1}</td> */}
                                                    <td>{(page - 1) * limit + (index + 1)}</td>
                                                    <td>{row.name}</td>
                                                    <td>{row.email}</td>
                                                    <td>{row.phone}</td>
                                                    <td>
                                                        {row.imgPath ? (
                                                            <img
                                                                alt=''
                                                                src={`${row.imgPath}`}
                                                                className='list-input-img'
                                                            />
                                                        ) : (
                                                            <p className='h7'>
                                                                Image Not Available
                                                            </p>
                                                        )}
                                                    </td>
                                                    <td className='p-3 d-table-cell align-items-center'>
                                                        <div className='d-flex justify-content-evenly'>
                                                            <Link
                                                                color='primary'
                                                                className='btn btn-primary w-lg waves-effect waves-light'
                                                                to='/create-contact'
                                                                state={{ data: list, index }}
                                                            >
                                                                Edit
                                                            </Link>
                                                            <Button
                                                                color='danger'
                                                                className='btn btn-primary w-lg waves-effect waves-light'
                                                                onClick={() => {
                                                                    handleDelete(row.id)
                                                                }}
                                                            >
                                                                Delete
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </Table>
                            </div>
                            <Col lg={12}>
                                <Pagination />
                            </Col>
                        </Col>
                        {/* <Row></Row> */}
                    </Row>
                </Card>
            </Col>
        </Row>
    )
}
export default List
