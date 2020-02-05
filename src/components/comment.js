import React from 'react';

class Comment extends React.Component {

    render() {
        const { comment } = this.props;
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
}

export default Comment;