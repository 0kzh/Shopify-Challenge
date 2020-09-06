import React from 'react';
import { Link } from "react-router-dom";

interface Props {}

function Home(props: Props) {
    const {} = props

    return (
        <div>
            <Link to="/accounts/sign_up">Sign up</Link>
            <Link to="/accounts/log_in">Log In</Link>
        </div>
    )
}

export default Home
