import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../style/user.scss';

class Login extends React.Component {
    state = {
        password: ''
    }

    handlePasswordChange = (event) => {
        const value = event.target.value;
        this.setState({
            password: value
        });
    }

    handleChange = async (e) => {
        e.preventDefault();
        const data = {
            password: this.state.password,
            userId: localStorage.getItem('id')
        };
        try {
            await axios.post('http://localhost:5000/password', data, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            localStorage.removeItem('username');
            localStorage.removeItem('id');
            localStorage.removeItem('token');
            localStorage.removeItem('email');
            window.location.pathname = `/posts`;
        } catch (error) {
            console.log(error);
        }
    }

    componentDidMount() {
        if (!localStorage.getItem('token')) {
            window.location.pathname = '/posts';
        }
    }

    render() {
        return (
            <form onSubmit={this.handleChange} className='profileWrapper'>
                <Link to='/posts' type='button' className='browseButton'><span role='img' aria-label='back'>◀</span> Back</Link>
                <label>Email: <span>{localStorage.getItem('email')}</span></label>
                <label>Name: <span>{localStorage.getItem('username')}</span></label>
                <label>New password:</label>
                <input onChange={this.handlePasswordChange} value={this.state.username}></input>
                <button type='submit' className='changeButton' onClick={this.handleChange}><span role='img' aria-label='ok'>✔</span> Change</button>
            </form>
        )
    }
}

export default Login;