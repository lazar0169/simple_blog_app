import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Posts from './pages/posts';
import Post from './pages/post';
import PostForm from './components/postForm';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';

class App extends React.Component {
    render() {
        return <BrowserRouter>
            <Switch>
                <Route path="/posts/change/:id" component={PostForm} />
                <Route path="/posts/create" component={PostForm} />
                <Route path="/posts/:id" component={Post} />
                <Route path="/posts" component={Posts} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/" component={Home} />
            </Switch>
        </BrowserRouter>
    }
}

export default App;