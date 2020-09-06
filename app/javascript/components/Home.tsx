import React from "react";
import {
    Button,
    Input,
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from "reactstrap";

const logo = require("../../assets/images/logo.svg");

interface Props {}

function Home(props: Props) {
    const {} = props;

    const preventAction = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    return (
        <div>
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
                <Nav style={styles.vCenter}>
                    <NavLink href="/accounts/sign_in">Log in</NavLink>
                    <NavLink href="/accounts/sign_up">
                        <Button color="primary">Join for free</Button>
                    </NavLink>
                </Nav>
            </Navbar>
        </div>
    );
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
};

export default Home;
