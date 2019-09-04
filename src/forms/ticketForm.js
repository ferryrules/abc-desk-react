import React from 'react'
import withAuth from '../hocs/withAuth'
import { connect } from 'react-redux'
import { Dropdown } from 'semantic-ui-react'

class TicketForm extends React.Component {

  state = {
    title: '',
    category: '',
    description: '',
    priority: '',
    ticket_status: '',
    company_id: this.props.company.id
  }

  componentDidMount() {
    if (this.props.ticket) {
      this.setState({
        title: this.props.ticket.title,
        category: this.props.ticket.category,
        description: this.props.ticket.description,
        priority: this.props.ticket.priority,
        ticket_status: this.props.ticket.ticket_status
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
    if (!this.state.title || !this.state.category || !this.state.description || !this.state.priority) {
      window.confirm(`All Fields Required`)
    } else {
      !!this.props.ticket
      ? this.fetFunc(`https://abc-desk.herokuapp.com/tickets/${this.props.ticket.id}`, "PATCH", ticket=>{
        window.location.replace(`/tickets/${ticket.id}`)
      })
      : this.fetFunc(`https://abc-desk.herokuapp.com/tickets`, "POST", ticket=>{
        window.location.replace(`/tickets/${ticket.id}`)
      })
    }
  }

  cancelSubmit = () => {
    window.location.replace(`${window.location.origin}/${this.props.company.name}/tickets`)
  }

  render() {
    // console.log("props", this.props);
    // console.log("state", this.state);
    const priOptions = [
      { key: 'high', text: 'High', value: '1 - High' },
      { key: 'medium', text: 'Medium', value: '2 - Medium' },
      { key: 'low', text: 'Low', value: '3 - Low' }
    ]
    const statOptions = [
      { key: 'open', text: 'Open', value: 'open' },
      { key: 'pending', text: 'Pending', value: 'pending' },
      { key: 'closed', text: 'Closed', value: 'closed' }
    ]
    return(
      <div className="ui equal width form">
        <div className="fields">
          <div className="field">
            <label>Title</label>
            <input autoComplete="false" onChange={this.handleChange} type="text" name="title" placeholder="Title" value={this.state.title} />
          </div>
        </div>
        <div className="fields">
          <div className="field">
            <label>Category</label>
            <input autoComplete="false" onChange={this.handleChange} type="text" name="category" placeholder="Category" value={this.state.category} />
          </div>
          <div className="field">
            <label>Priority</label>
            <Dropdown
              selection
              clearable
              options={priOptions}
              onChange={(e)=>this.setState({priority:e.target.innerText})}
              placeholder={this.state.priority} />
          </div>
          <div className="field">
            <label>Status</label>
            <Dropdown
              selection
              clearable
              options={statOptions}
              onChange={(e)=>this.setState({ticket_status:e.target.innerText})}
              placeholder={this.state.ticket_status} />
          </div>
        </div>
        <div className="fields">
          <div className="field">
            <label>Description</label>
            <textarea autoComplete="false" onChange={this.handleChange} type="textarea" placeholder="Description" name="description" value={this.state.description}/>
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
        'ticket_status': this.state.ticket_status,
        'company_id': this.state.company_id,
        'user_id': this.props.id
      })
    })
    .then(r=>r.json())
    .then(then)
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

export default withAuth(connect(mapStateToProps)(TicketForm))
