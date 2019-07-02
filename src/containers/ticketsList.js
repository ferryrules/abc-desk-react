import React from 'react'
import Ticket from '../components/ticket.js'

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"

class TicketsList extends React.Component{

  state = {
    filtered: [],
    tickets: this.props.tickets,
    hide: true
  }

  clearOrResetTickets = (clear, reset) => {
    // debugger
    if (clear) {
      this.state.tickets.filter(t=>{
        if (t.id !== clear.id) {
          this.state.filtered.push(t)
        }
      })
      this.setState({
        tickets: [clear]
      }, this.props.toggle(true, false))
    } else {
      console.log(this.state.filtered);
      console.log(reset);
      // debugger
      this.setState({
        tickets: [...this.state.filtered, {
          title: reset.title,
          category: reset.category,
          description: reset.description,
          priority: reset.priority
        }]
      }, this.props.toggle(true, true))
    }
  }

  eachTicket = () => {
    if (this.props.tickets) {
      return this.props.tickets.map(t=>{
        return <Ticket key={t.id} clearOrResetTickets={this.clearOrResetTickets} ticket={t} />
      }).sort((a,b)=>{
        return a.props.ticket.title.localeCompare(b.props.ticket.title)
      })
    }
  }

  collapse = (e) => {
    this.setState({
      hide: !this.state.hide
    })
  }

  render() {
    return (
      <div>
        <h3 className="ui top attached header violet" onClick={(e)=>this.collapse(e)}>
          <i className={`dropdown icon ${this.state.hide ? null : 'counterclockwise rotated'}`} />
            Tickets
        </h3>
        <div>
          <i className='icon add circle' />
            New Ticket
        </div>
        <div className={`ui cards content transition ${this.state.hide ? 'active' : 'hidden'} attached segment`}>
          {this.eachTicket()}
        </div>
      </div>
    )
  }
}

export default TicketsList
