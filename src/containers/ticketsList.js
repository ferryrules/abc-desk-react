import React from 'react'
import { Card } from 'semantic-ui-react'
// import withAuth from '../hocs/withAuth'
// import Ticket from '../components/ticket.js'

class TicketsList extends React.Component{

  state = {
    hide: true
  }

  clearTickets = (t) => {
    this.setState({
      tickets: [t]
    })
  }

  eachTicket = () => {
    if (this.props.tickets) {
      return this.props.tickets.map(t=>{
        return (
          <Card key={t.id} onClick={(t)=>{console.log(t.currentTarget.id)}} id={t.id}>
            <Card.Content>
              <Card.Header>{t.title}</Card.Header>
              <Card.Meta>{t.category}</Card.Meta>
              <Card.Description>
                {t.description}
              </Card.Description>
            </Card.Content>
          <Card.Content>
            Priority: {t.priority}
          </Card.Content>
          </Card>
        )
      }).sort((a,b)=>{
        return a.props.children[1].props.children[1].localeCompare(b.props.children[1].props.children[1])
      })
    }
  }

  collapse = (e) => {
    this.setState({
      hide: !this.state.hide
    })
  }

  render() {
    console.log("ticketsList", this.props.tickets);
    // const eachTicket = this.props.tickets.map(t=>{
    //   return <Ticket key={t.id} ticket={t} tickets={this.props.tickets} clearTickets={this.clearTickets} />
    // })
    return (
      <div>
        <h3 className="ui top attached header violet" onClick={(e)=>this.collapse(e)}>
          <i className={`dropdown icon ${this.state.hide ? null : 'counterclockwise rotated'}`} />
            Tickets
        </h3>
        <div className={`ui cards content transition ${this.state.hide ? 'active' : 'hidden'} attached segment`}>
          {this.eachTicket()}
        </div>
      </div>
    )
  }
}

export default TicketsList
