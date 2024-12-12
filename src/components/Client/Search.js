import { Col, Container, Row } from "react-bootstrap"
import Header from "./Header"
import Footer from "./Footer"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import { faBatteryFull, faCamera, faMemory, faMicrochip, faMobile, faMobileScreen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
const Search = () => {
    const { searchname } = useParams();
    const [listProduct, setListProduct] = useState([]);
    useEffect(() => {
        fetch("http://localhost:9999/Product")
            .then((response) => response.json())
            .then((data) => {
                setListProduct(data.filter((d) => {
                    return d.Name.toLowerCase().includes(searchname.toLowerCase())
                })
                )
            });
    }, [searchname])
    return (
        <div>
            <Header />
            <Container style={{ marginTop: "70px" }}>
                <Row>
                    <Col>
                        <p style={{ fontSize: "30px" }}>Tìm thấy {listProduct.length} Kết quả với từ khoá "{searchname}"</p>
                    </Col>
                </Row>
                <Row>
                    {listProduct.map((p) => {
                        return (
                            <Col md={4} key={p.id}>
                                <div className="product">
                                    <div className="product-img">
                                        <img src={p.Images} alt="Card image" />
                                        <div className="productinfo">
                                            <Row>
                                                <Col md={12}>
                                                    <p><FontAwesomeIcon icon={faMobileScreen} />: {p.Specifications.Screen}</p>
                                                    <p><FontAwesomeIcon icon={faMemory} />: {p.Specifications.RAM}</p>
                                                    <p><FontAwesomeIcon icon={faMicrochip} />: {p.Specifications.CPU}</p>
                                                    <p><FontAwesomeIcon icon={faBatteryFull} />: {p.Specifications.Battery_capacity}</p>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                    <div>
                                        <h4>{p.Name}</h4>
                                        <div className="price">
                                            <div className="sale-price">
                                                {new Intl.NumberFormat("vi-VN", {
                                                    style: "currency",
                                                    currency: "VND",
                                                }).format((1 - p.SalePrice) * p.Price)}
                                            </div>
                                            <div className="real-price">
                                                <p>
                                                    {new Intl.NumberFormat("vi-VN", {
                                                        style: "currency",
                                                        currency: "VND",
                                                    }).format(p.Price)}
                                                </p>
                                            </div>
                                        </div>
                                        <Link
                                            to={`/dien-thoai/product-detail/${p.id}`}
                                            className="btn btn-dark"
                                            style={{ marginTop: "20px" }}
                                        >
                                            Mua Ngay
                                        </Link>
                                    </div>
                                </div>
                            </Col>
                        );
                    })}
                </Row>
            </Container>
            <Footer />
        </div>
    )
}
export default Search