import React, { useState } from "react";
import { Collapse, Navbar, NavLink, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap';
import { NavLink as RRNavLink } from "react-router-dom";
import { logout } from "../modules/authManager";
import CheckoutForm from "./shoppingcart/Checkout";
import ShoppingCart from "./shoppingcart/ShoppingCart";
import { CategoryDropdown } from "./category/CategoryShopper";


// add padding to nav bar links and make them bigger
export default function Header({ isLoggedIn, user }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);


  return (
    <>
      <div>
        <Navbar color="light" light expand="md">

          <NavbarBrand tag={RRNavLink} to="/">Shop the Block</NavbarBrand>

          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>

              {isLoggedIn &&
                <>
                  <NavItem>
                    <NavLink tag={RRNavLink} to="/product">Shop All</NavLink>
                  </NavItem>
                  <NavItem>
                    <CategoryDropdown />
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
      <>
        <NavItem>
          <UserHeader />

        </NavItem>
      </>
    </>

  );
}

const UserHeader = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

  return (

    <>
      <Navbar color="light" light expand="md">
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
      </Navbar>
    </>
  );
}
