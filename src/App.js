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

import EmployeesList from './containers/employeesList'
import Employee from './components/employee'
import EmployeeForm from './forms/employeeForm'

import PayrollForm from './forms/payrollForm'
import Payroll from './components/payroll'

import NotFound from './components/notFound'
import './App.css'

class App extends React.Component {

  state ={
    companies: [],
    currentCompany: []
  }

  componentDidMount() {
    fetch('http://localhost:3000/companies', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    .then(r=>r.json())
    .then(companies=>{
      this.setState({
        companies
      })
    })
  }

  selectCompany = (company) => {
    this.setState({
      currentCompany: company
    })
  }

  // console.log('%c APP Props: ', 'color: firebrick', props)
  // <Route exact path="/companies/:company_id/employees/:employee_id" render={()=><Employee {...props}/>} />
  render() {
    // console.log("App state",this.state);
    return (
      <Fragment>
        <Nav currentCompany={this.state.currentCompany}/>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/dashboard" component={Dashboard} />

          <Route exact path="/companies" render={()=><CompaniesList {...this.props} {...this.state} selectCompany={this.selectCompany} />} />
          <Route exact path="/companies/:company_id" render={()=><Company {...this.props} {...this.state}/>} />

          <Route exact path="/tickets" render={()=><TicketForm {...this.props} {...this.state}/>} />
          <Route exact path="/tickets/:ticket_id" render={()=><Ticket {...this.props} {...this.state}/>} />
          <Route exact path="/tickets/:ticket_id/edit" render={()=><TicketForm {...this.props} {...this.state}/>} />

          <Route exact path="/employees" render={()=><EmployeesList {...this.props} {...this.state}/>} />
          <Route exact path="/employees/:employee_id" render={()=><Employee {...this.props} {...this.state}/>} />
          <Route exact path="/employees/:employee_id/edit" render={()=><EmployeeForm {...this.props} {...this.state}/>} />
          <Route exact path="/employees/new" render={()=><EmployeeForm {...this.props} {...this.state}/>} />

          <Route exact path="/payrolls" render={()=><PayrollForm {...this.props} {...this.state}/>} />
          <Route exact path="/payrolls/:payroll_id" render={()=><Payroll {...this.props} {...this.state}/>} />
          <Route exact path="/payrolls/:payroll_id/edit" render={()=><PayrollForm {...this.props} {...this.state}/>} />

          <Route component={NotFound} />
        </Switch>
      </Fragment>
    )
  }
}

export default withRouter(App)
