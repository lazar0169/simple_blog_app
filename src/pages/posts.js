import React from 'react';
import axios from 'axios';
import PostItem from '../components/postItem';
import '../style/posts.scss';

class Posts extends React.Component {
    state = {
        posts: []
    }

    gotoLogin = () => {
        window.location.pathname = '/login';
    }

    gotoRegister = () => {
        window.location.pathname = '/register';
    }

    handleCreate = () => {
        window.location.pathname = `/posts/create`;
    }

    handleLogout = () => {
        localStorage.removeItem('name');
        localStorage.removeItem('id');
        localStorage.removeItem('token');
        window.location.pathname = `/posts`;
    }

    componentDidMount() {
        this.getPosts();
    }

    async getPosts() {
        const res = await axios.get('http://localhost:5000/posts');
        this.setState({ posts: res.data.reverse() });
    }

    render() {
        return (
            <div className='postWrapper'>
                {
                    localStorage.getItem('token') ? <React.Fragment>
                        <div className='topBar'><span role='img' aria-label='avatar'>🤠</span> {localStorage.getItem('name')}</div>
                        <button className='logoutButton' onClick={this.handleLogout}><span role='img' aria-label='logout'>👋</span> Logout</button>
                        <button className='createButton' onClick={this.handleCreate}><span role='img' aria-label='create'>✍</span> Create</button>
                    </React.Fragment> : <React.Fragment>
                            <button className='loginButton' onClick={this.gotoLogin}><span role='img' aria-label='login'>🔓</span> Login</button>
                            <button className='registerButton' onClick={this.gotoRegister}><span role='img' aria-label='create'>📝</span> Register</button>
                        </React.Fragment>
                }
                {
                    this.state.posts.map((post) => { return <PostItem key={post._id} post={post} /> })
                }
            </div>
        )
    }
}

export default Posts;