import React from 'react'
import withAuth from '../hocs/withAuth'
import { Card, Button, Item, Icon } from 'semantic-ui-react'

import TicketForm from '../forms/ticketForm'

class Ticket extends React.Component {

  state = {
    ticket: [],
    edit: true,
    ticketColor: ''
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
      let ticketColor = ticket.priority === "High"
      ? 'red'
      : ticket.priority === "Medium"
      ? 'orange'
      : 'green'
      this.setState({
        ticket,
        ticketColor
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
    const { ticket } = this.state
    console.log("ticket",this.state);
    const tic = this.state.ticket
    return(
      this.state.edit
      ? (<Item.Group relaxed>
        <Item>
          <Icon className={`exclamation triangle ${this.state.ticketColor}`} size="huge" />
          <Item.Content verticalAlign='middle'>
            <Item.Header>{ticket.title}</Item.Header>
            <Item.Description>{ticket.description}</Item.Description>
            <Item.Extra>
              <Button floated='right'>Edit</Button>
            </Item.Extra>
          </Item.Content>
        </Item>
      </Item.Group>)
      : <TicketForm editTicket={this.editTicket} ticket={tic} props={this.props} company={tic.company} />
    )
  }
}

export default withAuth(Ticket)

// <div className="cards">
//   <div className="ui basic grey button" onClick={(e)=>this.goBack()}>
//     <i className="angle double left icon" />Back
//   </div>
//   <Card key={`Ticket-${tic.id}`} id={tic.id}>
//     <Card.Content>
//       <Card.Header>{tic.title}</Card.Header>
//       <Card.Meta>{tic.category}</Card.Meta>
//       <Card.Description>
//         {tic.description}
//       </Card.Description>
//     </Card.Content>
//     <Card.Content>
//       Priority: {tic.priority}
//     </Card.Content>
//     <div className="ui extra content" >
//       <div className="ui basic blue button" onClick={(e)=>this.editTicket(tic)}>
//         <i className="edit outline icon" />Edit
//       </div>
//     </div>
//   </Card>
//   </div>
