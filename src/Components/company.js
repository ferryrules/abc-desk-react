import React from 'react'
import EmployeesList from '../containers/employeesList'
import TicketsList from '../containers/ticketsList'
// import { Card } from 'semantic-ui-react'
// import { withRouter } from 'react-router-dom'
// import PayrollsList from '../containers/payrollsList'

class CompShow extends React.Component {

  state = {
    company: [],
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

  render() {
    const c = this.state.company
    // console.dir(c);
    return (
      <div>
        <EmployeesList props={this.props} company={c} employees={c.employees} />
        <TicketsList props={this.props} company={c} tickets={c.tickets} />
      </div>
    )
  }
};

export default CompShow
