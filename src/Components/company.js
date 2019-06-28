import React from 'react'
import { Card } from 'semantic-ui-react'

export default class Company extends React.Component {
  render() {
    console.log(this.props);
    const c = this.props.company
    return (
      <Card key={c.id} onClick={(e)=>{this.selectCompany(e)}} id={c.id}>
        <Card.Content>
          <Card.Header>{c.name}</Card.Header>
          <Card.Meta>Employees: {c.employees.length}</Card.Meta>
          <Card.Description>
            Tickets: {c.tickets.map(t=>{
              return t.title + ' - ' + t.priority
            })}
          </Card.Description>
        </Card.Content>
      </Card>
    )
  }
};
