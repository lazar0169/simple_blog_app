import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../style/register.scss';

class Register extends React.Component {
    state = {
        username: '',
        email: '',
        password: ''
    }

    handleNameChange = (event) => {
        const value = event.target.value;
        this.setState({
            username: value
        });
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

    handleRegister = async (e) => {
        e.preventDefault();
        await axios.post(`http://localhost:5000/register`, this.state);
        window.location.pathname = '/login';
    }

    render() {
        return (
            <form onSubmit={this.handleRegister} className='registerWrapper'>
                <Link to='/posts' className='browseButton'><span role='img' aria-label='back'>◀</span> Back</Link>
                <Link to='/login' className='loginButton'><span role='img' aria-label='login'>🔓</span> Login</Link>
                <label>User name:</label>
                <input onChange={this.handleNameChange} value={this.state.username}></input>
                <label>Email:</label>
                <input onChange={this.handleEmailChange} value={this.state.email}></input>
                <label>Password:</label>
                <input onChange={this.handlePasswordChange} value={this.state.password}></input>
                <button type='submit' className='registerButton' onClick={this.handleRegister}><span role='img' aria-label='ok'>✔</span> Register</button>
            </form>
        )
    }
}

export default Register;