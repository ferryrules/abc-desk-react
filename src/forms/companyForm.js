import React from 'react'
// import UserForm from './userForm'
// import { Card } from 'semantic-ui-react'

class CompanyForm extends React.Component {

  state = {
    name: '',
  }

  componentDidMount() {
    if (this.props.company) {
      this.setState({
        name: this.props.company.name
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
    window.location.replace(`http://localhost:3001/profile`)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (!this.state.name) {
      window.confirm(`Please enter a name`)
    } else {
      !!this.props.company
      ? this.fetFunc(`http://localhost:3000/companies/${this.props.company.id}`, 'PATCH',company=>{
        window.location.replace(`http://localhost:3001/profile`)
      })
      : this.fetFunc(`http://localhost:3000/companies`, 'POST', company=>{
        window.location.replace(`http://localhost:3001/profile`)
      })
    }
  }

  render() {
    return(
      <div className="ui equal width form">
        <label className="ui h3">Edit Company</label>
        <div className="fields">
          <div className="field">
            <label>Name</label>
            <input onChange={this.handleChange} type="text" name="name" placeholder="Name" value={this.state.name} />
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
        'name': this.state.name
      })
    })
    .then(r=>r.json())
    .then(then)
  }
}

export default CompanyForm


//extras
// <div className="field">
//   <label>Pay Type</label>
//   <input onChange={this.handleChange} type="text" name="pay_type" placeholder="Salary or Hourly" value={this.state.pay_type} />
// </div>
// <div className="field">
//   <label>Pay Rate</label>
//   <input onChange={this.handleChange} type="number" placeholder="Pay Rate" name="pay_rate" value={this.state.pay_rate}/>
// </div>
// </div>
// <div className="fields">
// <div className="field">
//   <label>Filing Status</label>
//   <input onChange={this.handleChange} type="text" placeholder="Single, Married, or Married Filing Single" name="filing_status" value={this.state.filing_status}/>
// </div>
// <div className="field">
//   <label>W4 Allowances</label>
//   <input onChange={this.handleChange} type="number" placeholder="W4 Allowances" name="w4_allowance" value={this.state.w4_allowance}/>
// </div>
// <div className="field">
//   <label>Employement Status</label>
//   <input onChange={this.handleChange} type="text" placeholder="Active or Inactive" name="active_status" value={this.state.active_status}/>
// </div>
