import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Container,
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
import $ from "jquery";

// gallery modules
import "justifiedGallery/dist/js/jquery.justifiedGallery.min.js";
import "justifiedGallery/dist/css/justifiedGallery.min.css";

import "magnific-popup/dist/jquery.magnific-popup.min.js";
import "magnific-popup/dist/magnific-popup.css";

const logo = require("../../assets/images/logo.svg");

interface Props {
    userId: string | null;
}

function Home(props: Props) {
    const { userId } = props;

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        var GALLERY_FADE_IN = 500;

        $("#gallery").justifiedGallery({
            rowHeight: 300,
            maxRowHeight: 340,
            margins: 15,
            border: 0,
            fixedHeight: false,
            lastRow: "nojustify",
            captions: true,
        });

        $("#gallery").magnificPopup({
            delegate: "a",
            mainClass: "mfp-with-zoom",
            type: "image",
            enableEscapeKey: 'true'
        });

        $("body").on('click', '.mfp-img', () => {
            $.magnificPopup.close();
        })

        $("#gallery").justifiedGallery("norewind");

        $("#gallery").fadeIn(GALLERY_FADE_IN);
    }, [posts]);

    const getPosts = async () => {
        const { data, status } = await axios.get("/posts");
        if (status === 200) {
            setPosts(data);
        }
    };

    useEffect(() => {
        getPosts();
    }, []);

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
                {
                    userId ?
                    <Nav style={styles.vCenter}>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                My Profile
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                Log out
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                    :
                    <Nav style={styles.vCenter}>
                        <NavLink href="/accounts/sign_in">Log in</NavLink>
                        <NavLink href="/accounts/sign_up">
                            <Button color="primary">Join for free</Button>
                        </NavLink>
                    </Nav>
                }
            </Navbar>

            <Container>
                <div className="wrap">
                    <div className="photoStreamTitle">
                        <div id="gallery" style={{ display: 'none', marginBottom: 20 }}>
                        {posts.map(post => (
                            <div key={post.id} className="gallery-item">
                                <a className="swipebox" href={post.image.url}>
                                    <img src={post.image.url} />
                                </a>
                                <div className="jg-caption">
                                    {post.account.username}
                                </div>
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
            </Container>
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
