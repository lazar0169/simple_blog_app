import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Posts from './components/posts';
import Post from './components/post';
import PostForm from './components/postForm';

class App extends React.Component {
    render() {
        return <BrowserRouter>
            <Switch>
                <Route path="/posts/change/:id" component={PostForm} />
                <Route path="/posts/create" component={PostForm} />
                <Route path="/posts/:id" component={Post} />
                <Route path="/posts" component={Posts} />
            </Switch>
        </BrowserRouter>
    }
}

export default App;