import React, { Fragment } from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import Profile from './containers/profile'
import LoginForm from './components/loginForm'
import Nav from './containers/nav'

import Company from './components/company'

import EmployeesList from './containers/employeesList'
import Employee from './components/employee'
import EmployeeForm from './forms/employeeForm'

import TicketsList from './containers/ticketsList'
import Ticket from './components/ticket'
import TicketForm from './forms/ticketForm'

import PayrollsList from './containers/payrollsList'
import Payroll from './components/payroll'
import PayrollForm from './forms/payrollForm'

import NotFound from './components/notFound'
import './App.css'

class App extends React.Component {

  state ={
    companies: [],
    company: []
  }

  componentDidMount() {
    fetch("http://localhost:3000/companies", {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    .then(r=>r.json())
    .then(companies=>{
      // let comp = companies.length > 1 ? 'companies' : 'company'
      this.setState({
        company: companies[0]
      })
    })
    .catch(error=> console.error('Error', error))
  }

  render() {
    // console.log("App state",this.state);
    return (
      <Fragment>
        <Nav company={this.state.company}/>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/dashboard" render={()=><Company {...this.props} company={this.state.company}/>} />

          {/* COMPANY */}
          <Route exact path="/:company_name" render={()=><Company {...this.props} company={this.state.company}/>} />
          {/* EMPLOYEES */}
          <Route exact path="/:company_name/employees" render={()=><EmployeesList {...this.props} company={this.state.company}/>} />
          <Route exact path="/:company_name/employees/new" render={()=><EmployeeForm {...this.props} company={this.state.company}/>} />
          <Route exact path="/employees/:employee_id" render={()=><Employee {...this.props} company={this.state.company}/>} />
          <Route exact path="/employees/:employee_id/edit" render={()=><EmployeeForm {...this.props} company={this.state.company}/>} />
          {/* TICKETS */}
          <Route exact path="/:company_name/tickets" render={()=><TicketsList {...this.props} company={this.state.company}/>} />
          <Route exact path="/:company_name/tickets/new" render={()=><TicketForm {...this.props} company={this.state.company}/>} />
          <Route exact path="/tickets/:ticket_id" render={()=><Ticket {...this.props} company={this.state.company}/>} />
          <Route exact path="/tickets/:ticket_id/edit" render={()=><TicketForm {...this.props} company={this.state.company}/>} />
          {/* PAYROLL */}
          <Route exact path="/:company_name/payrolls" render={()=><PayrollsList {...this.props} company={this.state.company}/>} />
          <Route exact path="/:company_name/payrolls/new" render={()=><PayrollForm {...this.props} company={this.state.company}/>} />
          <Route exact path="/payrolls/:payroll_id" render={()=><Payroll {...this.props} company={this.state.company}/>} />
          <Route exact path="/payrolls/:payroll_id/edit" render={()=><PayrollForm {...this.props} company={this.state.company}/>} />

          <Route component={NotFound} />
        </Switch>
      </Fragment>
    )
  }
}

export default withRouter(App)


// import CompanyDashboard from './containers/companyDashboard';
// import CompaniesList from './containers/companiesList'
// <Route exact path="/companies" render={()=><CompaniesList {...this.props} {...this.state} selectCompany={this.selectCompany} />} />
