import { useState, useEffect } from "react";
import SideBar from "./SideBar";
import { Col, Container, Row, Button, Table, Form } from "react-bootstrap";
const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(users[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchMode, setSearchMode] = useState(false);
  useEffect(() => {
    fetch("http://localhost:9999/user")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  useEffect(() => {
    setFilteredUsers(users.filter((user) => user.roll === 0));
  }, [users]);

  useEffect(() => {
    const resultSearch = filteredUsers.filter((user) => {
      let name = user.firstName + " " + user.lastName;
      return name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredUsers(resultSearch);
  }, [searchMode]);

  const updateData = (user) => {
    setCurrentUser(user);
  };

  const updateHandler = async () => {
    if (currentUser) {
      try {
        const updatedUser = {
          ...currentUser,
        };

        const response = await fetch(
          `http://localhost:9999/user/${currentUser.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedUser),
          }
        );

        if (!response.ok) {
          throw new Error("Error updating user.");
        }

        const data = await response.json();

        console.log("User updated:", data);

        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === currentUser.id ? updatedUser : user
          )
        );
      } catch (error) {
        console.error("Error updating user:", error);
      }
    }
  };
  const handleChangeStatus = async (mode) => {
    if (currentUser) {
      try {
        const updatedUser = {
          ...currentUser,
          status: mode,
        };
        console.log(updatedUser);

        const response = await fetch(
          `http://localhost:9999/user/${currentUser.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedUser),
          }
        );

        if (!response.ok) {
          throw new Error("Error updating user.");
        }

        const data = await response.json();

        console.log("User updated:", data);

        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === currentUser.id ? updatedUser : user
          )
        );
      } catch (error) {
        console.error("Error updating user:", error);
      }
    }
  };
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchMode == true) setSearchMode(false);
    else setSearchMode(true);
  };

  return (
    <Container fluid>
      <Row>
        <SideBar></SideBar>
        <Col md={10} style={{ padding: "0" }}>
          <div className="topbar">
            <h1 className="admin-title">User Management</h1>
          </div>
          <div className="admin-content">
            <Row>
              <Col md={12}>
                <Form
                  onSubmit={handleSubmit}
                  className="d-flex justify-content-center mb-2"
                >
                  <Form.Group style={{ width: "70%" }}>
                    <Form.Control
                      type="text"
                      placeholder="Search by name"
                      value={searchTerm}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <button type="submit" className="btn btn-success ml-2">
                      Search
                    </button>
                  </Form.Group>
                </Form>
              </Col>
              <Col md={12}>
                <Table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Phone</th>
                      <th>Address</th>
                      <th>Email</th>
                      <th>Date Of Birth</th>
                      <th>Account</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => {
                      return (
                        <>
                          <tr
                            key={user.id}
                            data-toggle="modal"
                            data-target="#myModal"
                            onClick={() => updateData(user)}
                          >
                            <td>{user.id}</td>
                            <td>
                              {user.firstName} {user.lastName}
                            </td>
                            <td>{user.phone}</td>
                            <td>{user.address}</td>
                            <td>{user.email}</td>
                            <td>{user.dateOfBirth}</td>
                            <td>{user.account}</td>
                            {user.status == 1 ? (
                              <td style={{ color: "green" }}>Active</td>
                            ) : (
                              <td style={{ color: "red" }}>Inactive</td>
                            )}
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </Table>
                <div class="modal fade" id="myModal">
                  <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h4 class="modal-title">Edit User Profile</h4>
                        <button
                          type="button"
                          class="close"
                          data-dismiss="modal"
                        >
                          &times;
                        </button>
                      </div>

                      <div class="modal-body">
                        {currentUser ? (
                          currentUser.status == 1 ? (
                            <button
                              type="button"
                              class="btn btn-warning"
                              data-dismiss="modal"
                              onClick={() => handleChangeStatus(0)}
                            >
                              Inactive
                            </button>
                          ) : (
                            <button
                              type="button"
                              class="btn btn-success"
                              data-dismiss="modal"
                              onClick={() => handleChangeStatus(1)}
                            >
                              Active
                            </button>
                          )
                        ) : (
                          ""
                        )}
                        <table className="w-100">
                          <tbody className="table-edit">
                            <tr>
                              <td>
                                <div className="d-flex mb-3">
                                  <span style={{ width: "30%" }}>
                                    First Name:
                                  </span>
                                  <input
                                    style={{ width: "70%" }}
                                    type="text"
                                    id="firstname"
                                    value={
                                      currentUser ? currentUser.firstName : ""
                                    }
                                    onChange={(e) =>
                                      setCurrentUser((prevUser) => ({
                                        ...prevUser,
                                        firstName: e.target.value,
                                      }))
                                    }
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="d-flex  mb-3">
                                  <span style={{ width: "30%" }}>
                                    Last Name:
                                  </span>
                                  <input
                                    style={{ width: "70%" }}
                                    type="text"
                                    id="lastname"
                                    value={
                                      currentUser ? currentUser.lastName : ""
                                    }
                                    onChange={(e) =>
                                      setCurrentUser((prevUser) => ({
                                        ...prevUser,
                                        lastName: e.target.value,
                                      }))
                                    }
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td colSpan={2}>
                                <div className="d-flex  mb-3">
                                  <span style={{ width: "30%" }}>
                                    Phone Number:
                                  </span>
                                  <input
                                    style={{ width: "70%" }}
                                    type="text"
                                    id="phone"
                                    value={currentUser ? currentUser.phone : ""}
                                    onChange={(e) =>
                                      setCurrentUser((prevUser) => ({
                                        ...prevUser,
                                        phone: e.target.value,
                                      }))
                                    }
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td colSpan={2}>
                                <div className="d-flex  mb-3">
                                  <span style={{ width: "30%" }}>Address:</span>
                                  <input
                                    style={{ width: "70%" }}
                                    type="text"
                                    id="address"
                                    value={
                                      currentUser ? currentUser.address : ""
                                    }
                                    onChange={(e) =>
                                      setCurrentUser((prevUser) => ({
                                        ...prevUser,
                                        address: e.target.value,
                                      }))
                                    }
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td colSpan={2}>
                                <div className="d-flex  mb-3">
                                  <span style={{ width: "30%" }}>Email:</span>
                                  <input
                                    style={{ width: "70%" }}
                                    type="text"
                                    id="email"
                                    value={currentUser ? currentUser.email : ""}
                                    onChange={(e) =>
                                      setCurrentUser((prevUser) => ({
                                        ...prevUser,
                                        email: e.target.value,
                                      }))
                                    }
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td colSpan={2}>
                                <div className="d-flex  mb-3">
                                  <span style={{ width: "30%" }}>
                                    Date Of Birth:
                                  </span>
                                  <input
                                    style={{ width: "70%" }}
                                    type="date"
                                    id="dob"
                                    value={
                                      currentUser ? currentUser.dateOfBirth : ""
                                    }
                                    onChange={(e) =>
                                      setCurrentUser((prevUser) => ({
                                        ...prevUser,
                                        dateOfBirth: e.target.value,
                                      }))
                                    }
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td colSpan={2}>
                                <div className="d-flex  mb-3">
                                  <span style={{ width: "30%" }}>Account:</span>
                                  <input
                                    style={{ width: "70%" }}
                                    type="text"
                                    id="acc"
                                    value={
                                      currentUser ? currentUser.account : ""
                                    }
                                    readOnly
                                  />
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-danger"
                          data-dismiss="modal"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          class="btn btn-primary"
                          onClick={updateHandler}
                          data-dismiss="modal"
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default AdminUsers;
