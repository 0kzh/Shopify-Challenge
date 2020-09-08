import React, { useState, useEffect } from 'react';
import $ from "jquery";
import { PROFILE_PATH } from '../helpers/constants';

// gallery modules
import "justifiedGallery/dist/js/jquery.justifiedGallery.min.js";
import "justifiedGallery/dist/css/justifiedGallery.min.css";

import "magnific-popup/dist/jquery.magnific-popup.min.js";
import "magnific-popup/dist/magnific-popup.css";

interface Props {
    posts: any;
    showAvatar: boolean;
}

function Gallery(props: Props) {
    const { posts, showAvatar } = props;

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
        window.location.href = PROFILE_PATH + username;
    };

    return (
        <div className="wrap">
            <div className="photoStreamTitle">
                <div id="gallery" style={{ display: 'none', marginBottom: 20 }}>
                {posts.map(post => (
                    <div key={post.id} className="gallery-item">
                        <a className="swipebox" href={post.image.display.url}>
                            <img src={post.image.thumb.url} />
                        </a>
                        <div className="jg-caption" style={styles.horizontalSplit}>
                            { showAvatar &&
                                <div style={styles.clickable} onClick={() => viewProfile(post.account.username)}>
                                    <img src={post.account.avatar.thumb.url} style={styles.thumb} />
                                    <span style={styles.name}>{post.account.username}</span>
                                </div>
                            }
                        </div>
                    </div>
                ))}
                </div>
            </div>
        </div>
    );
}

const styles = {
    thumb: {
        height: 24,
        width: 24,
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

export default Gallery
