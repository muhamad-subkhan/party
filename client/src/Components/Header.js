/* eslint-disable */
import React, { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Navbar, Nav } from "react-bootstrap";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import GlobalButton from "./Atoms/Global-button";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LoginContext } from "../context/DataContext";
import { CounterContext } from "../context/Data-counter";
import Image from "../Assets/Image/User/orang.png";
import * as Icon from "react-icons/fa";
import { useQuery } from "react-query";
import { API } from "./Config/api";

function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [state, dispatch] = useContext(LoginContext);
  const [dataCounter, setDataCounter] = useContext(CounterContext);
  // console.log(state.user);

  function Logout() {
    dispatch({
      type: "LOGOUT",
      isLogin: false,
    });
    alert("Anda berhasil Logout. \n\nTerima kasih telah berkujung!!!");
    setShowLogin(true);
  }

  return (
    <>
      <Navbar expand="lg" sticky="top" className="navbar">
        <Container>
          <Navbar.Brand>
              <Link to="/">
                <img src="./image/icon.png" alt="Brand" />
              </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end fw-bold"
          >
            {state.isLogin ? (
              <Nav className="me-end">
                {state.user.role == "user" ? (
                  <div className="dropdown">
                    <Link
                      to="/ChartOrder"
                      className="text-black position-relative me-2"
                    >
                      <span
                        className="position-absolute top-0 translate-middle badge rounded-pill bg-danger"
                        style={{ left: "70%" }}
                      >
                        {dataCounter.counter.length}
                      </span>
                      <Icon.FaCartArrowDown className="fs-1 me-3" />
                    </Link>
                    <img
                      src={Image}
                      alt="Me"
                      className="dropdown dropdown-toggle"
                      data-bs-toggle="dropdown"
                    />
                    <ul className="dropdown-menu">
                      <li>
                        <Link className="dropdown-item" to="/Profile">
                          <Icon.FaUserAlt className="me-2" /> Profile
                        </Link>
                      </li>
                      <li
                        className="dropdown-item"
                        onClick={() => Logout()}
                        style={{ cursor: "pointer" }}
                      >
                        <Icon.FaSignOutAlt className="me-2" /> Logout
                      </li>
                    </ul>
                  </div>
                ) : (
                  <div className="dropdown">
                    <img
                      src={Image}
                      alt="Me"
                      className="dropdown dropdown-toggle"
                      data-bs-toggle="dropdown"
                    />
                    <ul className="dropdown-menu">
                      <li>
                        <Link className="dropdown-item" to="/Profile">
                          <Icon.FaUserAlt className="me-2" /> Profile Partner
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/AddProduct">
                          <Icon.FaHamburger className="me-2" /> Add Product
                        </Link>{" "}
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/IncomeTransaction">
                          <Icon.FaDollarSign className="me-2" /> transaction
                        </Link>{" "}
                      </li>
                      <li
                        className="dropdown-item"
                        onClick={() => Logout()}
                        style={{ cursor: "pointer" }}
                      >
                        <Icon.FaSignOutAlt className="me-2" /> Logout
                      </li>
                    </ul>
                  </div>
                )}
              </Nav>
            ) : (
              <Nav className="me-end">
                <GlobalButton
                  name="Register"
                  className="link btn text-white me-3 border-0 mb-3 mb-lg-0"
                  onClick={() => setShowRegister(true)}
                />
                <GlobalButton
                  name="Login"
                  className="link btn text-white border-0"
                  onClick={() => setShowLogin(true)}
                />
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Login
        show={showLogin}
        setShow={setShowLogin}
        setShowRegister={setShowRegister}
      />
      <Register
        show={showRegister}
        setShow={setShowRegister}
        setShowLogin={setShowLogin}
      />
    </>
  );
}

export default Header;
