import React, { Fragment } from 'react'
import EmployeesList from '../containers/employeesList'
import EmployeeForm from '../forms/employeeForm'
import TicketForm from '../forms/ticketForm'
import PayrollForm from '../forms/payrollForm'
import PayrollsList from '../containers/payrollsList'
import TicketsList from '../containers/ticketsList'
import withAuth from '../hocs/withAuth'
// import Employee from '../components/employee'
// import { Card } from 'semantic-ui-react'
// import { withRouter } from 'react-router-dom'
// import PayrollsList from '../containers/payrollsList'

class Company extends React.Component {

  state = {
    company: [],
    newEmp: false,
    newTicket: false,
    newPayroll: false
  }

  componentDidMount() {
    if (this.props.location.pathname !== `/dashboard`) {
      fetch(`https://abc-desk.herokuapp.com${this.props.location.pathname}`, {
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
      .catch(error=> console.error('Error', error))
    }
  }

  newEmpOrTicketOrPayroll = (emp, ticket, payr) => {
    this.setState({
      newEmp: emp,
      newTicket: ticket,
      newPayroll: payr
    })
  }

  render() {
    // console.log("company",this.props);
    const { newEmp, newTicket, newPayroll } = this.state
    const c = this.state.company
    // console.log(c);
    return (
      <div>
        {!newEmp ?
          !newTicket ?
            !newPayroll ? (
              <Fragment>
                <EmployeesList newEmpOrTicketOrPayroll={this.newEmpOrTicketOrPayroll} props={this.props} company={c} employees={c.employees} />
                <TicketsList newEmpOrTicketOrPayroll={this.newEmpOrTicketOrPayroll} props={this.props} company={c} tickets={c.tickets} />
                <PayrollsList newEmpOrTicketOrPayroll={this.newEmpOrTicketOrPayroll} props={this.props} company={c} payrolls={c.payrolls} />
              </Fragment>
            ) : (
              <PayrollForm props={this.props} company={c}/>
            ) : (
            <TicketForm props={this.props} company={c}/>
          ) : (
          <EmployeeForm props={this.props} company={c}/>
        )}
      </div>
    )
  }
};

export default withAuth(Company)
