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
                                <NavbarText className="nav mx-2">Hello, {this.props.userGlobal.userName}</NavbarText>
                            </NavItem>
                            <NavItem>
                                <NavbarText className="nav mx-2">
                                    <Link to="/" style={{textDecoration : "none", color:"inherit"}}>Home</Link>
                                </NavbarText>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret style={{color:"inherit"}}>
                                    Pages
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        <Link to="/cart">Cart ({this.props.cartGlobal.cartList.length}</Link>
                                    </DropdownItem> 
                                    <DropdownItem>
                                        <Link to="/history">History</Link>
                                    </DropdownItem>
                                    {
                                        this.props.userGlobal.role === "admin" ?
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
        cartGlobal : state.cart
    })
}

const mapDispatchToProps = {
    logoutUser
}

export default connect(mapStateToProps,mapDispatchToProps)(MyNavbar);