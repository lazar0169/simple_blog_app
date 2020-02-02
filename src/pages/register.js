import React from 'react';
import axios from 'axios';
import '../style/register.scss';

class Register extends React.Component {
    state = {
        name: '',
        password: ''
    }

    gotoLogin = (e) => {
        e.preventDefault();
        window.location.pathname = '/login';
    }

    gotoBrowse = (e) => {
        e.preventDefault();
        window.location.pathname = '/posts';
    }

    handleNameChange = (event) => {
        const value = event.target.value;
        this.setState({
            name: value
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
                <button type='button' className='browseButton' onClick={this.gotoBrowse}><span role='img' aria-label='back'>◀</span> Back</button>
                <button type='button' className='loginButton' onClick={this.gotoLogin}><span role='img' aria-label='login'>🔓</span> Login</button>
                <label>User name:</label>
                <input onChange={this.handleNameChange} value={this.state.name}></input>
                <label>Password:</label>
                <input onChange={this.handlePasswordChange} value={this.state.password}></input>
                <button type='submit' className='registerButton' onClick={this.handleRegister}><span role='img' aria-label='ok'>✔</span> Register</button>
            </form>
        )
    }
}

export default Register;