import React, { Fragment } from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import Profile from './containers/profile'
import LoginForm from './components/loginForm'
import Nav from './containers/nav'
import CompaniesList from './containers/companiesList'
import Company from './components/company'
import Dashboard from './containers/dashboard'
import TicketsList from './containers/ticketsList'
import EmployeesList from './containers/employeesList'
import EmployeeForm from './forms/employeeForm'
import Employee from './components/employee'
import NotFound from './components/notFound'
import './App.css'

const App = props => {
  console.log('%c APP Props: ', 'color: firebrick', props)
  return (
    <Fragment>
      <Nav />
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/companies" render={()=><CompaniesList {...props}/>} />
        <Route exact path="/companies/:company_id" render={()=><Company {...props}/>} />
        <Route exact path="/companies/:company_id/tickets" component={TicketsList} />
        // <Route exact path="/companies/:company_id/employees/:employee_id" render={()=><Employee {...props}/>} />
        <Route exact path="/employees/:employee_id" render={()=><Employee {...props}/>} />
        <Route exact path="/employees/:employee_id/edit" render={()=><EmployeeForm {...props}/>} />
        <Route component={NotFound} />
      </Switch>
    </Fragment>
  )
}

export default withRouter(App)
