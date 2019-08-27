import React, { Fragment } from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'

import Profile from './containers/profile'
import LoginForm from './components/loginForm'
import Nav from './containers/nav'

import UserForm from './forms/userForm'

import CompanyDashboard from './containers/companyDashboard'
import CompanyForm from './forms/companyForm'

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
    .then(company=>{
      // let comp = companies.length > 1 ? 'companies' : 'company'
      this.setState({
        company
      })
    })
    .catch(error=> console.error('Error', error))
  }

  render() {
    // console.log("App state",this.state);
    // console.log("App props",this.props);
    return (
      <Fragment>
        <Nav company={this.state.company}/>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/login" />} />
          <Route exact path="/profile" render={()=><Profile {...this.props} company={this.state.company}/>} />
          <Route exact path="/login" component={LoginForm} company={this.state.company}/>

          <Route exact path="/new" render={()=><UserForm />} />
          <Route exact path="/edit" render={()=><UserForm {...this.props} company={this.state.company}/>} />

          {/* COMPANY */}
          <Route exact path="/:company_name" render={()=><CompanyDashboard {...this.props} company={this.state.company}/>} />
          <Route exact path="/dashboard" render={()=><CompanyDashboard {...this.props} company={this.state.company}/>} />
          <Route exact path="/:company_name/edit" render={()=><CompanyForm {...this.props} company={this.state.company}/>} />
          <Route exact path="/:user_name/new" render={()=><CompanyForm {...this.props} />} />

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

          {/*KEEP AT BOTTOM*/}
          <Route component={NotFound} />

        </Switch>
      </Fragment>
    )
  }
}

export default withRouter(App)


// import { connect } from 'react-redux'
// import withAuth from './hocs/withAuth'
// import CompanyDashboard from './containers/companyDashboard';
// import CompaniesList from './containers/companiesList'
// <Route exact path="/companies" render={()=><CompaniesList {...this.props} {...this.state} selectCompany={this.selectCompany} />} />
// <Route exact path="/:company_name" render={()=><Company {...this.props} company={this.state.company}/>} />
