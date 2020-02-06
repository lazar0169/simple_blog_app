import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../style/login.scss';

class Login extends React.Component {
    state = {
        email: '',
        password: ''
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
                <Link to='/posts' type='button' className='browseButton'><span role='img' aria-label='back'>◀</span> Back</Link>
                <Link to='/register' type='button' className='registerButton'><span role='img' aria-label='create'>📝</span> Register</Link>
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