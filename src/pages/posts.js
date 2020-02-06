import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getPosts } from '../communication/comm';
import PostItem from '../components/postItem';
import '../style/posts.scss';

class Posts extends React.Component {
    handleLogout = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('id');
        localStorage.removeItem('token');
        localStorage.removeItem('email');
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
                        <div className='topBar'><Link to='/profile'><span role='img' aria-label='avatar'>🤠</span> {localStorage.getItem('username')}</Link></div>
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

Posts.propTypes = {
    posts: PropTypes.arrayOf(
        PropTypes.shape({
            body: PropTypes.string,
            comments: PropTypes.arrayOf(
                PropTypes.shape({
                    body: PropTypes.string,
                    createdAt: PropTypes.string,
                    id: PropTypes.number,
                    updatedAt: PropTypes.string,
                    user: PropTypes.string
                })),
            createdAt: PropTypes.string,
            id: PropTypes.number,
            likes: PropTypes.arrayOf(PropTypes.number),
            tags: PropTypes.string,
            title: PropTypes.string,
            updatedAt: PropTypes.string,
            user: PropTypes.string,
            userId: PropTypes.string
        })
    )
}

const mapStateToProps = (state) => {
    return {
        posts: state.postReducer.posts
    }
};

export default connect(mapStateToProps)(Posts);