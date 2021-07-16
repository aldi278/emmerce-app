import React from 'react';
import {Navbar, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavbarBrand, NavbarText} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../redux/actions/user'


class MyNavbar extends React.Component {


    render() {
        return (
            <div>
                <Navbar color="light" light>
                    <NavbarBrand>Emmerce</NavbarBrand>
                <Nav>
                    {
                        this.props.userGlobal.userName ?
                        <>
                        <NavItem>
                            <NavbarText className="nav ">Hello, {this.props.userGlobal.userName}</NavbarText>
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
                                {
                                    this.props.userGlobal.role === "Admin" ?
                                    <DropdownItem>
                                        <Link to="/admin">Admin</Link>
                                    </DropdownItem>
                                    :
                                    null
                                }
                                <DropdownItem divider/>
                                <DropdownItem onClick={this.props.logoutUser}>
                                    Logout
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        </>
                        :
                        <NavItem>
                            <NavbarText>
                                <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
                            </NavbarText>
                        </NavItem>
                    }
                    
                </Nav>
                </Navbar>
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return ({
        userGlobal : state.user,
    })
}

const mapDispatchToProps = {
    logoutUser
}

export default connect(mapStateToProps,mapDispatchToProps)(MyNavbar);