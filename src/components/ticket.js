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
    updates: []
  }

  componentDidMount() {
    fetch(`https://abc-desk.herokuapp.com${this.props.location.pathname}`, {
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
    window.location.replace(`${window.location.origin}/${this.props.company.name}/tickets`)
  }

  createNewDescription = (ticket, update, user) => {
    // eslint-disable-next-line
    console.log(this.state.updates);
    return `${user}: ${update}`
    // ticket.updates ? ticket.updates.push(`${user}: ${update}`) : `${user}: ${update}`
    // debugger
  }

  updateTicket = (newDescrip) => {
    fetch(`https://abc-desk.herokuapp.com/tickets/${this.state.ticket.id}`,{
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        updates: newDescrip
      })
    }).then(r=>r.json())
    .then(ticket=>{
      window.location.reload()
    })
  }

  render() {
    console.log("ticket props",this.props);
    console.log("ticket state",this.state);
    console.log(this.state.ticket.updates);
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
              <br/>
              {tic.updates}
            </Grid.Column>
            <Grid.Column>
              <TextArea placeholder='Update ticket' onChange={(e)=>this.setState({updates: e.target.value})}/>
              <br />
              <Button compact basic color='grey' onClick={(e)=>this.updateTicket(this.createNewDescription(this.state.ticket, this.state.updates, this.props.username))}><i className="save outline" />Update</Button>
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
