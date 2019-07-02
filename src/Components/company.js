import React from 'react'
import { Card } from 'semantic-ui-react'
// import { withRouter } from 'react-router-dom'
// import EmployeesList from '../containers/employeesList'
// import TicketsList from '../containers/ticketsList'

class Company extends React.Component {

  render() {
    const c = this.props.company
    // console.dir(c);
    return (
      <Card key={c.id} onClick={(e)=>this.props.selectCompany(c)} id={c.id}>
        <Card.Content>
          <Card.Header>{c.name}</Card.Header>
          <Card.Meta>Employees: <span className="badge badge-primary">{c.employees.length}</span></Card.Meta>
          <Card.Meta>
            Tickets: <span className="badge badge-info">{c.tickets.length}</span>
            <br />
          </Card.Meta>
        </Card.Content>
      </Card>
    )
  }
};

export default Company
