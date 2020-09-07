import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Container,
} from "reactstrap";

import Navbar from '../Navbar';
import Gallery from '../Gallery';

interface Props {
    account: any;
}

const Home = (props: Props) => {
    const { account } = props;

    const [posts, setPosts] = useState([]);

    const getPosts = async () => {
        const { data, status } = await axios.get("/api/v1/posts");
        if (status === 200) {
            setPosts(data);
        }
    };

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <div>
            <Navbar account={account} />
            <Container>
                <Gallery posts={posts} showAvatar={true} />
            </Container>
        </div>
    );
}

export default Home;
