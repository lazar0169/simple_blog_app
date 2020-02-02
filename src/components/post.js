import React from 'react';
import axios from 'axios';
import '../style/post.scss';

class Post extends React.Component {
    state = {
        title: '',
        createdAt: '',
        tags: [],
        body: ''
    }

    goBack = () => {
        window.location.pathname = '/posts';
    }

    gotoChange = async () => {
        window.location.pathname = `/posts/change/${this.state._id}`;
    }

    removePost = async () => {
        await axios.delete(`http://localhost:5000/posts/${this.props.match.params.id}`);
        window.location.pathname = '/posts';
    }

    componentDidMount() {
        this.getPost();
    }

    async getPost() {
        try {
            const res = await axios.get(`http://localhost:5000/posts/${this.props.match.params.id}`);
            this.setState(res.data);
        } catch (error) {
            if (error.response.status === 404) {
                window.location.pathname = '/posts';
            }
        }
    }

    render() {
        const post = this.state;
        const date = new Date(post.createdAt);
        return (
            <div className='post'>
                <button onClick={this.goBack}>Back</button>
                
                <h3 className='title'>{post.title}</h3>
                <div className='body'>{post.body}</div>
                <div className='dateTime'>
                    <span>{`${date.getDay()}.${date.getMonth() + 1}.${date.getFullYear()}`}</span> &nbsp;
                    <span>{`${date.getHours()}:${date.getMinutes()}`}</span>
                </div>
                <span className='tags'>{
                    post.tags.map((tag) => {
                        return (<span key={tag}>{`#${tag}`}</span>);
                    })
                }</span>
                <button className='changeButton' onClick={this.gotoChange}>Change</button>
                <button className='removeButton' onClick={this.removePost}>Remove</button>
            </div>
        );
    }
}

export default Post;