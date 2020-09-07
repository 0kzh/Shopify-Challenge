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

const logo = require("../../assets/images/logo.svg");

interface Props {
    account: any;
    profilePath: string;
    logoutPath: string;
};

function GlobalNavbar(props: Props) {
    const { account, profilePath, logoutPath } = props

    const preventAction = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };
    
    const signOut = async () => {
        if (logoutPath) {
            axios.delete(logoutPath)
        }
    };
    
    const viewProfile = async (username) => {
        if (profilePath) {
            window.location.href = profilePath + username;
        }
    }

    return (
        <Navbar>
            <NavbarBrand href="/">
                <Nav style={styles.vCenter}>
                    <NavItem>
                        <img src={logo} style={styles.logo} />
                    </NavItem>
                    <NavItem style={styles.title}>aperture</NavItem>
                    <NavItem onClick={preventAction}>
                        <Input type="text" placeholder="Search images..." />
                    </NavItem>
                </Nav>
            </NavbarBrand>
            {
                account ?
                <Nav style={styles.vCenter}>
                    <NavItem>
                        <Button>Add a photo</Button>
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav>
                            <img src={account.avatar.thumb.url} style={styles.avatar} />
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem onClick={() => viewProfile(account.username)}>
                                My profile
                            </DropdownItem>
                            <DropdownItem onClick={signOut}>
                                Log out
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
                :
                <Nav style={styles.vCenter}>
                    <NavItem style={styles.withDivider}>
                        <Button>Add a photo</Button>
                    </NavItem>
                    <NavLink href="/accounts/sign_in">
                        <Button color="link">Log in</Button>
                    </NavLink>
                    <NavLink href="/accounts/sign_up">
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
    }
};

export default GlobalNavbar
