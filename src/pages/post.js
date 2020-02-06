import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPost, removePost } from '../communication/comm';
import '../style/post.scss';

class Post extends React.Component {
    removePost = async () => {
        removePost(this.props.match.params.id);
    }

    componentDidMount() {
        getPost(this.props.match.params.id);
    }

    render() {
        const post = this.props.post;
        if (Object.keys(post).length === 0) return(<React.Fragment></React.Fragment>);
        const date = new Date(post.createdAt);
        return (
            <div className='post'>
                <Link to='/posts'><span role='img' aria-label='back'>◀</span> Back</Link>

                <h3 className='title'>{post.title}</h3>
                <div className='body'>{post.body}</div>
                <div className='dateTime'>
                    <span>{post.user}</span> at
                    <span>{`${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`}</span>
                    <span>{`${date.getHours()}:${date.getMinutes()}`}</span>
                </div>
                <span className='tags'>{
                    post.tags.trim().split(',').map((tag) => {
                        return (<span key={tag}>{`#${tag}`}</span>);
                    })
                }</span>
                {
                    localStorage.getItem('token') && localStorage.getItem('id') === post.userId ? <React.Fragment>
                        <Link to={`/posts/change/${this.props.match.params.id}`} className='changeButton'><span role='img' aria-label='change'>🖊</span> Change</Link>
                        <button className='removeButton' onClick={this.removePost}><span role='img' aria-label='remove'>✖</span> Remove</button>
                    </React.Fragment> : <React.Fragment></React.Fragment>
                }

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