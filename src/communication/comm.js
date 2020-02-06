import axios from 'axios';
import store from '../redux/store';

export const getPosts = async () => {
    try {
        const res = await axios.get(`http://localhost:5000/posts`);
        store.dispatch({ type: 'INIT', data: res.data.reverse() });
    } catch (error) {
        console.log(error);
    }
}

export const getPost = async (id) => {
    try {
        const res = await axios.get(`http://localhost:5000/posts/${id}`);
        store.dispatch({ type: 'SELECT_POST', data: res.data });
    } catch (error) {
        console.log(error);
    }
}

export const removePost = async (id) => {
    try {
        await axios.delete(`http://localhost:5000/posts/${id}/${localStorage.getItem('id')}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        store.dispatch({ type: 'DELETE_POST', data: id });
        window.location.pathname = '/posts';
    } catch (error) {
        console.log(error);
    }
}

export const updatePost = async (id, data) => {
    try {
        await axios.post(`http://localhost:5000/posts/${id}`, data, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        // store.dispatch({ type: 'EDIT_POST', data: { id, data } });
    } catch (error) {
        console.log(error);
    }
}

export const createPost = async (data) => {
    try {
        await axios.post(`http://localhost:5000/posts/`, data, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        window.location.pathname = '/posts';
    } catch (error) {
        console.log(error);
    }
}

export const submitComment = async (data) => {
    try {
        await axios.post(`http://localhost:5000/posts/comment`, data, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const likeOrDislike = async (data) => {
    try {
        await axios.post(`http://localhost:5000/posts/like`, data, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        store.dispatch({ type: 'LIKE_DISLIKE_POST', data: data });
    } catch (error) {
        console.log(error);
    }
}