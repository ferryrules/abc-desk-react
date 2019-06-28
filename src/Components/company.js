import React from 'react'
import { Card } from 'semantic-ui-react'

export default class Company extends React.Component {

  selectCompany = (e) => {
    console.log(e.currentTarget);
  }

  render() {
    console.log(this.props);
    console.log(this.state);
    const c = this.props.company
    return (
      <Card key={c.id} onClick={(e)=>{this.selectCompany(e)}} id={c.id}>
        <Card.Content>
          <Card.Header>{c.name}</Card.Header>
          <Card.Meta>Employees: {c.employees.length}</Card.Meta>
          <Card.Description>
            Tickets
            <br />
            {this.ticketPris}
          </Card.Description>
        </Card.Content>
      </Card>
    )
  }
};
