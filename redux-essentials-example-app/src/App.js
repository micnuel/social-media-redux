import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { Navbar } from './app/Navbar'

import {PostList} from './features/posts/postsList';
import {AddPostForm} from './features/posts/addPostForm';
import {SinglePostPage} from './features/posts/singlePostPage';
import { EditPostForm } from './features/posts/editPostForm';
import {UserPage} from './features/users/userPage';
import {UserList} from './features/users/usersList';
import { NotificationsList } from './features/notifications/notificationsList';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <section>
                <React.Fragment>
                  <AddPostForm />
                  <PostList />
                </React.Fragment>
                
              </section>
            )}
          />
          <Route exact path ="/posts/:postId" component ={SinglePostPage} />
          <Route exact path ="/editPost/:postId" component ={EditPostForm} />
          <Route exact path="/users" component={UserList} />
          <Route exact path="/users/:userId" component={UserPage} />
          <Route exact path="/notifications" component={NotificationsList} />

          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
