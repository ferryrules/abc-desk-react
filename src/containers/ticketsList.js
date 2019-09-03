import React from 'react'
import withAuth from '../hocs/withAuth'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card, Dropdown, Divider, Label, Icon } from 'semantic-ui-react'

class TicketsList extends React.Component{

  state = {
    sort: "",
    sortStat: ""
  }

  eachTicket = () => {
    const { tickets } = this.props.company
    if (tickets) {
      return tickets.map(tic=>{
        return (this.state.sort === tic.priority || !this.state.sort) && (this.state.sortStat === tic.ticket_status || !this.state.sortStat)
        ? (<Card key={tic.id} id={tic.id} onClick={(e)=>window.location.replace(`${window.location.origin}/tickets/${tic.id}`)}>
            <Card.Content>
              <Label
                ribbon
                color={tic.priority === "High" ? 'red' : tic.priority === "Medium" ? 'yellow' : 'green'}>
                <Icon className={tic.priority === "High" ? 'bomb' : tic.priority === "Medium" ? 'fire extinguisher' : 'bed'} />
                {tic.priority} Priority
              </Label>
              <br />
              <br />
              <Card.Header>{tic.title}</Card.Header>
              <Card.Meta>{tic.category}</Card.Meta>
              <Divider />
              <Card.Description>
                {tic.description.length > 30 ? tic.description.substr(0,30).concat(' ...') : tic.description}
              </Card.Description>
            <Divider />
              <b>Status: </b><Label color={tic.ticket_status === "Open" ? 'purple' : tic.ticket_status === "Pending" ? 'blue' : 'grey'}>{tic.ticket_status}</Label>
            </Card.Content>
          </Card>) : null
        }
      )
    }
  }

  render() {
    console.log("ticketsList State", this.state);
    console.log("ticketsList props", this.props);

    const priOptions = [
      { key: 'high', text: 'High', value: 'High' },
      { key: 'medium', text: 'Medium', value: 'Medium' },
      { key: 'low', text: 'Low', value: 'Low' }
    ]
    const statOptions = [
      { key: 'open', text: 'Open', value: 'Open' },
      { key: 'pending', text: 'Pending', value: 'Pending' },
      { key: 'closed', text: 'Closed', value: 'Closed' }
    ]

    return (
      <div>
        <Link to={`/${this.props.company.name}/tickets/new`}>
          <div
            className="ui basic green button"
            id={this.props.company.id}>
            <i className="icon add circle" />Add Ticket
          </div>
        </Link>
        <Dropdown
          selection
          options={priOptions}
          onChange={(e)=>this.setState({sort:e.target.innerText})}
          placeholder="Filter by Priority" />
        <span> </span>
        <Dropdown
          selection
          options={statOptions}
          onChange={(e)=>this.setState({sortStat:e.target.innerText})}
          placeholder="Filter by Status" />
        <br />
        <br />
        <div className="ui three cards">
          {this.eachTicket()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({...props}) => {
  return {...props}
}

export default withAuth(connect(mapStateToProps)(TicketsList))



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
