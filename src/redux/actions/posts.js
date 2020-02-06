import { ACTIONS } from '../reducers/types';

export const init = data => dispatch => dispatch({
    type: ACTIONS.INIT,
    data
});

export const selectPost = data => dispatch => dispatch({
    type: ACTIONS.SELECT_POST,
    data
});

export const editPost = data => dispatch => dispatch({
    type: ACTIONS.EDIT_POST,
    data
});

export const createPost = data => dispatch => dispatch({
    type: ACTIONS.CREATE_POST,
    data
});

export const deletePost = data => dispatch => dispatch({
    type: ACTIONS.DELETE_POST,
    data
});