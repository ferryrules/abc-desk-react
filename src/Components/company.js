import React from 'react'
import { Card } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import EmployeesList from '../containers/employeesList'
import TicketsList from '../containers/ticketsList'

class Company extends React.Component {

  state = {
    clicked: true,
    tickets: true,
    employees: true
  }

  selectCompany = (e, c) => {
    this.props.clearCompanies(c)
    this.setState({
      clicked: !this.state.clicked
    })
  }

  toggleTicketsEmployees = (tickets, employees) => {
    this.setState({
      tickets,
      employees
    })
  }

  render() {
    const c = this.props.company
    // console.dir(c);
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
      : this.state.employees && this.state.tickets
        ? (<div>
            <EmployeesList toggle={this.toggleTicketsEmployees} employees={c.employees} />
            <TicketsList toggle={this.toggleTicketsEmployees} tickets={c.tickets} />
          </div>)
        : this.state.employees === false && this.state.tickets === true
          ? <TicketsList toggle={this.toggleTicketsEmployees} tickets={c.tickets} />
        : <EmployeesList toggle={this.toggleTicketsEmployees} employees={c.employees} />

    )
  }
};

export default withRouter(Company)
