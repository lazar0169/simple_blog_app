import React from 'react';
import axios from 'axios';
import PostItem from '../components/postItem';
import '../style/posts.scss';

class Posts extends React.Component {
    state = {
        posts: []
    }

    handleCreate = () => {
        window.location.pathname = `/posts/create`;
    }

    componentDidMount() {
        this.getPosts();
    }

    async getPosts() {
        const res = await axios.get('http://localhost:5000/posts');
        this.setState({ posts: res.data });
    }

    render() {
        return (
        <div className='postWrapper'>
            <button className='createButton' onClick={this.handleCreate}>Create</button>
            {
                this.state.posts.map((post) => { return <PostItem key={post._id} post={post} /> })
            }
        </div>
        )
    }
}

export default Posts;