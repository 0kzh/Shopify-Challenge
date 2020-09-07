import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Container,
    Jumbotron,
    Button,
} from "reactstrap";

import Navbar from '../Navbar';
import Gallery from '../Gallery';
import { NEW_PHOTO_ROUTE } from "../../helpers/constants";

const cover = require('../../../assets/images/cover.jpeg');

interface Props {
    account: any;
}

const Home = (props: Props) => {
    const { account } = props;

    const [posts, setPosts] = useState([]);

    const getPosts = async () => {
        const { data, status } = await axios.get("/api/v1/posts");
        if (status === 200) {
            console.log(data);
            setPosts(data);
        }
    };

    useEffect(() => {
        getPosts();
    }, []);

    const newPhoto = () => {
        window.location.href = NEW_PHOTO_ROUTE;
    }

    const bgStyle = {
        background: `url(${cover})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backdropFilter: 'brightness(20%)',
    };

    return (
        <div style={styles.container}>
            <Navbar account={account} />
            <Jumbotron style={bgStyle}>
                <Container style={styles.jumbotronStyle}>
                    <h1>aperture</h1>
                    <div className="lead" style={{ marginBottom: 20 }}>
                        <div>A social network for photographers to</div>
                        <div>create, discover, and share visual photo apertures</div>
                    </div>
                    <Button color="primary" onClick={newPhoto}>Get Started</Button>
                </Container>
            </Jumbotron>
            <Container>
                <Gallery posts={posts} showAvatar={true} />
            </Container>
        </div>
    );
}

const styles = {
    container: {
        marginBottom: 100,
    },
    jumbotronStyle: {
        color: 'white',
    }
}

export default Home;
