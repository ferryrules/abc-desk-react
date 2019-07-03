import React from 'react'
import EmployeesList from '../containers/employeesList'
import EmployeeForm from '../forms/employeeForm'
import TicketForm from '../forms/ticketForm'
import PayrollForm from '../forms/payrollForm'
import PayrollsList from '../containers/payrollsList'
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

  newEmpOrTicketOrPayroll = (emp, ticket, payr) => {
    this.setState({
      newEmp: emp,
      newTicket: ticket,
      newPayroll: payr
    })
  }

  render() {
    console.log("company",this.props);
    const { newEmp, newTicket, newPayroll } = this.state
    const c = this.state.company
    console.log(c);
    return (
      <div>
      {newEmp ? <EmployeeForm props={this.props} company={c}/> : <EmployeesList newEmpOrTicketOrPayroll={this.newEmpOrTicketOrPayroll} props={this.props} company={c} employees={c.employees} />}
      {newTicket ? <TicketForm props={this.props} company={c}/> : <TicketsList newEmpOrTicketOrPayroll={this.newEmpOrTicketOrPayroll} props={this.props} company={c} tickets={c.tickets} />}
      {newPayroll ? <PayrollForm props={this.props} company={c}/> : <PayrollsList newEmpOrTicketOrPayroll={this.newEmpOrTicketOrPayroll} props={this.props} company={c} payrolls={c.payrolls} />}
      </div>
    )
  }
};

export default Company
