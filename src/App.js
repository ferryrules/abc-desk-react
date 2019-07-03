import React, { Fragment } from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import Profile from './containers/profile'
import LoginForm from './components/loginForm'
import Nav from './containers/nav'
import Dashboard from './containers/dashboard'

import Company from './components/company'
import CompaniesList from './containers/companiesList'

import Ticket from './components/ticket'
import TicketForm from './forms/ticketForm'

import EmployeeForm from './forms/employeeForm'
import Employee from './components/employee'

import PayrollForm from './forms/payrollForm'
import Payroll from './components/payroll'

import NotFound from './components/notFound'
import './App.css'

const App = props => {
  // console.log('%c APP Props: ', 'color: firebrick', props)
  // <Route exact path="/companies/:company_id/employees/:employee_id" render={()=><Employee {...props}/>} />
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

        <Route exact path="/tickets" render={()=><TicketForm {...props}/>} />
        <Route exact path="/tickets/:ticket_id" render={()=><Ticket {...props}/>} />
        <Route exact path="/tickets/:ticket_id/edit" render={()=><TicketForm {...props}/>} />

        <Route exact path="/employees" render={()=><EmployeeForm {...props}/>} />
        <Route exact path="/employees/:employee_id" render={()=><Employee {...props}/>} />
        <Route exact path="/employees/:employee_id/edit" render={()=><EmployeeForm {...props}/>} />

        <Route exact path="/payrolls" render={()=><PayrollForm {...props}/>} />
        <Route exact path="/payrolls/:payroll_id" render={()=><Payroll {...props}/>} />
        <Route exact path="/payrolls/:payroll_id/edit" render={()=><PayrollForm {...props}/>} />

        <Route component={NotFound} />
      </Switch>
    </Fragment>
  )
}

export default withRouter(App)
