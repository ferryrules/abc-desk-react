import React from 'react'
import withAuth from '../hocs/withAuth'
import { Card, Button, Item } from 'semantic-ui-react'

import TicketForm from '../forms/ticketForm'

class Ticket extends React.Component {

  state = {
    ticket: [],
    edit: true
  }

  componentDidMount() {
    fetch(`http://localhost:3000${this.props.location.pathname}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    .then(r=>r.json())
    .then(ticket=>{
      this.setState({
        ticket
      })
    })
  }

  editTicket = (ticket) => {
    this.setState({
      edit: !this.state.edit
    })
  }

  goBack = () => {
    window.location.replace(`http://localhost:3001/${this.props.company.name}/tickets`)
  }

  render() {
    // console.log("ticket",this.props);
    const tic = this.state.ticket
    return(
      this.state.edit
      ? (<div className="cards">
        <div className="ui basic grey button" onClick={(e)=>this.goBack()}>
          <i className="angle double left icon" />Back
        </div>
        <Card key={`Ticket-${tic.id}`} id={tic.id}>
          <Card.Content>
            <Card.Header>{tic.title}</Card.Header>
            <Card.Meta>{tic.category}</Card.Meta>
            <Card.Description>
              {tic.description}
            </Card.Description>
          </Card.Content>
          <Card.Content>
            Priority: {tic.priority}
          </Card.Content>
          <div className="ui extra content" >
            <div className="ui basic blue button" onClick={(e)=>this.editTicket(tic)}>
              <i className="edit outline icon" />Edit
            </div>
          </div>
        </Card>
        </div>)
      : <TicketForm editTicket={this.editTicket} ticket={tic} props={this.props} company={tic.company} />
    )
  }
}

export default withAuth(Ticket)
