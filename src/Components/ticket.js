import React from 'react'
import { Card } from 'semantic-ui-react'
import TicketForm from '../forms/ticketForm'

export default class Ticket extends React.Component {

  state = {
    edit: true
  }

  selectTicket = (clear, reset) => {
    // debugger
    this.props.clearOrResetTickets(clear, reset)
  }

  editTicket = (clear, reset) => {
    // debugger
    if (this.state.edit) {
      this.setState({
        edit: !this.state.edit
      })
    } else {
      this.selectTicket(null, reset)
      this.setState({
        edit: !this.state.edit
      })
    }
  }

  render() {
    const tic = this.props.ticket
    return(
      this.state.edit
      ? (<div className="cards">
      <div className="ui extra content" >
        <div className="ui basic blue button" onClick={(e)=>this.editTicket(tic, null)}>
          <i className="edit outline icon" />Edit
        </div>
      </div>
        </div>)
      : <TicketForm editTicket={this.editTicket} ticket={tic} />
    )
  }
}
