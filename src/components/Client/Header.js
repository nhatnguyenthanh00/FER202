import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  FormControl,
  Form,
  Button,
  FormGroup,
} from "react-bootstrap";
import {
  faBars,
  faMagnifyingGlass,
  faShoppingCart,
  faUser,
  faSignInAlt,
  faUserPlus,
  faSignOut,
  faDashboard,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
const Header = () => {
  const [user, setUser] = useState();
  const checkLogin = () => {
    if (sessionStorage.getItem("user") !== null) {
      return true;
    } else {
      return false;
    }
  };

  const searchs = useRef(null);
  const navigate = useNavigate();
  const handleSearch = () => {
    if (searchs.current) {
      navigate(`/tim-kiem/${searchs.current.value}`);
    } else {
      navigate(`/tim-kiem`);
    }
  };
  return (
    <Container fluid className="fixed-top">
      <Row>
        <Col md={12} className="header">
          <nav
            className="navbar navbar-expand-md navbar-light bglight"
            style={{ padding: "0" }}
          >
            <Row style={{ width: "100%" }}>
              <Col
                md={3}
                style={{
                  height: "50px",
                  lineHeight: "50px",
                  textAlign: "center",
                }}
                className="header-item"
              >
                <Link to="/">
                  <img
                    src="https://i.gyazo.com/d3209e2122472de851c534c609a7884b.png"
                    id="logo"
                  ></img>
                </Link>
              </Col>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <FontAwesomeIcon icon={faBars} />
              </button>
              <Col md={9}>
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <Col
                    md={7}
                    className="header-item"
                    style={{ height: "50px", padding: "5px" }}
                  >
                    <div className="input-group">
                      <FormControl
                        type="text"
                        placeholder="Nhập tên điện thoại"
                        ref={searchs}
                      />
                      <div className="input-group-prepend">
                        <Button
                          className="btn-dark"
                          onClick={() => handleSearch()}
                        >
                          <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </Button>
                      </div>
                    </div>
                  </Col>
                  <Col md={5} style={{ height: "50px", textAlign: "right" }}>
                    <div className="w-100">
                      {checkLogin() ? (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-around",
                          }}
                        >
                          {JSON.parse(sessionStorage.getItem("user")).roll ==
                          1 ? (
                            <Link
                              style={{
                                textAlign: "center",
                                display: "inline-block",
                                marginRight: "10px",
                              }}
                              to={"/dashboard"}
                            >
                              <FontAwesomeIcon
                                icon={faDashboard}
                                style={{ color: "white" }}
                              />
                              <p style={{ color: "white" }}>DashBoard</p>
                            </Link>
                          ) : (
                            <Link
                              style={{
                                textAlign: "center",
                                display: "inline-block",
                                marginRight: "10px",
                              }}
                              to={"/shoppingcard"}
                            >
                              <FontAwesomeIcon
                                icon={faShoppingCart}
                                style={{ color: "white" }}
                              />
                              <p style={{ color: "white" }}>Giỏ hàng</p>
                            </Link>
                          )}
                          <Link
                            to={"/profile"}
                            style={{
                              textAlign: "center",
                              display: "inline-block",
                              marginRight: "10px",
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faUser}
                              style={{ color: "white" }}
                            />
                            <p style={{ color: "white" }}>Tài khoản</p>
                          </Link>
                          <Link
                            to={"/logout"}
                            style={{
                              textAlign: "center",
                              display: "inline-block",
                              marginRight: "10px",
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faSignOut}
                              style={{ color: "white" }}
                            />
                            <p style={{ color: "white" }}>Đăng xuất</p>
                          </Link>
                        </div>
                      ) : (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-around",
                          }}
                        >
                          <Link
                            style={{
                              textAlign: "center",
                              display: "inline-block",
                              marginRight: "10px",
                            }}
                            to={"/shoppingcard"}
                          >
                            <FontAwesomeIcon
                              icon={faShoppingCart}
                              style={{ color: "white" }}
                            />
                            <p style={{ color: "white" }}>Giỏ hàng</p>
                          </Link>
                          <Link to={"/login"} style={{ textAlign: "center" }}>
                            <FontAwesomeIcon
                              icon={faSignInAlt}
                              style={{ color: "white" }}
                            />
                            <p style={{ color: "white" }}>Đăng Nhập</p>
                          </Link>
                          <Link to={"/signup"} style={{ textAlign: "center" }}>
                            <FontAwesomeIcon
                              icon={faUserPlus}
                              style={{ color: "white" }}
                            />
                            <p style={{ color: "white" }}>Đăng Ký</p>
                          </Link>
                        </div>
                      )}
                    </div>
                  </Col>
                </div>
              </Col>
            </Row>
          </nav>
        </Col>
      </Row>
    </Container>
  );
};
export default Header;
