import React from 'react';
import axios from 'axios';
import '../style/postForm.scss';

class Post extends React.Component {
    state = {
        title: '',
        createdAt: '',
        tags: '',
        body: ''
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

    submitPost = () => {
        let res;
        const tags = this.state.tags.trim().split(',');
        this.setState({
            tags: tags
        }, async () => {
            if (this.state._id !== undefined) {
                res = await axios.post(`http://localhost:5000/posts/${this.state._id}`, this.state);
            } else {
                res = await axios.post(`http://localhost:5000/posts`, this.state);
            }
            this.setState(res.data);
            window.location.pathname = `/posts/${this.state._id}`;
        });
    }

    componentDidMount() {
        this.getPost();
    }

    async getPost() {
        if (this.props.match.params.id === undefined) return;
        const res = await axios.get(`http://localhost:5000/posts/${this.props.match.params.id}`);
        res.data.tags = res.data.tags.join(',');
        this.setState(res.data);
    }

    render() {
        const post = this.state;
        return (
            <div className='postForm'>
                <button onClick={this.goBack}>Back</button>

                <label>Post title:</label>
                <input onChange={this.titleChange} value={post.title}></input>

                <label>Content:</label>
                <textarea onChange={this.bodyChange} value={post.body}></textarea>
                
                <label>Tags (separated with comma):</label>
                <input onChange={this.tagsChange} value={this.state.tags}></input>

                <button className='submitButton' onClick={this.submitPost}>Submit</button>
            </div>
        );
    }
}

export default Post;