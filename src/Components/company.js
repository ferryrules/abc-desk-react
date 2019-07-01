import React from 'react'
import { Card } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import EmployeesList from '../containers/employeesList'
import TicketsList from '../containers/ticketsList'

class Company extends React.Component {

  state = {
    clicked: true
  }

  selectCompany = (e, c) => {
    this.props.clearCompanies(c)
    this.setState({
      clicked: !this.state.clicked
    })
  }

  render() {
    const c = this.props.company
    return (
      this.state.clicked
      ? <Card key={c.id} onClick={(e)=>this.selectCompany(e, c)} id={c.id}>
        <Card.Content>
          <Card.Header>{c.name}</Card.Header>
          <Card.Meta>Employees: <span className="badge badge-primary">{c.employees.length}</span></Card.Meta>
          <Card.Meta>
            Tickets: <span className="badge badge-info">{c.tickets.length}</span>
            <br />
          </Card.Meta>
        </Card.Content>
      </Card>
      : (
        <div>
          <EmployeesList company={c} />
          <TicketsList tickets={c} />
        </div>
      )
    )
  }
};

export default withRouter(Company)
