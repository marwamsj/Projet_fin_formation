import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "./Header.css";
import { useSelector, useDispatch } from "react-redux";
import { signout } from "../../JS/Actions/auth";
import { signouta } from "../../JS/Actions/auth";
import { signoutdmin } from "../../JS/Actions/auth";

function Header() {
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const logout = () => {
    dispatch(signout());
  };
  const logoutAtl = () => {
    dispatch(signouta());
  };
  const logoutAdmin = () => {
    dispatch(signoutdmin());
  };

  const loggedInPatient = () => {
    return (
      <>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/">
              <Nav.Link>Accueil</Nav.Link>
            </LinkContainer>
            <div className="logo-loggedIn">
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <div className="logo-profil">
                    <img
                      src={
                        auth.user.pofilePicture
                          ? auth.user.pofilePicture
                          : "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png"
                      }
                      alt={auth.user.username}
                    />
                    <p>{auth.user.username}</p>
                  </div>
                  <NavDropdown id="basic-nav-dropdown">
                    <div className="dropdown-item-patient">
                      <LinkContainer to="/profileuser">
                        <NavDropdown.Item>Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/product">
                        <NavDropdown.Item>Products</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/workshop-cartes">
                        <NavDropdown.Item>Workshop Cartes</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/patient-needs">
                        <NavDropdown.Item>Patients Needs</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/">
                        <NavDropdown.Item onClick={logout}>
                          Sign out
                        </NavDropdown.Item>
                      </LinkContainer>
                    </div>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </div>
          </Nav>
        </Navbar.Collapse>
      </>
    );
  };

  const loggedInAtelier = () => {
    return (
      <>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/">
              <Nav.Link>Accueil</Nav.Link>
            </LinkContainer>
            <div className="logo-loggedIn">
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <div className="logo-profil">
                    <img
                        src={
                       auth.user.pofilePicture
                       ? auth.user.pofilePicture
                       : "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png"
                        }
                      alt={auth.user.username}
                    />
                    <p>{auth.user.username}</p>
                  </div>
                  <NavDropdown id="basic-nav-dropdown">
                    <div className="dropdown-item-patient">
                      <LinkContainer to="/profileuser">
                        <NavDropdown.Item>Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/product">
                        <NavDropdown.Item>PRODUCTS</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/product/addProduct">
                        <NavDropdown.Item>CREATE PRODUCT</NavDropdown.Item>
                      </LinkContainer>

                      <LinkContainer to="/workshop-cartes">
                        <NavDropdown.Item>WORKSHOP CARTES</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/carte">
                        <NavDropdown.Item>CREATE CARTE</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/patient-needs">
                        <NavDropdown.Item>PATIENTS NEEDS</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/">
                        <NavDropdown.Item onClick={logoutAtl}>
                          Sign out
                        </NavDropdown.Item>
                      </LinkContainer>
                    </div>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </div>
          </Nav>
        </Navbar.Collapse>
      </>
    );
  };
  const loggedInAdmin = () => {
    return (
      <>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto-admin">
            <LinkContainer to="/product">
              <Nav.Link>PRODUCTS</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/product/addProduct">
              <Nav.Link>CREATE PRODUCT</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/category">
              <Nav.Link>CATEGORY</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/workshop-cartes">
              <Nav.Link>WORKSHOP CARTES</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/carte">
              <Nav.Link>CREATE CARTE</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/patient-needs">
              <Nav.Link>PATIENTS NEEDS</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/">
              <Nav.Link onClick={logoutAdmin}>LOGOUT</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </>
    );
  };
  const notLoggedInLinks = () => {
    return (
      <>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/">
              <Nav.Link>About Us</Nav.Link>
            </LinkContainer>
            <NavDropdown title="Login ✥ Register" id="basic-nav-dropdown">
              <LinkContainer to="/patient/login">
                <NavDropdown.Item>Customer Patient</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/atelier/login">
                <NavDropdown.Item>Customer Workshop</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/admin/login">
                <NavDropdown.Item>Administration</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </>
    );
  };
  return (
    <Navbar bg="light" expand="lg">
      <div className="logo">
        <Navbar.Brand href="/" style={{ color: "#00c3a5" }}>
          Prosthesis
        </Navbar.Brand>
        <Navbar.Brand href="/" style={{ color: "#ababab" }}>
          Group
        </Navbar.Brand>
      </div>
      {auth.authenticate
        ? loggedInPatient()
        : auth.authenticateatl
        ? loggedInAtelier()
        : auth.authenticateadmin
        ? loggedInAdmin()
        : notLoggedInLinks()}
    </Navbar>
  );
}

export default Header;
