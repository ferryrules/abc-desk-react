import React from 'react'
import { Card } from 'semantic-ui-react'
// import { withRouter } from 'react-router-dom'
import EmployeesList from '../containers/employeesList'
import TicketsList from '../containers/ticketsList'
// import PayrollsList from '../containers/payrollsList'

class CompShow extends React.Component {

  state = {
    company: [],
  }

  componentDidMount() {
    fetch(`http://localhost:3000/${this.props.location.pathname}`, {
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
    console.log(this.state);
    console.log("compShow", this.props);
    const c = this.state.company
    // console.dir(c);
    return (
      <div>
        <EmployeesList props={this.props} employees={c.employees} />
        <TicketsList props={this.props} tickets={c.tickets} />
      </div>
    )
  }
};

export default CompShow
