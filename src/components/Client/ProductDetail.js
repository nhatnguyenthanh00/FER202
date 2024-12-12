import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "./Header";
import Navigation from "./Navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation as Nav } from "swiper";
import { useCookies } from "react-cookie";
import Footer from "./Footer";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Col,
  Container,
  Row,
  Table,
} from "react-bootstrap";
import "swiper/swiper-bundle.css";
import "./Home/assets/ProductDetail.css";
SwiperCore.use([Nav]);

const ProductDetail = () => {
  const { ID } = useParams();
  const [product, setProduct] = useState({});
  const [category, setCategory] = useState({});
  const [listImages, setImages] = useState([]);
  const [colorObj, setColorObj] = useState();
  const { Specifications } = product;
  const [cookies, setCookie] = useCookies(["productIds"]);

  useEffect(() => {
    fetch("http://localhost:9999/Product")
      .then((response) => response.json())
      .then((data) => {
        let p = data.find((pr) => pr.id == ID);
        setProduct(p);

        fetch("http://localhost:9999/Category")
          .then((response) => response.json())
          .then((data1) => {
            let cate = data1.find((c) => c.id == p.Category_ID);
            setCategory(cate);

            fetch("http://localhost:9999/Color")
              .then((response) => response.json())
              .then((data) => {
                let dataColor = data.filter((item) => item.ProductId == p.id);
                setImages(dataColor);
                setColorObj(dataColor[0]);
              });
          });
      });
  }, []);

  const handlePurchase = (product) => {
    const productId = product.id;
    const color = colorObj.id;
    const existingProductIds = cookies.productIds || {};

    if (existingProductIds[productId]) {
      // If the productId exists, check if the color exists
      if (existingProductIds[productId][color]) {
        // If the color exists, increment the count by 1
        existingProductIds[productId][color] += 1;
      } else {
        // If the color does not exist, initialize the count to 1
        existingProductIds[productId][color] = 1;
      }
    } else {
      // If the productId does not exist, initialize the count and color object
      existingProductIds[productId] = {
        [color]: 1,
      };
    }
    console.log(existingProductIds);
    setCookie("productIds", existingProductIds, { path: "/" });
  };

  const changeColor = (color) => {
    setColorObj(color);
  };

  if (typeof listImages != "undefined" && listImages.length > 0) {
    return (
      <div>
        <Header />
        <Navigation />
        <Container>
          <Row>
            <Col xs={12} sm={12} md={12} className="p-0">
              <Breadcrumb>
                <BreadcrumbItem href="/">Trang Chủ</BreadcrumbItem>
                <BreadcrumbItem href="/dien-thoai">Điện Thoại</BreadcrumbItem>
                <BreadcrumbItem href="/">
                  {category.Category_Name}
                </BreadcrumbItem>
              </Breadcrumb>
            </Col>
            <Col xs={12} sm={12} md={12} className="p-0">
              <h3 className="product-name">{product.Name}</h3>
              <hr></hr>
            </Col>
          </Row>
          <Row>
            <Col
              md={6}
              sm={12}
              xs={12}
              style={{ height: "auto", padding: "0" }}
            >
              <Swiper
                spaceBetween={50}
                slidesPerView={1}
                navigation
                loop
                className="swiper-container m-0"
                style={{ width: "100%", height: "400px" }}
              >
                {listImages
                  .find((item) => item.ColorName == colorObj.ColorName)
                  .Images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <img
                        className="swiper-image"
                        src={image}
                        alt={`Slide ${index + 1}`}
                      />
                    </SwiperSlide>
                  ))}
              </Swiper>
            </Col>
            <Col
              md={6}
              sm={12}
              xs={12}
              style={{ height: "auto", padding: "0" }}
            >
              <div className="d-flex w-100">
                <h2 className="mr-2" style={{ color: "#cb1c22" }}>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(product.Price)}
                </h2>
                {product.SalePrice != 0 ? (
                  <p
                    className=""
                    style={{
                      margin: " auto 0",
                      fontSize: "20px",
                      textDecoration: "line-through",
                      fontWeight: "400",
                      color: "#99a2aa",
                    }}
                  >
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format((1 - product.SalePrice) * product.Price)}
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div className="d-flex">
                {listImages.map((item) => {
                  let imageTitle = item.Images[0];

                  let isSelected = item.ColorName === colorObj.ColorName;
                  const divStyle = {
                    border: isSelected ? "1px solid red" : "none",
                    borderRadius: "6px",
                  };
                  return (
                    <div
                      key={item.id}
                      className="d-flex flex-column mr-3 ml-3 color-option"
                      style={{ cursor: "pointer" }}
                    >
                      <div>
                        <img
                          className="p-1 "
                          src={imageTitle}
                          alt="image color"
                          width={50}
                          height={50}
                          onClick={() => changeColor(item)}
                          style={divStyle}
                        />
                      </div>

                      <span>{item.ColorName}</span>
                    </div>
                  );
                })}
              </div>
              <div className="product-spe mb-2">
                <table className="table table-responsive">
                  <tbody style={{ width: "100%" }}>
                    {Specifications &&
                      Object.entries(Specifications).map(([key, value]) => {
                        return (
                          <tr key={key} className="p-0">
                            <td className="mr-5 p-1">{key}:</td>
                            <td className="p-1">{value}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
              <Row>
                <Col xs={12}>
                  <Link
                    className="w-100 buy-btn btn"
                    onClick={() => handlePurchase(product)}
                    to={`/dien-thoai/purchase/${product.id}/${colorObj.id}/1`}
                  >
                    <span className="text-uppercase">Mua Ngay</span>
                    <br></br>
                    <span>Giao hàng miễn phí hoặc nhận tại shop</span>
                  </Link>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
        <Footer></Footer>
      </div>
    );
  }
};
export default ProductDetail;
