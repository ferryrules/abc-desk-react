import React from 'react'
// import { Card } from 'semantic-ui-react'
// u1 = User.create(email: 'ferris@ferryrules.com', username: 'ferryrules', password: 'asd', permission: 'Super Admin', fname: 'Ferris', lname: 'Boran')
class UserForm extends React.Component {

  state = {
    fname: '',
    lname: '',
    permission: '',
    username: '',
    email: ''
  }

  componentDidMount() {
    if (this.props) {
      this.setState({
        fname: this.props.fname,
        lname: this.props.lname,
        permission: this.props.permission,
        username: this.props.username,
        email: this.props.email
      })
    }
  }

  handleChange = (e) => {
    const {name,value} = e.target
    this.setState({
      [name]: value
    })
  }

  cancelSubmit = () => {
    this.props.history.push(`/companies`)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (!this.state.fname) {
      window.confirm(`Please enter a name`)
    } else {
      !!this.props.user
      ? this.fetFunc(`http://localhost:3000/users/${this.props.id}`, 'PATCH',user=>{
        this.props.history.push(`/companies/${this.props.company.company_id}`)
      })
      : this.fetFunc(`http://localhost:3000/users`, 'POST', user=>{
        this.props.history.push(`/users/${user.id}`)
      })
    }
  }

  render() {
    // console.log("empForm state", this.state)
    console.log("userForm props", this.props)
    // console.log("empForm comp", this.props.company)

    return(
      <div className="ui equal width form">
        <label className="ui h3">{!!this.props.username ? this.props.username : 'New User'}</label>
        <div className="fields">
          <div className="field">
            <label>First Name</label>
            <input onChange={this.handleChange} type="text" name="fname" placeholder="Full Name" value={this.state.fname} />
          </div>
          <div className="field">
            <label>Last Name</label>
            <input onChange={this.handleChange} type="text" name="lname" placeholder="Salary or Hourly" value={this.state.lname} />
          </div>
          <div className="field">
            <label>Permission</label>
            <input onChange={this.handleChange} type="text" placeholder="Permissions" name="permission" value={this.state.permission}/>
          </div>
        </div>
        <div className="fields">
          <div className="field">
            <label>Username</label>
            <input onChange={this.handleChange} type="text" placeholder="Username" name="username" value={this.state.username}/>
          </div>
          <div className="field">
            <label>E-mail</label>
            <input onChange={this.handleChange} type="text" placeholder="E-mail" name="email" value={this.state.email}/>
          </div>
        </div>
        <button className="ui positive basic button" type="submit" onClick={(e)=>this.handleSubmit(e)}><i className="save icon"></i>Save</button>
        <button className="ui negative basic button" onClick={(e)=>this.cancelSubmit()}><i className="undo icon"></i>Cancel</button>
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
        'fname': this.state.fname,
        'lname': this.state.lname,
        'permission': this.state.permission,
        'username': this.state.username,
        'email': this.state.email
      })
    })
    .then(r=>r.json())
    .then(then)
  }
}

export default UserForm
