import React from 'react';
import { Link } from 'react-router-dom';
import '../style/home.scss';

class Home extends React.Component {
    render() {
        return (
            <div>
                <h1> Welcome to Simple Blog </h1>
                <div className='homeWrapper'>
                    <Link to='/login' className='loginButton' >Login</Link>
                    <Link to='/register' className='registerButton' >Register</Link>
                    <Link to='/posts' className='browseButton' >Browse</Link>
                </div>
            </div>
        )
    }
}

export default Home;