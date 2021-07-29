import React, {Component,Fragment} from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import Link from 'next/link'
import SessionHelper from "../SessionHelper/SessionHelper";
import Router from "next/router";

class NavbarDesktop extends Component {

    signOut=()=>{
        SessionHelper.removeUserName();
        Router.push('/login');
    }

    render() {
        return (
            <Fragment>
                <Navbar className='nav-bar sticky-top' variant='light' expand="lg">
                        <Navbar.Brand>
                           <img src='/navlogo.svg'  alt='logo' className='nav-logo'/>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link className='text-center'>
                                    <Link activeClassName='d-none' href='/'>
                                        <div className='nav-item-div'>
                                            <i className='fa fa-home mx-1'> Dashboard</i>
                                        </div>
                                    </Link>
                                </Nav.Link>
                                <Nav.Link className='text-center'>
                                    <Link href='/user'>
                                        <div className='nav-item-div'>
                                            <i className='fa fa-user mx-1'> User</i>
                                        </div>
                                    </Link>
                                </Nav.Link>
                                <Nav.Link className='text-center'>
                                    <Link href='/category'>
                                        <div className='nav-item-div'>
                                            <i className='fa fa-list-ul mx-1'> Category</i>
                                        </div>
                                    </Link>
                                </Nav.Link>
                                <Nav.Link className='text-center'>
                                    <Link href='/product'>
                                        <div className='nav-item-div'>
                                            <i className='fa fa-shopping-bag mx-1'> Product</i>
                                        </div>
                                    </Link>
                                </Nav.Link>
                                <Nav.Link className='text-center'>
                                    <Link href='/transaction'>
                                        <div className='nav-item-div'>
                                            <i className='fa fa-money-bill mx-1'> Transaction</i>
                                        </div>
                                    </Link>
                                </Nav.Link>
                                <Nav.Link className='text-center'>
                                    <Link href='/report'>
                                        <div className='nav-item-div'>
                                            <i className='fa fa-file-invoice mx-1'> Report</i>
                                        </div>
                                    </Link>
                                </Nav.Link>
                                <div className='nav-item-div mt-2'>
                                    <button onClick={this.signOut}><i className='fa fa-sign-out-alt mx-1'> Logout</i></button>
                                </div>
                            </Nav>
                        </Navbar.Collapse>
                </Navbar>
            </Fragment>
        );
    }
}

export default NavbarDesktop;