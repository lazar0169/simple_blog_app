import { ACTIONS } from './types';

const initState = {
    posts: [],
    selectedPost: {}
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case ACTIONS.INIT:
            return {
                ...state,
                posts: action.data
            }
        case ACTIONS.SELECT_POST:
            return {
                ...state,
                selectedPost: action.data
            }
        // case ACTIONS.DELETE_POST:
        //     return {
        //         ...state,
        //         posts: state.posts.filter(post => post.id !== action.data)
        //     }
        // case ACTIONS.EDIT_POST:
        //     return {
        //         ...state,
        //         posts: state.posts.map(post => {
        //             if (post.id === action.data.id) {
        //                 return action.data.data;
        //             } else {
        //                 return post;
        //             }
        //         })
        //     }
        // case ACTIONS.CREATE_POST:
        //     return {
        //         ...state,
        //         posts: state.posts.push(action.data)
        //     }
        case ACTIONS.LIKE_DISLIKE_POST:
            return {
                ...state,
                posts: state.posts.map(post => {
                    if (post.id === action.data.postId) {
                        let tmpPost = { ...post };
                        if (tmpPost.likes.indexOf(Number(action.data.userId)) !== -1) {
                            tmpPost.likes.splice(tmpPost.likes.indexOf(Number(action.data.userId)), 1);
                        } else {
                            tmpPost.likes.push(Number(action.data.userId));
                        }
                        return tmpPost;
                    }
                    return post;
                })
            }
        default:
            return state;
    }
}

export default reducer;