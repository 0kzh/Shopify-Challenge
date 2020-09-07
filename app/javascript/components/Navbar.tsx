import React from 'react';
import axios from 'axios';
import {
    Button,
    Input,
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "reactstrap";

import { NEW_PHOTO_ROUTE, PROFILE_PATH, LOGOUT_PATH, LOGIN_PATH, SIGNUP_PATH } from '../helpers/constants';

const logo = require("../../assets/images/logo.svg");

interface Props {
    account: any;
};

function GlobalNavbar(props: Props) {
    const { account } = props

    const preventAction = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };
    
    const viewProfile = async (username) => {
        window.location.href = PROFILE_PATH + username;
    }

    const newPhoto = async () => {
        window.location.href = NEW_PHOTO_ROUTE;
    };

    return (
        <Navbar style={styles.navbar}>
            <NavbarBrand href="/">
                <Nav style={styles.vCenter}>
                    <NavItem>
                        <img src={logo} style={styles.logo} />
                    </NavItem>
                    <NavItem style={styles.title}>aperture</NavItem>
                </Nav>
            </NavbarBrand>
            {
                account ?
                <Nav style={styles.vCenter}>
                    <NavItem style={styles.withDivider}>
                        <Button onClick={newPhoto}>Add a photo</Button>
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav>
                            <img src={account.avatar.thumb.url} style={styles.avatar} />
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem onClick={() => viewProfile(account.username)}>
                                My profile
                            </DropdownItem>
                            <DropdownItem>
                                <a href="/accounts/sign_out" data-method="delete" rel="nofollow" style={styles.noStyle}>
                                    Log out
                                </a>
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
                :
                <Nav style={styles.vCenter}>
                    <NavItem style={styles.withDivider}>
                        <Button onClick={newPhoto}>Add a photo</Button>
                    </NavItem>
                    <NavLink href={LOGIN_PATH}>
                        <Button color="link">Log in</Button>
                    </NavLink>
                    <NavLink href={SIGNUP_PATH}>
                        <Button color="primary">Join for free</Button>
                    </NavLink>
                </Nav>
            }
        </Navbar>
    )
}

const styles = {
    logo: {
        height: 24,
        width: 24,
    },
    vCenter: {
        display: "flex",
        alignItems: "center",
    },
    title: {
        color: "black",
        marginLeft: 10,
        marginRight: 30,
    },
    avatar: {
        height: 36,
        width: 36,
        borderRadius: '50%',
    },
    withDivider: {
        borderRight: '1px solid #D9DBDB',
        paddingRight: 20,
    },
    navbar: {
        marginLeft: 30,
        marginRight: 30,
    },
    noStyle: {
        color: "black",
        textDecoration: "none",
    }
};

export default GlobalNavbar
