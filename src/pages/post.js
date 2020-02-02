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
        await axios.delete(`http://localhost:5000/posts/${this.props.match.params.id}&${localStorage.getItem('id')}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
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
                <button onClick={this.goBack}><span role='img' aria-label='back'>◀</span> Back</button>

                <h3 className='title'>{post.title}</h3>
                <div className='body'>{post.body}</div>
                <div className='dateTime'>
                    <span>{post.user}</span> at
                    <span>{`${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`}</span>
                    <span>{`${date.getHours()}:${date.getMinutes()}`}</span>
                </div>
                <span className='tags'>{
                    post.tags.map((tag) => {
                        return (<span key={tag}>{`#${tag}`}</span>);
                    })
                }</span>
                {
                    localStorage.getItem('token') && localStorage.getItem('id') === this.state.userId ? <React.Fragment>
                        <button className='changeButton' onClick={this.gotoChange}><span role='img' aria-label='change'>🖊</span> Change</button>
                        <button className='removeButton' onClick={this.removePost}><span role='img' aria-label='remove'>✖</span> Remove</button>
                    </React.Fragment> : <React.Fragment></React.Fragment>
                }

            </div>
        );
    }
}

export default Post;