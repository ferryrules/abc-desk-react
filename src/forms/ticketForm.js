import React from 'react'
// import { Card } from 'semantic-ui-react'

class TicketForm extends React.Component {

  state = {
    title: this.props.ticket.title,
    category: this.props.ticket.category,
    description: this.props.ticket.description,
    priority: this.props.ticket.priority
  }

  handleChange = (e) => {
    const {name,value} = e.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    fetch(`http://localhost:3000/tickets/${this.props.ticket.id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        'title': this.state.title,
        'category': this.state.category,
        'description': this.state.description,
        'priority': this.state.priority
      })
    })
    .then(r=>r.json())
    .then(ticket=>{
      // debugger
      this.props.editTicket(null,ticket)
    })
  }

  render() {
    // console.log("empForm", this.state)
    return(
      <div className="ui equal width form">
        <div className="fields">
          <div className="field">
            <label>Title</label>
            <input onChange={this.handleChange} type="text" name="title" placeholder="Title" value={this.state.title} />
          </div>
        </div>
        <div className="fields">
          <div className="field">
            <label>Category</label>
            <input onChange={this.handleChange} type="text" name="category" placeholder="Category" value={this.state.category} />
          </div>
          <div className="field">
            <label>Priority</label>
            <input onChange={this.handleChange} type="text" placeholder="Priority" name="priority" value={this.state.priority}/>
          </div>
        </div>
        <div className="fields">
          <div className="field">
            <label>Description</label>
            <input onChange={this.handleChange} type="textarea" placeholder="Description" name="description" value={this.state.description}/>
          </div>
        </div>
        <button className="ui button" type="submit" onClick={(e)=>this.handleSubmit(e)}>Submit</button>
      </div>
    )
  }
}

export default TicketForm
