import React from 'react'
import withAuth from '../hocs/withAuth'
import { connect } from 'react-redux'
import { Button, Icon, Divider, Grid, Label, TextArea } from 'semantic-ui-react'

import TicketForm from '../forms/ticketForm'

class Ticket extends React.Component {

  state = {
    ticket: [],
    edit: true,
    ticketColor: '',
    ticketStatus: '',
    update: ''
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
    .catch(error=> console.error('Error', error))
  }

  editTicket = (ticket) => {
    this.setState({
      edit: !this.state.edit
    })
  }

  goBack = () => {
    window.location.replace(`http://localhost:3001/${this.props.company.name}/tickets`)
  }

  createNewDescription = () => {
    return this.state.ticket.description + ` ____________________________________________` + ` ${this.props.username}: ${this.state.update}`
  }

  updateTicket = (newDescrip) => {
    fetch(`http://localhost:3000/tickets/${this.state.ticket.id}`,{
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        description: newDescrip
      })
    }).then(r=>r.json())
    .then(ticket=>{
      window.location.reload()
    })
  }

  render() {
    // console.log("props",this.props);
    // console.log("state",this.state);
    const tic = this.state.ticket
    return(
      this.state.edit
      ? (
        <Grid columns={3}>
          {/* buttons */}
          <Grid.Row>
            <Grid.Column textAlign="center">
              <Button basic color='grey' onClick={(e)=>this.goBack()}><i className="angle double left icon" />Back</Button>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <Button basic color='blue' onClick={(e)=>this.editTicket()}><i className="edit outline icon" />Edit</Button>
            </Grid.Column>
          </Grid.Row>
          {/* label */}
          <Grid.Row>
            <Grid.Column></Grid.Column>
            <Grid.Column>
              <Label
                className={`${this.state.ticketStatus}`}
                ribbon>
                {tic.ticket_status}
              </Label>
            </Grid.Column>
          </Grid.Row>
          {/* title and pri */}
          <Grid.Row>
            <Grid.Column></Grid.Column>
            <Grid.Column textAlign="center">
              <h3>
                <Icon className={tic.priority === "High" ? 'bomb' : tic.priority === "Medium" ? 'fire extinguisher' : 'bed'} color={`${this.state.ticketColor}`}/>
                 {tic.title}
              </h3>
              <h5> Priority: {tic.priority}</h5>
            </Grid.Column>
          </Grid.Row>
          <Divider />
          {/* description */}
          <Grid.Row stretched>
            <Grid.Column textAlign='center'>
              <h3>Description: </h3>
            </Grid.Column>
            <Grid.Column>
              {tic.description}
            </Grid.Column>
            <Grid.Column>
              <TextArea placeholder='Update ticket' onChange={(e)=>this.setState({update: e.target.value})}/>
              <br />
              <Button compact basic color='grey' onClick={(e)=>this.updateTicket(this.createNewDescription())}><i className="save outline" />Update</Button>
            </Grid.Column>
          </Grid.Row>
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
