import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Posts from './components/Posts/Posts';
import Contact from './components/Contact/Contact';
import Profile from './components/Profile/Profile';
import Article from './components/Article/Article'

export default (
    <Switch>
        <Route exact path='/' component={Landing}/>
        <Route path='/posts' component={Posts}/>
        <Route path='/contact' component={Contact}/>
        <Route path='/profile' component={Profile}/>
        <Route path='/post/:id' component={Article}/>
    </Switch>
)