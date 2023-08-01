import React, { useState } from "react";
import { Collapse, Navbar, NavLink, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap';
import { NavLink as RRNavLink } from "react-router-dom";
import { logout } from "../modules/authManager";

export default function Header({ isLoggedIn }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">

        <NavbarBrand tag={RRNavLink} to="/">Shop the Block</NavbarBrand>

        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>

            {isLoggedIn &&
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/">Home</NavLink>
                </NavItem>

                <NavItem>
                  <NavLink tag={RRNavLink} to="/product">Products</NavLink>
                </NavItem>

                {/* category on nav should be a drop down menu */}
                <NavItem>
                  <NavLink tag={RRNavLink} to="/categories">Categories</NavLink>
                </NavItem>



                <NavItem>
                  <NavLink tag={RRNavLink} to="/shoppingcart">Shopping Cart</NavLink>
                </NavItem>

                <NavItem>
                  <NavLink tag={RRNavLink} to="/orders">Orders</NavLink>
                </NavItem>

                <NavItem>

                  <NavLink tag={RRNavLink} to="/user/details">User Details</NavLink>
                </NavItem>

                <NavItem>
                  <a href aria-current="page" className="nav-link"
                    style={{ cursor: "pointer" }} onClick={logout}>Logout</a>
                </NavItem>
              </>
            }
            { /* When isLoggedIn === false, we will render the Login link */}
            {!isLoggedIn &&
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/login">Login</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/register">Register</NavLink>
                </NavItem>
              </>
            }
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
} 
