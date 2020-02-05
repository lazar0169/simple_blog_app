import React from 'react';
import axios from 'axios';
import '../style/postForm.scss';

class Post extends React.Component {
    state = {
        id: '',
        title: '',
        createdAt: '',
        tags: '',
        body: '',
        user: '',
        userId: localStorage.getItem('id'),
        updatedAt: ''
    }

    titleChange = (event) => {
        const value = event.target.value;
        this.setState({
            title: value
        });
    }

    bodyChange = (event) => {
        const value = event.target.value;
        this.setState({
            body: value
        });
    }

    tagsChange = (event) => {
        const value = event.target.value;
        this.setState({
            tags: value
        });
    }

    goBack = () => {
        window.location.pathname = '/posts';
    }

    submitPost = async () => {
        if (this.state.id) {
            await axios.post(`http://localhost:5000/posts/${this.state.id}`, this.state, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
        } else {
            await axios.post(`http://localhost:5000/posts`, this.state, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
        }
        window.location.pathname = `/posts/${this.state.id}`;
    }

    componentDidMount() {
        this.getPost();
    }

    async getPost() {
        if (this.props.match.params.id === undefined) return;
        const res = await axios.get(`http://localhost:5000/posts/${this.props.match.params.id}`);
        this.setState(res.data);
    }

    render() {
        const post = this.state;
        return (
            <div className='postForm'>
                <button onClick={this.goBack}><span role='img' aria-label='back'>◀</span> Back</button>

                <label>Post title:</label>
                <input onChange={this.titleChange} value={post.title}></input>

                <label>Content:</label>
                <textarea onChange={this.bodyChange} value={post.body}></textarea>

                <label>Tags (separated with comma):</label>
                <input onChange={this.tagsChange} value={this.state.tags}></input>

                <button className='submitButton' onClick={this.submitPost}><span role='img' aria-label='ok'>✔</span> Submit</button>
            </div>
        );
    }
}

export default Post;