import React from 'react'
import TicketForm from '../forms/ticketForm'
import withAuth from '../hocs/withAuth'
import { Card } from 'semantic-ui-react'

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"

class TicketsList extends React.Component{

  state = {
    hide: true,
    newTicket: false
  }

  selectTicket = (ticket) => {
    this.props.props.history.push(`/tickets/${ticket.id}`)
  }

  eachTicket = () => {
    if (this.props.tickets) {
      return this.props.tickets.map(tic=>{
        return <Card key={tic.id} onClick={(e)=>{this.selectTicket(tic, null)}} id={tic.id}>
          <Card.Content>
            <Card.Header>{tic.title}</Card.Header>
            <Card.Meta>{tic.category}</Card.Meta>
            <Card.Description>
              {tic.description.length > 30 ? tic.description.substr(0,30).concat(' ...') : tic.description}
            </Card.Description>
          </Card.Content>
          <Card.Content>
            Priority: {tic.priority}
          </Card.Content>
        </Card>
      }).sort((a,b)=>{
        return a.props.children[0].props.children[0].props.children.localeCompare(b.props.children[0].props.children[0].props.children)
      })
    }
  }

  collapse = (e) => {
    this.setState({
      hide: !this.state.hide
    })
  }

  addTicket = (e) => {
    this.props.newEmpOrTicket(false, true)
    this.setState({
      newTicket: !this.state.newTicket
    })
  }

  render() {
    console.log("ticketList", this.props);
    return (
      !this.state.newTicket
      ? (<div>
          <br />
          <div className="ui basic green button" id={this.props.company.id} onClick={this.addTicket}>
            <i className="icon add circle" />New Ticket
          </div>
          <h3 className="ui fluid button top attached header violet" onClick={(e)=>this.collapse(e)}>
            <i className={`dropdown icon ${this.state.hide ? null : 'counterclockwise rotated'}`} />
              Tickets
          </h3>
          <div className={`ui cards content transition ${this.state.hide ? 'active' : 'hidden'} attached segment`}>
            {this.eachTicket()}
          </div>
        </div>)
      : <TicketForm company={this.props.company} />
    )
  }
}

export default withAuth(TicketsList)