import React from 'react';
import {Navbar, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavbarBrand, NavbarText} from 'reactstrap';
import { Link } from 'react-router-dom';

class MyNavbar extends React.Component {


    render() {
        return (
            <div>
                <Navbar color="light" light>
                    <NavbarBrand>Emmerce</NavbarBrand>
                <Nav>
                    <NavItem>
                        <NavbarText className="nav ">Hello, username</NavbarText>
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            Pages
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem>
                                <Link to="/cart">Cart</Link>
                            </DropdownItem> 
                            <DropdownItem>
                                <Link to="/history">History</Link>
                            </DropdownItem>
                            <DropdownItem>
                                <Link to="/admin">Admin</Link>
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
                </Navbar>
                
            </div>
        )
    }
}

export default MyNavbar;