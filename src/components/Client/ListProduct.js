import { Container, Row, Col } from "react-bootstrap";
import Header from "./Header";
import Footer from "./Footer";
import Navigation from "./Navigation";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBatteryFull,
  faCamera,
  faMemory,
  faMicrochip,
  faMobile,
  faMobileScreen,
} from "@fortawesome/free-solid-svg-icons";
const ListProduct = () => {
  const { catId } = useParams();
  const [category, setCategory] = useState([]);
  const [Product, setProduct] = useState([]);
  const [categoryId, setCategoryId] = useState([catId]);
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();
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
        const filtedResult = result.filter((r) => {
          for (const n of categoryId) {
            if (n == 0) return r;
            else {
              if (n == r.Category_ID) return r;
            }
          }
        })
        // setProduct(filtedResult)
        setProduct(
          filtedResult.filter((r) => {
            if (price == 0) {
              return r.Price > 0;
            } else if (price == 1) {
              return r.Price * (1 - r.SalePrice) < 2000000;
            } else if (price == 2) {
              return (
                r.Price * (1 - r.SalePrice) >= 2000000 &&
                r.Price * (1 - r.SalePrice) <= 4000000
              );
            } else if (price == 3) {
              return (
                r.Price * (1 - r.SalePrice) >= 4000000 &&
                r.Price * (1 - r.SalePrice) <= 7000000
              );
            } else if (price == 4) {
              return (
                r.Price * (1 - r.SalePrice) >= 7000000 &&
                r.Price * (1 - r.SalePrice) <= 13000000
              );
            } else {
              return r.Price * (1 - r.SalePrice) > 13000000;
            }
          })
        );

      });
  }, [categoryId, price]);
  const setCategoryIdd = (e, value) => {
    if (e.target.checked == false) {
      if (value == 0) {
        e.target.checked = true;
      }
      else {
        if (categoryId.length == 1 && categoryId[0] == value) {
          document.getElementById("all").checked = true;
          setCategoryId([0])
        }
        else
          setCategoryId(categoryId.filter((c) => {
            return c != value;
          }))
      }
    }
    else {
      if (value == 0) {
        const categoryinput = document.getElementsByName('category');
        for (const n of categoryinput) {
          n.checked = false;
        }
        setCategoryId([0])
      }
      else {
        document.getElementById("all").checked = false;
        if (categoryId[0] == 0) {
          setCategoryId([value])
        }
        else {
          setCategoryId([...categoryId, value])
        }
      }
    }
  }
  return (
    <div>
      <Header />
      <Container className="category-search">
        <Row>
          <Col md={3} >
            <nav className="navbar navbar-expand-md navbar-light bglight" style={{ padding: "0" }}>
              <div className="collapse navbar-collapse"
                id="navbarSupportedContent">
                <Container style={{ padding: "0" }}>
                  <h5>Hãng sản xuất</h5>
                  <Row >
                    <Col md={6}>
                      <input
                        type="checkbox"
                        value={0}
                        name="categoryall"
                        id="all"
                        defaultChecked={catId == 0 ? true : false}
                        onClick={(e) => {
                          setCategoryIdd(e, e.target.value);
                        }}
                      />
                      <label for="all" style={{ marginLeft: "5px" }}>
                        Tất cả
                      </label>
                    </Col>
                    {category.map((c) => {
                      return (
                        <Col md={6}>
                          <input
                            type="checkbox"
                            id={c.id}
                            value={c.id}
                            name="category"
                            onClick={(e) => {
                              setCategoryIdd(e, e.target.value);
                            }}
                            defaultChecked={catId == c.id ? true : false}
                          />
                          <label for={c.id} style={{ marginLeft: "5px" }}>
                            {c.Category_Name}
                          </label>
                        </Col>
                      );
                    })}
                  </Row>
                  <h5>Mức giá</h5>
                  <Row style={{ width: " 100%" }}>
                    <Col>
                      <ul style={{ listStyle: "none", padding: 0 }}>
                        <li>
                          <input
                            type="radio"
                            value="all"
                            name="price"
                            id="allprice"
                            defaultChecked={true}
                            onClick={() => {
                              setPrice(0);
                            }}
                          />
                          <label for="allprice" style={{ marginLeft: "5px" }}>
                            Tất cả
                          </label>
                        </li>
                        <li>
                          <input
                            type="radio"
                            value="all"
                            name="price"
                            id="below2"
                            onClick={() => {
                              setPrice(1);
                            }}
                          />
                          <label for="below2" style={{ marginLeft: "5px" }}>
                            Dưới 2 triệu
                          </label>
                        </li>
                        <li>
                          <input
                            type="radio"
                            value="all"
                            name="price"
                            id="2to4"
                            onClick={() => {
                              setPrice(2);
                            }}
                          />
                          <label for="2to4" style={{ marginLeft: "5px" }}>
                            Từ 2-4 triệu
                          </label>
                        </li>
                        <li>
                          <input
                            type="radio"
                            value="all"
                            name="price"
                            id="4to7"
                            onClick={() => {
                              setPrice(3);
                            }}
                          />
                          <label for="4to7" style={{ marginLeft: "5px" }}>
                            Từ 4-7 triệu
                          </label>
                        </li>
                        <li>
                          <input
                            type="radio"
                            value="all"
                            name="price"
                            id="7to13"
                            onClick={() => {
                              setPrice(4);
                            }}
                          />
                          <label for="7to13" style={{ marginLeft: "5px" }}>
                            Từ 7-13 triệu
                          </label>
                        </li>
                        <li>
                          <input
                            type="radio"
                            value="all"
                            name="price"
                            id="morethan13"
                            onClick={() => {
                              setPrice(5);
                            }}
                          />
                          <label for="morethan13" style={{ marginLeft: "5px" }}>
                            Trên 13 triệu
                          </label>
                        </li>
                      </ul>
                    </Col>
                  </Row>
                </Container>
              </div>
            </nav>
          </Col>
          <Col md={9}>
            <Row>
              <Col md={12} className="product-quantity">
                <h3>Điện Thoại</h3> ({Product.length} sản phẩm)
              </Col>
              <Col md={12}>
                <Row>
                  {Product.map((p) => {
                    return (
                      <Col md={4} key={p.id}>
                        <div className="product">
                          <div className="product-img">
                            <img src={p.Images} alt="Card image" />
                            <div className="productinfo">
                              <Row>
                                <Col md={12}>
                                  <p>
                                    <FontAwesomeIcon icon={faMobileScreen} />:{" "}
                                    {p.Specifications.Screen}
                                  </p>
                                  <p>
                                    <FontAwesomeIcon icon={faMemory} />:{" "}
                                    {p.Specifications.RAM}
                                  </p>
                                  <p>
                                    <FontAwesomeIcon icon={faMicrochip} />:{" "}
                                    {p.Specifications.CPU}
                                  </p>
                                  <p>
                                    <FontAwesomeIcon icon={faBatteryFull} />:{" "}
                                    {p.Specifications.Battery_capacity}
                                  </p>
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
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};
export default ListProduct;
