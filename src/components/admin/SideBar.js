import {
  faCartShopping,
  faHourglassEmpty,
  faHouse,
  faMobile,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
const SideBar = () => {
  return (
    <Col md={2} className="side-bar">
      <Link to="/">
        <img
          src="../../Images/logo.png"
          style={{ width: "65%", marginLeft: "30px", marginTop: "40px" }}
        />
      </Link>
      <ul className="adminsidebar" style={{ marginTop: "50px" }}>
        <li>
          <NavLink to="/dashboard">
            <div className="navlink-container">
              <div className="icon-container">
                <FontAwesomeIcon icon={faHouse} />
              </div>
              <p style={{ marginLeft: "30px" }}>Dashboard</p>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/productmanagement">
            <div className="navlink-container">
              <div className="icon-container">
                <FontAwesomeIcon icon={faMobile} />
              </div>
              <p style={{ marginLeft: "30px" }}>Products</p>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/adminusers">
            <div className="navlink-container">
              <div className="icon-container">
                <FontAwesomeIcon icon={faUser} />
              </div>
              <p style={{ marginLeft: "30px" }}>Users</p>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/adminorders">
            <div className="navlink-container">
              <div className="icon-container">
                <FontAwesomeIcon icon={faCartShopping} />
              </div>
              <p style={{ marginLeft: "30px" }}>Orders</p>
            </div>
          </NavLink>
        </li>
      </ul>
    </Col>
  );
};
export default SideBar;
