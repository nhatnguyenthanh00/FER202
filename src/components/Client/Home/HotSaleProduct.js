import { Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBatteryFull,
  faCamera,
  faFireFlameCurved,
  faMemory,
  faMicrochip,
  faMobile,
  faMobileScreen,
} from "@fortawesome/free-solid-svg-icons";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const HotSaleProduct = () => {
  const [topcourse, setTopCourse] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9999/Product")
      .then((res) => res.json())
      .then((result) => {
        setTopCourse(
          result
            .sort((a, b) => {
              return b.SalePrice - a.SalePrice;
            })
            .slice(0, 9)
        );
      });
  }, []);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <Container
      style={{
        marginTop: "50px",
        backgroundColor: "white",
        paddingTop: "30px",
        paddingBottom: "30px",
      }}
    >
      <h3 style={{ marginBottom: "20px", color: "rgb(245, 59, 34)" }}>
        HOT SALE <FontAwesomeIcon icon={faFireFlameCurved} />
      </h3>
      <Carousel responsive={responsive}>
        {topcourse.map((p) => {
          return (
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
                  className="btn btn-dark mua-ngay"
                >
                  Mua Ngay
                </Link>
              </div>
            </div>
          );
        })}
      </Carousel>
    </Container>
  );
};
export default HotSaleProduct;
