import React from 'react';
import PropTypes from 'prop-types';

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

Comment.propTypes = {
    comments: PropTypes.arrayOf(
        PropTypes.shape({
            body: PropTypes.string,
            createdAt: PropTypes.string,
            id: PropTypes.number,
            updatedAt: PropTypes.string,
            user: PropTypes.string
        }))
}


export default Comment;