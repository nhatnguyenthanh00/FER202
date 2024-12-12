import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import Header from "./Header";
import { Link } from "react-router-dom";
import Navigation from "./Navigation";
import {
  Container,
  Row,
  Breadcrumb,
  BreadcrumbItem,
  Col,
} from "react-bootstrap";
import Footer from "./Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDeleteLeft,
  faMinus,
  faPlus,
  faRecycle,
  faRemove,
  faTrash,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./Home/assets/ShoppingCard.css";
const ShoppingCard = () => {
  const [cookies, setCookie] = useCookies(["productIds"]);
  const [productIds, setProductIds] = useState([]);
  const [listProduct, setListProduct] = useState([]);

  useEffect(() => {
    setProductIds(cookies.productIds || []);
  }, [cookies.productIds]);

  useEffect(() => {
    fetch("http://localhost:9999/Product")
      .then((response) => response.json())
      .then((data) => {
        // fetch để lấy data của product
        fetch("http://localhost:9999/Color")
          .then((res) => res.json())
          .then((dataColor) => {
            // fetch để lấy data color
            let listPrCol = [];
            data.map((p) => {
              //chạy vòng lặp cho thằng product
              dataColor.map((col) => {
                // chạy vòng lặp cho thằng color
                if (col.ProductId == p.id) {
                  // check để lọc ra những thằng color có product id trùng với product id trong color đó
                  Object.entries(productIds).map((color) => {
                    // bây giờ chạy cái list trong cookie để lấy thông tin về màu với số lượng
                    // trong cái thằng array này nó chứa các object, mỗi object có 2 thuộc tính cái thuôc tính đầu tiên là product id, thuộc tính thứ
                    // hai đó là một cái array nữa chưa cái mã màu color id đấy, với thằng quantity của product có cái mã màu đó
                    if (p.id == +color[0]) {
                      // color[0] chính là để biểu thị cho product id
                      // nếu thằng product id mà trùng với thằng
                      Object.entries(color[1]).map((value) => {
                        // cái này để lặp trong cái thằng mã màu đấy
                        if (col.id == +value[0]) {
                          //  nếu mà cái thằng col.id trong cái thằng Color fetch bên trên kia kìa có mã màu trùng với
                          // mã màu của cái thằng value này thì tạo đối tượng để đẩy vào list
                          listPrCol.push({
                            // tạo đối tượng có thuộc tính là tất cả thuộc tính của product và mấy cái linh tinh bên dướ
                            ...p,
                            colorName: col.ColorName, // lấy tene màu
                            imageColor: col.Images[0], // lấy cái ảnh đại diện của sản phẩm có màu đấy
                            quantity: value[1], // lấy sôs lượng sản phẩm
                            colorID: +value[0], // lấy cả color id để có việc dùng bên dưới nữa lúc mà tăng giảm số lượng sản phẩm hay xoá là cần nó
                          });
                        }
                      });
                    }
                  });
                }
              });
            });
            setListProduct(listPrCol);
          });
      });
  }, [productIds]);
  console.log(Object.entries(productIds));
  const getQuantity = (id, colId) => {
    let pro = listProduct.find((p) => p.colorID == colId);
    return pro.quantity;
  };

  const updateProduct = (id, colId, quantity) => {
    let pro = listProduct.find((p) => p.id == id && p.colorID == colId);
    const updatedListProductIds = { ...productIds };
    let colorId = pro.colorID;
    updatedListProductIds[id][colorId] = quantity;
    setProductIds(updatedListProductIds);
    setCookie("productIds", updatedListProductIds, { path: "/" });
  };

  const minusQuantity = (id, colId) => {
    let quantity = getQuantity(id, colId);
    if (quantity > 0) {
      updateProduct(id, colId, quantity - 1);
    }
  };
  const plusQuantity = (id, colId) => {
    let quantity = getQuantity(id, colId);
    if (quantity > 0) {
      updateProduct(id, colId, quantity + 1);
    }
  };
  const deleteProduct = (id, colId) => {
    let pro = listProduct.find((p) => p.id == id && p.colorID == colId);
    const updatedListProductIds = { ...productIds };
    let colorId = pro.colorID;
    delete updatedListProductIds[id][colorId];
    setProductIds(updatedListProductIds);
    setCookie("productIds", updatedListProductIds, { path: "/" });
  };

  return (
    <div>
      <Header />
      <Navigation />
      <Container>
        <Row>
          <Col xs={12} sm={12} md={12} className="p-0">
            <Breadcrumb>
              <BreadcrumbItem href="/">Trang Chủ</BreadcrumbItem>
              <BreadcrumbItem>Giỏ Hàng</BreadcrumbItem>
            </Breadcrumb>
          </Col>
          <Col xs={12} sm={12} md={12} className="p-0">
            <h3>Có {listProduct.length} sản phẩm trong giỏ hàng</h3>
            <hr></hr>
          </Col>
          <Col xs={12} sm={12} md={12} className="pl-0">
            {listProduct.map((product) => {
              return (
                <div className="d-flex justify-content-between w-100 mb-3">
                  <div className="d-flex w-50 ">
                    <img src={product.imageColor} width={80} height={80} />
                    <Link
                      to={`/dien-thoai/product-detail/${product.id}`}
                      className="product-name"
                    >
                      <h5>{product.Name}</h5>
                    </Link>
                  </div>
                  <div className="d-flex flex-column w-25">
                    <div className="d-flex justify-content-center">
                      <button
                        className="btn-minus"
                        onClick={() =>
                          minusQuantity(product.id, product.colorID)
                        }
                        disabled={getQuantity(product.id, product.colorID) == 1}
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                      <input
                        type="text"
                        value={getQuantity(product.id, product.colorID)}
                        style={{
                          border: "1px solid #e1e4e6",
                          width: "13%",
                          height: "100%",
                        }}
                        className="text-center"
                        readOnly
                      />
                      <button
                        className="btn-plus"
                        onClick={() =>
                          plusQuantity(product.id, product.colorID)
                        }
                        disabled={getQuantity(product.id, product.colorID) == 4}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </div>
                    <div className="d-flex justify-content-center mt-2">
                      <button
                        className="btn-delete"
                        onClick={() =>
                          deleteProduct(product.id, product.colorID)
                        }
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                        Xoá
                      </button>
                    </div>
                  </div>
                  <div className="product-price d-flex w-25 justify-content-end">
                    <div className="d-flex flex-column">
                      <p className="mb-1" style={{ color: "#cb1c22" }}>
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(
                          (1 - product.SalePrice) *
                            product.Price *
                            getQuantity(product.id, product.colorID)
                        )}
                      </p>
                      <p
                        className=""
                        style={{
                          textDecoration: "line-through",
                          fontWeight: "400",
                          color: "#99a2aa",
                        }}
                      >
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(
                          product.Price *
                            getQuantity(product.id, product.colorID)
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </Col>
          <Col xs={12} sm={12} md={12} className="pl-0">
            <hr></hr>
            <Link className="w-100 buy-btn btn" to={`/dien-thoai/purchase/2`}>
              <span className="text-uppercase">Thanh toán tất cả</span>
              <br></br>
            </Link>
          </Col>
        </Row>
      </Container>
      {/* <Footer /> */}
    </div>
  );
};
export default ShoppingCard;
