import React from 'react'
import withAuth from '../hocs/withAuth'
import { connect } from 'react-redux'
import { Button, Icon, Container, Divider, Grid, Segment, Label } from 'semantic-ui-react'

import TicketForm from '../forms/ticketForm'

class Ticket extends React.Component {

  state = {
    ticket: [],
    edit: true,
    ticketColor: '',
    ticketStatus: ''
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
      let ticketStatus = ticket.ticket_status === "Open"
      ? 'purple'
      : ticket.ticket_status === "Pending"
      ? 'blue'
      : 'grey'
      this.setState({
        ticket,
        ticketColor,
        ticketStatus
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
    console.log("props",this.props);
    console.log("state",this.state);
    const tic = this.state.ticket
    return(
      this.state.edit
      ? (<Grid columns={3}>
          <Grid.Column>
            <Button className="ui basic grey" onClick={(e)=>this.goBack()}><i className="angle double left icon" />Back</Button>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <Label as="a" color={this.state.ticketStatus} ribbon>{tic.ticket_status}</Label>
              <br />
              <Label as="a" color={this.state.ticketColor} ribbon='right'>{tic.priority}</Label>
            <Container textAlign="center">
              <h3><Icon className={`exclamation triangle ${this.state.ticketColor}`} />{tic.title}</h3>
            </Container>
            <Container textAlign="center"><h5><b>Created By:</b> {this.props.username}</h5></Container>
            <Divider />
            <Container textAlign='justified'>{tic.description}</Container>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Button className="ui basic blue" floated='right' onClick={(e)=>this.editTicket()}><i className="edit outline icon" />Edit</Button>
          </Grid.Column>
        </Grid>)
      : <TicketForm editTicket={this.editTicket} ticket={tic} props={this.props} company={tic.company} />
    )
  }
}

const mapStateToProps = ({ usersReducer: { user: { id, email, username, permission, fname, lname } } }) => ({
  id,
  email,
  username,
  permission,
  fname,
  lname
})

export default withAuth(connect(mapStateToProps)(Ticket))

// <div className="cards">
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
