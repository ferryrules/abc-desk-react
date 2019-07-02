import React from 'react'
import EmployeesList from '../containers/employeesList'
import EmployeeForm from '../forms/employeeForm'
import TicketForm from '../forms/ticketForm'
import TicketsList from '../containers/ticketsList'
// import { Card } from 'semantic-ui-react'
// import { withRouter } from 'react-router-dom'
// import PayrollsList from '../containers/payrollsList'

class Company extends React.Component {

  state = {
    company: [],
    newEmp: false,
    newTicket: false
  }

  componentDidMount() {
    fetch(`http://localhost:3000${this.props.location.pathname}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    .then(r=>r.json())
    .then(company=>{
      this.setState({
        company
      })
    })
  }

  newEmpOrTicket = (emp, ticket) => {
    this.setState({
      newEmp: emp,
      newTicket: ticket
    })
  }

  render() {
    const c = this.state.company
    return (
      this.state.newEmp
      ?
        <EmployeeForm props={this.props} company={c}/>
      : this.state.newTicket
        ? <TicketForm props={this.props} company={c}/>
      : <div>
          <EmployeesList newEmpOrTicket={this.newEmpOrTicket} props={this.props} company={c} employees={c.employees} />
          <TicketsList newEmpOrTicket={this.newEmpOrTicket} props={this.props} company={c} tickets={c.tickets} />
        </div>
    )
  }
};

export default Company
