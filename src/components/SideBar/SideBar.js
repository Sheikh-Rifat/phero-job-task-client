import React from "react";
import { Col, Container, Nav, Row } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";

import "./SideBar.css";
const SideBar = () => {
  return (
    <div className="dashboard-section">
      <h1 className="text-center pt-5">Yooda Hostel Management System</h1>
      <div className="bg-dashboard py-5">
        <Container>
          <Row>
            <Col className="glass  text-dark rounded my-2 py-3" sm={3} md={4}>
              <div className=" dashboard-details">
                <div className="sidebar">
                  <Nav>
                    <ul className="my-3 text-start">
                      <Nav.Link as={NavLink} to="add-student">
                        <li className="my-4">Add Student</li>
                      </Nav.Link>
                      <Nav.Link as={NavLink} to="add-food">
                        <li className="my-4">Add Food</li>
                      </Nav.Link>

                      <Nav.Link as={NavLink} to="manage-all-foods">
                        <li className="my-4">Manage Foods</li>
                      </Nav.Link>

                      <Nav.Link as={NavLink} to="manage-all-students">
                        <li className="my-4"> Manage Student List</li>
                      </Nav.Link>

                      <Nav.Link as={NavLink} to="serving-food">
                        <li className="my-4">Serve Food</li>
                      </Nav.Link>
                    </ul>
                  </Nav>
                </div>
              </div>
            </Col>

            <Col
              className=" glass text-dark rounded  text-dark   my-2  py-3"
              sm={9}
              md={8}
            >
              <div className="dashboard-details">
                <div className="">
                  <Outlet />
                </div>
              </div>
              {/* <Container>
                <Routes>
                  <Route exact path={`${path}/checkOut/:orderId`}>
                    <AddFood></AddFood>
                  </Route>

                  <Route exact path={`${path}`}>
                    <ManageFoods></ManageFoods>
                  </Route>

                  <Route exact path={`${path}`}>
                    <AddStudent></AddStudent>
                  </Route>

                  <Route exact path={`${path}/manageProducts`}>
                    <ManageStudents></ManageStudents>
                  </Route>

                  <Route exact path={`${path}/addProduct`}>
                    <FoodServing></FoodServing>
                  </Route>
                </Routes>
              </Container> */}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default SideBar;
