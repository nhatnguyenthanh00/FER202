import React, { useState, useEffect } from "react";
import { Col, Container, Row, Button, Navbar, Nav } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import SideBar from "./SideBar";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import "./assets/Admin.css";
import { error } from "jquery";
import { faUser, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Dashboard = () => {
  const [orderStatus, setOrderStatus] = useState([]);
  const [numberOrder, setNumberOrder] = useState([]);
  const [orderPerMonthList, setOrderPerMonth] = useState([]);
  const [selectedYear, setSelectedYear] = useState("All Years"); // State variable for the selected year
  // const [user, setUser] = useState();

  // useEffect(() => {
  //   setUser(JSON.parse(sessionStorage.getItem("user")));
  // }, []);
  // console.log(user.roll);
  useEffect(() => {
    fetch("http://localhost:9999/OrderDetail")
      .then((res) => res.json())
      .then((data) => {
        let listOrder = [...data];
        setNumberOrder(data);
        fetch("http://localhost:9999/Order")
          .then((rs) => rs.json())
          .then((orderDe) => {
            let listOrderDe = [...orderDe];
            let result = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

            listOrder.forEach((or) => {
              const dateString = or.date;
              const year = new Date(dateString).getFullYear();
              const month = new Date(dateString).getMonth();

              if (year === parseInt(selectedYear)) {
                // Filter orders by selected year
                result[month]++;
              } else if (selectedYear === "All Years") {
                result[month]++;
              }
            });

            setOrderPerMonth(result);
          });
      });
  }, [selectedYear]);

  useEffect(() => {
    fetch("http://localhost:9999/OrderDetail")
      .then((res) => res.json())
      .then((data) => {
        let listOrder = [...data];
        let result = [0, 0, 0, 0];
        listOrder.map((order) => {
          if (order.status === 0) result[0]++;
          if (order.status === 1) result[1]++;
          if (order.status === 2) result[2]++;
          if (order.status === 3) result[3]++;
        });
        setOrderStatus(result);
      });
  }, []);

  const data = {
    labels: ["Canceled", "Preparing", "On Going", "Successfully"],
    datasets: [
      {
        data: orderStatus.map((status) =>
          ((status / numberOrder.length) * 100).toFixed(2)
        ),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#33CC99"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#33CC99"],
      },
    ],
  };

  const data2 = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Number of Orders",
        data: orderPerMonthList,
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed && context.parsed >= 0) {
              label += context.parsed + "%";
            }
            return label;
          },
        },
      },
      title: {
        display: true,
        position: "bottom",
        text: "Order Status Distribution",
      },
    },
  };
  const option2 = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        position: "bottom",
        text: "Order Per Month",
      },
    },
  };
  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };
  if (
    JSON.parse(sessionStorage.getItem("user")) != null &&
    JSON.parse(sessionStorage.getItem("user")).roll == 1
  ) {
    return (
      <div>
        <Container fluid>
          <Row>
            <SideBar />
            <Col md={10} style={{ padding: "0" }}>
              <div className="topbar row ml-1">
                <div className="col-10">
                  <h1 className="admin-title ">Data statistics</h1>
                </div>
                <div className="col-2">
                  <Link to={"/profile"}>
                    <FontAwesomeIcon icon={faUser} style={{ color: "white" }} />
                    <p style={{ color: "white" }}>Tài khoản</p>
                  </Link>
                  <Link to={"/logout"}>
                    <FontAwesomeIcon
                      icon={faSignOut}
                      style={{ color: "white" }}
                    />
                    <p style={{ color: "white" }}>Đăng xuất</p>
                  </Link>
                </div>
              </div>
              <div
                className="p-3 d-flex justify-content-center"
                style={{ minHeight: "350px" }}
              >
                <Pie data={data} options={options} />
              </div>
              <div>
                <div>
                  <label className="ml-2" htmlFor="yearFilter">
                    Select Year:{" "}
                  </label>
                  <select
                    id="yearFilter"
                    value={selectedYear}
                    onChange={handleYearChange}
                    className="custom-select w-25"
                  >
                    <option value="All Years" selected>
                      All Years
                    </option>
                    {numberOrder
                      .map((order) => {
                        const dateString = order.date;
                        const year = new Date(dateString).getFullYear();
                        return year;
                      })
                      .filter(
                        (year, index, self) => self.indexOf(year) === index
                      )
                      .map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div
                className="p-3 d-flex justify-content-center"
                style={{ minHeight: "350px" }}
              >
                <Bar data={data2} options={option2} />
              </div>
            </Col>
          </Row>
        </Container>
        <Navbar
          bg="dark"
          variant="dark"
          className="d-flex flex-column align-items-center"
        >
          <Navbar.Collapse>
            <Nav.Link href="#">
              <Icon.Facebook size={24} />
            </Nav.Link>
            <Nav.Link href="#">
              <Icon.Twitch size={24} />
            </Nav.Link>
            <Nav.Link href="https://github.com/Chien120203/Fer201m_project">
              <Icon.Github size={24} />
            </Nav.Link>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-center">
            <Navbar.Text className="text-light">
              © 2023 Your Website. All rights reserved.
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  } else {
    error("You are not allowed to access this page");
  }
};

export default Dashboard;
