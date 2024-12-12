import { Button, Col, Container, FormControl, Row, Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState, useRef } from 'react'
import SideBar from './SideBar';
import { Link } from 'react-router-dom';
import { faEye, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const OrderManagement = () => {
    const [listOrders, setListOrders] = useState([]);
    useEffect(() => {
        fetch("http://localhost:9999/OrderDetail")
            .then((res) => res.json())
            .then((result) => {
                setListOrders(result);
            });
    }, []);
    const handleShip = (id) => {
        const updateStatus = listOrders.find((a) => {
            return a.id == id;
        })
        updateStatus.status = 2;
        fetch(`http://localhost:9999/OrderDetail/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateStatus)
        })
        const listOrderUpdated = [...listOrders];
        for (let i = 0; i < listOrderUpdated.length; i++) {
            if (listOrderUpdated[i] === id) listOrderUpdated[i].status = 2;
        }
        setListOrders(listOrderUpdated);

    }

    const handleCancle = (id) => {
        const updateStatus = listOrders.find((a) => {
            return a.id == id;
        })
        updateStatus.status = 0;
        fetch(`http://localhost:9999/OrderDetail/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateStatus)
        })
        const listOrderUpdated = [...listOrders];
        for (let i = 0; i < listOrderUpdated.length; i++) {
            if (listOrderUpdated[i] === id) listOrderUpdated[i].status = 0;
        }
        setListOrders(listOrderUpdated);
    }
    const handleComplete = (id) => {
        const updateStatus = listOrders.find((a) => {
            return a.id == id;
        })
        updateStatus.status = 3;
        fetch(`http://localhost:9999/OrderDetail/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateStatus)
        })
        const listOrderUpdated = [...listOrders];
        for (let i = 0; i < listOrderUpdated.length; i++) {
            if (listOrderUpdated[i] === id) listOrderUpdated[i].status = 3;
        }
        setListOrders(listOrderUpdated);
    }
    return (
        <div>
            <Container fluid>
                <Row>
                    <SideBar />
                    <Col md={10} style={{ padding: "0" }}>
                        <div className="topbar">
                            <h1 className="admin-title">Order Management</h1>
                        </div>
                        <div className='admin-content'>
                            <Container>
                                <Row style={{ marginBottom: "20px" }}>
                                    {/* <Col md={6}>
                                        <select onChange={(e) => filterByCategory(e)}>
                                            <option value="all">-- Filter By Category --</option>
                                            {
                                                Category.map((c) => {
                                                    return (
                                                        <option value={c.id}>{c.Category_Name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </Col> */}
                                    {/* <Col md={6}>
                                        <div className='input-group'>
                                            <FormControl type='text' placeholder='' ref={search} />
                                            <div className='input-group-prepend'>
                                                <Button className='btn-dark' onClick={() => {
                                                    const searchedList = Product.filter((t) => {
                                                        return t.Name.includes(search.current.value);
                                                    });
                                                    setSearchedProduct(searchedList);
                                                }}>
                                                    Search
                                                </Button>
                                            </div>
                                        </div>
                                    </Col> */}
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <Table>
                                            <thead>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Total Price</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </thead>
                                            <tbody>
                                                {
                                                    listOrders.map((p) => {
                                                        return (
                                                            <tr>
                                                                <td>{p.id}</td>
                                                                <td>{`${p.firstName} ${p.lastName}`}</td>
                                                                <td>{p.totalPrice}</td>
                                                                <td>
                                                                    {p.status === 0 && (
                                                                        <p style={{ color: "red" }}>Đã huỷ</p>
                                                                    )}
                                                                    {p.status === 1 && (
                                                                        <button className='btn btn-info' onClick={() => handleShip(p.id)}>Giao Hàng</button>
                                                                    )}
                                                                    {p.status === 1 && (
                                                                        <button className='btn btn-danger' onClick={() => handleCancle(p.id)}>Huỷ</button>
                                                                    )}
                                                                    {p.status === 2 && (
                                                                        <button className='btn btn-success' onClick={() => handleComplete(p.id)}>Hoàn Tất</button>
                                                                    )}
                                                                    {p.status === 3 && (
                                                                        <p style={{ color: "green" }}>Hoàn Thành</p>
                                                                    )}
                                                                </td>

                                                                <td><Link to={`/chi-tiet-don-hang/${p.id}`} title='edit'><FontAwesomeIcon icon={faEye} /></Link></td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </Table>
                                        {/* <div className='pagging'>
                                            {
                                                pagging.map((p) => {
                                                    return (
                                                        <button className='btn btn-success' style={{ marginLeft: "5px" }} onClick={() => Pagging(p)}>{p}</button>
                                                    )
                                                })
                                            }
                                        </div> */}
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default OrderManagement;