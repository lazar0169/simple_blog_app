import React from 'react';

class PostItem extends React.Component {
    gotoPost = id => {
        window.location.pathname = `/posts/${this.props.post._id}`
    }

    render() {
        const { post } = this.props;
        const date = new Date(post.createdAt);
        return (
            <button className='postButton' onClick={this.gotoPost}>
                <h3 className='title'>{post.title}</h3>
                <div className='body' >{post.body}</div>
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
            </button>
        );
    }
}

export default PostItem;