import React from 'react';
import Comment from './comment';
import axios from 'axios';

class PostItem extends React.Component {
    state = {
        likes: [],
        newComment: ''
    }

    gotoPost = id => {
        window.location.pathname = `/posts/${this.props.post.id}`
    }

    commentChange = (event) => {
        const value = event.target.value;
        this.setState({
            newComment: value
        });
    }

    sumbitComment = async () => {
        const userId = localStorage.getItem('id');
        const postId = this.props.post.id;
        await axios.post(`http://localhost:5000/posts/comment`, { body: this.state.newComment, userId, postId }, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
    }

    renderComment = comment => {
        const date = new Date(comment.createdAt);
        return (
            <div className="comment">
                <p> {comment.body} </p>
                <div className='dateTime'>
                    <span>{comment.user}</span> at
                    <span>{`${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`}</span>
                </div>
            </div>
        );
    }

    render() {
        const { post } = this.props;
        post.comments.reverse();
        const date = new Date(post.createdAt);
        return (
            <div className='postButton'>
                <h3 onClick={this.gotoPost} className='title'>{post.title}</h3>
                <div className='body' >{post.body}</div>
                <div className='dateTime'>
                    <span>{post.user}</span> at
                    <span>{`${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`}</span>
                    {/* <span>{`${date.getHours()}:${date.getMinutes()}`}</span> */}
                </div>
                <span className='tags'>{
                    post.tags.trim().split(',').map((tag) => {
                        return (<span key={tag}>{`#${tag}`}</span>);
                    })
                }</span>
                {
                    localStorage.getItem('token') ? <React.Fragment>
                        <form className="newCommentForm">
                            <input onChange={this.commentChange} value={this.state.newComment}></input>
                            <button onClick={this.sumbitComment}>Create comment</button>
                        </form>
                    </React.Fragment> : <React.Fragment></React.Fragment>
                }
                <hr></hr>
                <div className="commentWrapper">{
                    post.comments.map((comment) => {
                        return <Comment key={comment.id} comment={comment}></Comment>
                    })
                }</div>
            </div>
        );
    }
}

export default PostItem;