import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Consultant from './Consultant';
import {Route, BrowserRouter as Router, NavLink, Switch} from 'react-router-dom';
import Genres from './Genres';
import Tags from './Tags';
import Ratings from './Ratings';
import Books from './Books';
import User from './Roles/User';
import Admin from './Roles/Admin';
import Expert from './Roles/Expert';

ReactDOM.render(
  <Router>
    <div>
        <nav>
            <NavLink className="tabbed-page" exact to="/">Пользователь</NavLink>
            <NavLink className="tabbed-page" to="/admin">Админ</NavLink>
            <NavLink className="tabbed-page" to="/expert">Эксперт</NavLink>
        </nav>
        <Switch>
            <Route exact path="/" component={User} />
            <Route path="/admin" component={Admin} />
            <Route path="/expert" component={Expert} />
        </Switch>
    </div>
  </Router>,
  document.getElementById('root')
);