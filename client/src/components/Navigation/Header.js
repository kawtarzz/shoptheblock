import React, { useState } from "react";
import { Collapse, Navbar, NavLink, NavbarToggler, Button, Card, NavbarBrand, Nav, NavItem, NavbarText } from 'reactstrap';
import { NavLink as RRNavLink } from "react-router-dom";
import { logout } from "../../modules/authManager";
import { useEffect } from "react";



// add padding to nav bar links and make them bigger
export default function Header({ isLoggedIn, user }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);


  return (
    <>
      <div>
        <Navbar light expand="md" style={{ "list-style": "none", padding: "1rem calc((75vw - 1000px) / 2)", justifyContent: "space-evenly", display: "flex", flex: "flex-wrap" }}>
          <NavbarBrand tag={RRNavLink} to="/">Shop the Block</NavbarBrand>
          {isLoggedIn &&
            <>
              <NavItem>
                <Button tag={RRNavLink} to="/product">Shop All</Button>
              </NavItem>
              <Card>
                <NavbarText>
                  <NavbarToggler onClick={toggle} />
                  <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                      <NavItem>
                        <p style={{ fontsize: "1.8rem" }}>

                          Welcome, {user.fullName}
                        </p>
                      </NavItem>
                      <NavItem>
                        <UserHeader />
                      </NavItem>
                    </Nav>
                  </Collapse>
                </NavbarText>
              </Card>
            </>
          }
          { /* When isLoggedIn === false, we will render the Login link */}
          {!isLoggedIn &&
            <>

              <NavItem>
                <NavLink tag={RRNavLink} to="/register">Register</NavLink>
              </NavItem>
            </>
          }
        </Navbar>
      </div>
    </>

  );
}

const UserHeader = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

  return (

    <>
      <NavbarToggler onClick={toggleDropdown} />
      <Collapse isOpen={dropdownOpen} navbar>
        <Nav>

          <NavItem>
            <NavLink tag={RRNavLink} to="/shoppingCart">Shopping Cart</NavLink>
          </NavItem>

          <NavItem>
            <NavLink tag={RRNavLink} to="/order">Orders</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={RRNavLink} to="/userprofile/details/:id">My Account</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={RRNavLink} className="nav-link"
              style={{ cursor: "pointer" }} onClick={logout}>Logout</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </>
  );
}