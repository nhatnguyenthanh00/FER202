import { Button, Col, Container, FormControl, Row, Table } from 'react-bootstrap'
import SideBar from './SideBar'
import './assets/Admin.css'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
const OrderDetail = () => {
    const { id } = useParams();
    const [listOrders, setListOrders] = useState([]);
    const [listOrderDetail, setListOrderDetail] = useState([]);
    useEffect(() => {
        fetch("http://localhost:9999/OrderDetail")
            .then((res) => res.json())
            .then((result) => {
                setListOrderDetail(result.find((a) => {
                    return a.id == id;
                }))
            });
    }, []);
    useEffect(() => {
        fetch("http://localhost:9999/Order")
            .then((res) => res.json())
            .then((result) => {
                fetch("http://localhost:9999/Product")
                    .then((res) => res.json())
                    .then((product) => {
                        fetch("http://localhost:9999/Color")
                            .then((res) => res.json())
                            .then((color) => {
                                const orders = result.filter((r) => {
                                    return r.OrderDetailId == id
                                })
                                let listorder = [];
                                orders.map((o) => {
                                    const product1 = product.find((p) => {
                                        return p.id == o.product_id;
                                    })

                                    const colors = color.find((p) => {
                                        return p.ColorName == o.Color;
                                    })
                                    listorder.push({
                                        ...o,
                                        ProductName: product1.Name,
                                        Image: colors.Images[0]
                                    })
                                });
                                console.log(`Truoc ${listorder}`)
                                setListOrders(listorder)
                            });
                    })
            });
    }, []);
    return (
        <div>
            {
                console.log(listOrders.length)
            }
            {
                console.log(listOrders)
            }
            <Container fluid>
                <Row>
                    <SideBar />
                    <Col md={10} style={{ padding: "0" }}>
                        <div className="topbar">
                            <h1 className="admin-title">Order Detail</h1>
                        </div>
                        <div className='admin-content'>
                            <Container>
                                <Row>
                                    <Col md={12}>
                                        <Table>
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Name</th>
                                                    <th>Image</th>
                                                    <th>Color</th>
                                                    <th>Quantity</th>
                                                    <th>Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    listOrders.map((p) => {
                                                        return (
                                                            <tr>
                                                                <td>{p.id}</td>
                                                                <td>{p.ProductName}</td>
                                                                <td><img style={{height:"70px"}}src={p.Image}/></td>
                                                                <td>{p.Color}</td>
                                                                <td>{p.Quantity}</td>
                                                                <td>{p.Price}</td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </Table>
                                    </Col>
                                    <Col md={12}>
                                        <h3>Customer Information</h3>
                                        <p>Name: {`${listOrderDetail.firstName} ${listOrderDetail.lastName}`}</p>
                                        <p>Phone Number: {listOrderDetail.phone}</p>
                                        <p>Address: {listOrderDetail.address}</p>
                                        <p>Email: {listOrderDetail.email}</p>
                                        <p>Purchase Method: {listOrderDetail.purchaseMethod}</p>
                                        <h4 style={{color:"red"}}>Total Price: {listOrderDetail.totalPrice}</h4>
                                        
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
export default OrderDetail;