import React from 'react';
import '../style/home.scss';

class Home extends React.Component {

    gotoLogin = () => {
        window.location.pathname = '/login';
    }

    gotoRegister = () => {
        window.location.pathname = '/register';
    }

    gotoBrowse = () => {
        window.location.pathname = '/posts';
    }

    render() {
        return (
            <div>
                <h1> Welcome to Simple Blog </h1>
                <div className='homeWrapper'>
                    <button className='loginButton' onClick={this.gotoLogin}>Login</button>
                    <button className='registerButton' onClick={this.gotoRegister}>Register</button>
                    <button className='browseButton' onClick={this.gotoBrowse}>Browse</button>
                </div>
            </div>
        )
    }
}

export default Home;