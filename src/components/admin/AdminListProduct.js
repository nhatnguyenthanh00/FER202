import { Button, Col, Container, FormControl, Row, Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState, useRef } from 'react'
import SideBar from './SideBar';
import { Link } from 'react-router-dom';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
const AdminListProduct = () => {
    const [Product, setProduct] = useState([]);
    const [searchedProduct, setSearchedProduct] = useState([]);
    const [Category, setCategory] = useState([]);
    const [paggingProducts, setPaggingProducts] = useState([]);
    const [pagging, setPagging] = useState([]);
    const search = useRef("");
    useEffect(() => {
        fetch("http://localhost:9999/Category")
            .then((res) => res.json())
            .then((result) => {
                setCategory(result);
            });
    }, []);
    useEffect(() => {
        fetch("http://localhost:9999/Product")
            .then((res) => res.json())
            .then((result) => {
                if (result.length >= 10) {
                    setPaggingProducts(result.slice(0, 10))
                }
                else setPaggingProducts(result.slice(0, result.length));
                let setpagging = [];
                let end;
                if (result.length % 10 == 0) end = result.length / 10;
                else end = result.length / 10 + 1;
                for (let i = 1; i <= end; i++) {
                    setpagging = [...setpagging, i]
                }
                setPagging(setpagging);
                setSearchedProduct(result);
                setProduct(result);
            });
    }, [])
    useEffect(() => {
        if (searchedProduct.length >= 10) {
            setPaggingProducts(searchedProduct.slice(0, 10))
        }
        else setPaggingProducts(searchedProduct.slice(0, searchedProduct.length));
        let setpagging = [];
        let end;
        if (searchedProduct.length % 10 == 0) end = searchedProduct.length / 10;
        else end = searchedProduct.length / 10 + 1;
        for (let i = 1; i <= end; i++) {
            setpagging = [...setpagging, i]
        }
        setPagging(setpagging);
    }, [searchedProduct])
    const Pagging = (index) => {
        if (Product.length > index * 10) {
            setPaggingProducts(searchedProduct.slice((index - 1) * 10, index * 10))
        }
        else setPaggingProducts(searchedProduct.slice((index - 1) * 10, searchedProduct.length))
    }
    const filterByCategory = (e) => {
        if (e.target.value == "all") setSearchedProduct(Product);
        else {
            setSearchedProduct(Product.filter((p) => {
                return p.Category_ID == e.target.value;
            }))
        }
    }
    return (
        <div>
            <Container fluid>
                <Row>
                    <SideBar />
                    <Col md={10} style={{ padding: "0" }}>
                        <div className="topbar">
                            <h1 className="admin-title">Product Management</h1>
                        </div>
                        <div className='admin-content'>
                            <Container>
                                <Row style={{ marginBottom: "20px" }}>
                                    <Col md={4}>
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
                                    </Col>
                                    <Col md={6}>
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
                                    </Col>
                                    <Col md={2}>
                                        <Link to="/createproduct"><Button className='btn-success'>
                                            Create
                                        </Button></Link>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <Table>
                                            <thead>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Category</th>
                                                <th>Price</th>
                                                <th>SalePrice</th>
                                                <th>Action</th>
                                            </thead>
                                            <tbody>
                                                {
                                                    paggingProducts.map((p) => {
                                                        return (
                                                            <tr>
                                                                <td>{p.id}</td>
                                                                <td>{p.Name}</td>
                                                                <td>{
                                                                    Category.map((c) => {
                                                                        if (c.id == p.Category_ID) return c.Category_Name
                                                                    })
                                                                }</td>
                                                                <td>{p.Price}</td>
                                                                <td>{p.SalePrice}</td>
                                                                <td><Link to={`/chi-tiet-san-pham/${p.id}`} title='edit'><FontAwesomeIcon icon={faPenToSquare} /></Link></td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </Table>
                                        <div className='pagging'>
                                            {
                                                pagging.map((p) => {
                                                    return (
                                                        <button className='btn btn-success' style={{ marginLeft: "5px" }} onClick={() => Pagging(p)}>{p}</button>
                                                    )
                                                })
                                            }
                                        </div>
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
export default AdminListProduct;