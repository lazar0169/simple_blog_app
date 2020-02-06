import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPosts } from '../communication/comm';
import PostItem from '../components/postItem';
import '../style/posts.scss';

class Posts extends React.Component {
    handleLogout = () => {
        localStorage.removeItem('name');
        localStorage.removeItem('id');
        localStorage.removeItem('token');
        window.location.pathname = `/posts`;
    }

    componentDidMount() {
        getPosts();
    }

    render() {
        return (
            <div className='postWrapper'>
                {
                    localStorage.getItem('token') ? <React.Fragment>
                        <div className='topBar'><span role='img' aria-label='avatar'>🤠</span> {localStorage.getItem('username')}</div>
                        <button className='logoutButton' onClick={this.handleLogout}><span role='img' aria-label='logout'>👋</span> Logout</button>
                        <Link to='/posts/create' className='createButton' onClick={this.handleCreate}><span role='img' aria-label='create'>✍</span> Create</Link>
                    </React.Fragment> : <React.Fragment>
                            <Link to='/login' className='loginButton' ><span role='img' aria-label='login'>🔓</span> Login</Link>
                            <Link to='/register' className='registerButton'><span role='img' aria-label='create'>📝</span> Register</Link>
                        </React.Fragment>
                }
                {
                    this.props.posts.map((post) => { return <PostItem key={post.id} post={post} /> })
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.postReducer.posts
    }
};

export default connect(mapStateToProps)(Posts);