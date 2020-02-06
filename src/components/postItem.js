import React from 'react';
import { Link } from 'react-router-dom';
import Comment from './comment';
import { submitComment, likeOrDislike } from '../communication/comm'

class PostItem extends React.Component {
    state = {
        likes: [],
        newComment: ''
    }

    commentChange = (event) => {
        const value = event.target.value;
        this.setState({
            newComment: value
        });
    }

    handleLike = () => {
        const userId = localStorage.getItem('id');
        const postId = this.props.post.id;
        likeOrDislike({ userId, postId });
    }

    sumbitComment = async () => {
        const userId = localStorage.getItem('id');
        const postId = this.props.post.id;
        submitComment({ body: this.state.newComment, userId, postId });
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
        const date = new Date(post.createdAt);
        const likesCount = post.likes.length;
        return (
            <div className='postButton'>
                <Link to={`/posts/${this.props.post.id}`} className='title'>{post.title}</Link>
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
                <span className='likes'>
                    {
                        localStorage.getItem('token') ?
                            <span onClick={this.handleLike} className={post.likes.includes(Number(localStorage.getItem('id'))) ? 'likeButton liked' : 'likeButton'} role='img' aria-label='ok'>♥</span>
                            : ''
                    }
                    <span className='likesCount'>{likesCount}</span>people liked this</span>
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
                    post.comments.length !== 0 ?
                        post.comments.map((comment) => {
                            return <Comment key={comment.id} comment={comment}></Comment>
                        }).reverse() :
                        <i>No comments yet</i>
                }</div>
            </div>
        );
    }
}

export default PostItem;