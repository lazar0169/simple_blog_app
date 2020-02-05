import React from 'react';
import axios from 'axios';
import '../style/login.scss';

class Login extends React.Component {
    state = {
        email: '',
        password: ''
    }

    gotoRegister = (e) => {
        e.preventDefault();
        window.location.pathname = '/register';
    }

    gotoBrowse = (e) => {
        e.preventDefault();
        window.location.pathname = '/posts';
    }

    handleEmailChange = (event) => {
        const value = event.target.value;
        this.setState({
            email: value
        });
    }

    handlePasswordChange = (event) => {
        const value = event.target.value;
        this.setState({
            password: value
        });
    }

    handleLogin = async (e) => {
        e.preventDefault();
        const res = await axios.post(`http://localhost:5000/login`, this.state);
        localStorage.setItem('username', res.data.user.username);
        localStorage.setItem('email', res.data.user.email);
        localStorage.setItem('id', res.data.user.id);
        localStorage.setItem('token', res.data.token);
        window.location.pathname = '/posts';
    }

    componentDidMount() {
        if (localStorage.getItem('token')) {
            window.location.pathname = '/posts';
        }
    }

    render() {
        return (
            <form onSubmit={this.handleLogin} className='loginWrapper'>
                <button type='button' className='browseButton' onClick={this.gotoBrowse}><span role='img' aria-label='back'>◀</span> Back</button>
                <button type='button' className='registerButton' onClick={this.gotoRegister}><span role='img' aria-label='create'>📝</span> Register</button>
                <label>Email:</label>
                <input onChange={this.handleEmailChange} defaultValue={this.state.email}></input>
                <label>Password:</label>
                <input onChange={this.handlePasswordChange} value={this.state.password}></input>
                <button type='submit' className='loginButton' onClick={this.handleLogin}><span role='img' aria-label='ok'>✔</span> Login</button>
            </form>
        )
    }
}

export default Login;