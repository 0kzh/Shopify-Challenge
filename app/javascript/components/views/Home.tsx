import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Container,
} from "reactstrap";
import $ from "jquery";

import Navbar from '../Navbar';

import { DownloadIcon } from '@primer/octicons-react';

// gallery modules
import "justifiedGallery/dist/js/jquery.justifiedGallery.min.js";
import "justifiedGallery/dist/css/justifiedGallery.min.css";

import "magnific-popup/dist/jquery.magnific-popup.min.js";
import "magnific-popup/dist/magnific-popup.css";

interface Props {
    account: any;
    profilePath: string | null;
    logoutPath: string | null;
}

function Home(props: Props) {
    const { account, profilePath, logoutPath } = props;

    const [posts, setPosts] = useState([]);

    const getPosts = async () => {
        const { data, status } = await axios.get("/posts");
        console.log(data);
        if (status === 200) {
            setPosts(data);
        }
    };

    useEffect(() => {
        getPosts();
    }, []);

    useEffect(() => {
        console.log(profilePath);
        console.log(logoutPath);
    }, [profilePath, logoutPath]);
    

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

    const viewProfile = async (username) => {
        if (profilePath) {
            window.location.href = profilePath + username;
        }
    }

    return (
        <div>
            <Navbar account={account} profilePath={profilePath} logoutPath={logoutPath} />
            <Container>
                <div className="wrap">
                    <div className="photoStreamTitle">
                        <div id="gallery" style={{ display: 'none', marginBottom: 20 }}>
                        {posts.map(post => (
                            <div key={post.id} className="gallery-item">
                                <a className="swipebox" href={post.image.url}>
                                    <img src={post.image.url} />
                                </a>
                                <div className="jg-caption" style={styles.horizontalSplit}>
                                    <div style={styles.clickable} onClick={() => viewProfile(post.account.username)}>
                                        <img src={post.account.avatar.thumb.url} style={styles.thumb} />
                                        <span style={styles.name}>{post.account.username}</span>
                                    </div>
                                    <div style={styles.clickable}>
                                        <DownloadIcon />
                                    </div>
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
    thumb: {
        height: 24,
        width: 24,
        borderRadius: '50%',
    },
    avatar: {
        height: 36,
        width: 36,
        borderRadius: '50%',
    },
    horizontalSplit: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: 10,
    },
    name: {
        color: 'white',
        textDecoration: 'none',
        marginLeft: 10,
    },
    clickable: {
        cursor: 'pointer',
    }
};

export default Home;
