import React from 'react'
import withAuth from '../hocs/withAuth'
import { Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"

class TicketsList extends React.Component{

  eachTicket = () => {
    const { tickets } = this.props.company
    if (tickets) {
      return tickets.map(tic=>{
        return <Card key={tic.id} id={tic.id}>
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

  render() {
    return (
      <div>
        <div
          className="ui basic green button"
          id={this.props.company.id}
          onClick={this.addTicket}>
          <i className="icon add circle" /><Link to={`/${this.props.company.name}/tickets/new`}>Add Ticket</Link>
        </div>
        {this.eachTicket()}
      </div>
    )
  }
}

export default withAuth(TicketsList)


// extra
// import TicketForm from '../forms/ticketForm'
//
// state = {
//   hide: true,
//   newTicket: false
// }
//
// selectTicket = (ticket) => {
//   this.props.props.history.push(`/tickets/${ticket.id}`)
// }
//
// collapse = (e) => {
//   this.setState({
//     hide: !this.state.hide
//   })
// }
//
// addTicket = (e) => {
//   this.props.newEmpOrTicketOrPayroll(false, true, false)
//   this.setState({
//     newTicket: !this.state.newTicket
//   })
// }
//
// !this.state.newTicket
// ? (<div>
//     <br />
//     <div className="ui basic green button" id={this.props.company.id} onClick={this.addTicket}>
//       <i className="icon add circle" />New Ticket
//     </div>
//     <h3 className="ui fluid button top attached header violet" onClick={(e)=>this.collapse(e)}>
//       <i className={`dropdown icon ${this.state.hide ? null : 'counterclockwise rotated'}`} />
//         Tickets
//     </h3>
//     <div className={`ui cards content transition ${this.state.hide ? 'active' : 'hidden'} attached segment`}>
//       {this.eachTicket()}
//     </div>
//   </div>)
// : <TicketForm company={this.props.company} />
