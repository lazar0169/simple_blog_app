import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updatePost, createPost } from '../communication/comm';
import '../style/postForm.scss';

class Post extends React.Component {
    state = {
        title: '',
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

    submitPost = async () => {
        const data = {
            ...this.state,
            userId: localStorage.getItem('id')
        }
        if (this.props.match.params.id) {
            updatePost(this.props.match.params.id, data);
        } else {
            createPost(data);
        }
        window.location.pathname = '/posts';
    }

    componentDidMount() {
        console.log(`/posts/${this.props.post.id}`);
        if (this.props.match.path !== '/posts/create') {
            const { title, tags, body } = this.props.post;
            this.setState({ title, tags, body });
        }
    }

    render() {
        const post = this.state;
        return (
            <div className='postForm'>
                <Link className='backButton' to={this.props.match.path === '/posts/create' ? '/posts' : `/posts/${this.props.post.id}`} onClick={this.goBack}><span role='img' aria-label='back'>◀</span> Back</Link>

                <label>Post title:</label>
                <input onChange={this.titleChange} value={post.title}></input>

                <label>Content:</label>
                <textarea onChange={this.bodyChange} value={post.body}></textarea>

                <label>Tags (separated with comma):</label>
                <input onChange={this.tagsChange} value={post.tags}></input>

                <button className='submitButton' onClick={this.submitPost}><span role='img' aria-label='ok'>✔</span> Submit</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        post: state.postReducer.selectedPost
    }
};

export default connect(mapStateToProps)(Post);