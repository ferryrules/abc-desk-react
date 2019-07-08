import React from 'react'
// import { Card } from 'semantic-ui-react'

class TicketForm extends React.Component {

  state = {
    title: '',
    category: '',
    description: '',
    priority: '',
    company_id: this.props.company.id
  }

  componentDidMount() {
    if (this.props.ticket) {
      this.setState({
        title: this.props.ticket.title,
        category: this.props.ticket.category,
        description: this.props.ticket.description,
        priority: this.props.ticket.priority
      })
    }
  }

  handleChange = (e) => {
    const {name,value} = e.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (!this.state.title) {
      window.confirm(`Please enter a title`)
    } else {
      !!this.props.ticket
      ? this.fetFunc(`http://localhost:3000/tickets/${this.props.ticket.id}`, "PATCH", ticket=>{
        this.props.props.history.push(`/companies/${this.state.company_id}`)
      })
      : this.fetFunc(`http://localhost:3000/tickets`, "POST", ticket=>{
        this.props.props.history.push(`/tickets/${ticket.id}`)
      })
    }
  }

  cancelSubmit = () => {
    this.props.props.history.push(`/companies`)
  }

  render() {
    // console.log("ticForm state", this.state)
    console.log("ticForm props", this.props)
    // console.log("ticForm comp", this.props.company)
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
            <textarea onChange={this.handleChange} type="textarea" placeholder="Description" name="description" value={this.state.description}/>
          </div>
        </div>
        <button className="ui positive basic button" type="submit" onClick={(e)=>this.handleSubmit(e)}><i className="save icon"></i>Save</button>
        <button className="ui negative basic button" onClick={(e)=>this.cancelSubmit(e)}><i className="undo icon"></i>Cancel</button>
      </div>
    )
  }

  fetFunc = (url, method, then) => {
    fetch(url, {
      method: method,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        'title': this.state.title,
        'category': this.state.category,
        'description': this.state.description,
        'priority': this.state.priority,
        'company_id': this.state.company_id
      })
    })
    .then(r=>r.json())
    .then(then)
  }
}

export default TicketForm
