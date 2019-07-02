import React from 'react'
// import { Card } from 'semantic-ui-react'

class EmployeeForm extends React.Component {

  state = {
    full_name: '',
    pay_type: '',
    pay_rate: '',
    filing_status: '',
    w4_allowance: '',
    active_status: '',
    company_id: this.props.company.id
  }

  componentDidMount() {
    if (this.props.employee) {
      this.setState({
        full_name: this.props.employee.full_name,
        pay_type: this.props.employee.pay_type,
        pay_rate: this.props.employee.pay_rate,
        filing_status: this.props.employee.filing_status,
        w4_allowance: this.props.employee.w4_allowance,
        active_status: this.props.employee.active_status
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
    !!this.props.employee
    ? (fetch(`http://localhost:3000/employees/${this.props.employee.id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        'full_name': this.state.full_name,
        'pay_type': this.state.pay_type,
        'pay_rate': this.state.pay_rate,
        'filing_status': this.state.filing_status,
        'w4_allowance': this.state.w4_allowance,
        'active_status': this.state.active_status,
        'company_id': this.state.company_id
      })
    })
    .then(r=>r.json())
    .then(employee=>{
      // debugger
      this.props.props.history.push(`/companies/${this.state.company_id}`)
    }))
    : (fetch(`http://localhost:3000/employees`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        'full_name': this.state.full_name,
        'pay_type': this.state.pay_type,
        'pay_rate': this.state.pay_rate,
        'filing_status': this.state.filing_status,
        'w4_allowance': this.state.w4_allowance,
        'active_status': this.state.active_status,
        'company_id': parseInt(this.state.company_id)
      })
    })
    .then(r=>r.json())
    .then(employee=>{
      console.log(employee);
      debugger
      this.props.addEmp(employee)
    }))
  }

  render() {
    console.log("empForm state", this.state)
    console.log("empForm props", this.props)
    return(
      <div className="ui equal width form">
        <div className="fields">
          <div className="field">
            <label>Full Name</label>
            <input onChange={this.handleChange} type="text" name="full_name" placeholder="Full Name" value={this.state.full_name} />
          </div>
          <div className="field">
            <label>Pay Type</label>
            <input onChange={this.handleChange} type="text" name="pay_type" placeholder="Salary or Hourly" value={this.state.pay_type} />
          </div>
          <div className="field">
            <label>Pay Rate</label>
            <input onChange={this.handleChange} type="number" placeholder="Pay Rate" name="pay_rate" value={this.state.pay_rate}/>
          </div>
        </div>
        <div className="fields">
          <div className="field">
            <label>Filing Status</label>
            <input onChange={this.handleChange} type="text" placeholder="Single, Married, or Married Filing Single" name="filing_status" value={this.state.filing_status}/>
          </div>
          <div className="field">
            <label>W4 Allowances</label>
            <input onChange={this.handleChange} type="number" placeholder="W4 Allowances" name="w4_allowance" value={this.state.w4_allowance}/>
          </div>
          <div className="field">
            <label>Employement Status</label>
            <input onChange={this.handleChange} type="text" placeholder="Active or Inactive" name="active_status" value={this.state.active_status}/>
          </div>
        </div>
        <button className="ui button" type="submit" onClick={(e)=>this.handleSubmit(e)}>Submit</button>
      </div>
    )
  }
}

export default EmployeeForm
