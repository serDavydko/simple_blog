import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import PostListPage from './PostListPage';
import PostPage from './PostPage';

const App = () => (
  <Router>
    <div className="App">
      <header className="header-container">
        <nav>
          <Link className="basic_link" to="/LatestPosts">
            Posts
          </Link>
        </nav>
      </header>
      <Switch>
        <Route exact path="/" component={PostListPage} />
        <Route exact path="/LatestPosts" component={PostListPage} />
        <Route path="/LatestPosts/:postId" component={PostPage} />
      </Switch>
    </div>
  </Router>
);

export default App;
