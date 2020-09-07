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
        if (status === 200) {
            setAccountData(data.profile);
            setPosts(data.posts);
        }
    }

    useEffect(() => {
        getAccountData();
    }, []);

    return (
        <div style={styles.container}>
            <Navbar account={account} />
            <div style={styles.profileDetails}>
                <img src={account.avatar.medium.url} style={styles.avatar} />
                <h2 style={styles.name}>{account.name}</h2>
                <h4 style={styles.username}>@{account.username}</h4>
            </div>
            <Container>
                <Gallery posts={posts} showAvatar={false} />
            </Container>
        </div>
    );
}

const styles = {
    profileDetails: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
        marginBottom: 50,
    },
    avatar: {
        height: 100,
        width: 100,
        borderRadius: '50%',
    },
    name: {
        marginTop: 20,
    },
    username: {
        color: '#bbbbbb',
    },
    container: {
        marginBottom: 100,
    },
};

export default Profile;
