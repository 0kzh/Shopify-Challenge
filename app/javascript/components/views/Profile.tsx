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

const Profile = (props: Props) => {
    const { account } = props;

    const [posts, setPosts] = useState([]);
    const [accountData, setAccountData] = useState(null);

    const getAccountData = async () => {
        const { data, status } = await axios.get(`/api/v1/account/${account.username}`);
        console.log(data);
        if (status === 200) {
            setAccountData(data.profile);
            setPosts(data.posts);
        }
    }

    useEffect(() => {
        getAccountData();
    }, []);

    return (
        <div>
            <Navbar account={account} />
            <Container>
                <Gallery posts={posts} showAvatar={false} />
            </Container>
        </div>
    );
}

export default Profile;
