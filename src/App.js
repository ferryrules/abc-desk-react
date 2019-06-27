import React, { Fragment } from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import Profile from './components/profile'
import LoginForm from './components/loginForm'
import Nav from './components/nav'
import CompanyCards from './containers/companyCards'
import NotFound from './components/notFound'
import './App.css'

const App = props => {
  // console.log('%c APP Props: ', 'color: firebrick', props)
  return (
    <Fragment>
      <Nav />
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/profile" />} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/companies" component={CompanyCards} />
        <Route component={NotFound} />
      </Switch>
    </Fragment>
  )
}

export default withRouter(App)
