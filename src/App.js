import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ListView from './components/ListView';
import DetailView from './components/DetailView';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import CreatePost from './components/CreatePost';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './components/NotFound';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginForm} />
        <Route path="/register" component={RegisterForm} />
        <ProtectedRoute exact path="/" component={ListView} />
        <ProtectedRoute path="/posts/:id" component={DetailView} />
        <ProtectedRoute path="/createpost" component={CreatePost}/>
        <ProtectedRoute component={NotFound}/>
      </Switch>
    </Router>
  );
};

export default App;
