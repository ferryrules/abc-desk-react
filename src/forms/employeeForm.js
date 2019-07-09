import React from 'react'
import { Dropdown } from 'semantic-ui-react'

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

  cancelSubmit = () => {
    window.location.replace(`http://localhost:3001/${this.props.company.name}/employees`)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (!this.state.full_name || !this.state.pay_type || !this.state.pay_rate || !this.state.filing_status || !this.state.w4_allowance || !this.state.active_status) {
      window.confirm(`All Fields Required`)
    } else {
      !!this.props.employee
      ? this.fetFunc(`http://localhost:3000/employees/${this.props.employee.id}`, 'PATCH',employee=>{
        window.location.replace(`/employees/${employee.id}`)
      })
      : this.fetFunc(`http://localhost:3000/employees`, 'POST', employee=>{
        window.location.replace(`/employees/${employee.id}`)
      })
    }
  }

  render() {
    console.log("empForm state", this.state)
    // console.log("empForm props", this.props)
    // console.log("empForm comp", this.props.company)
    const statOptions = [
      { key: 'active', text: 'Active', value: 'Active' },
      { key: 'terminated', text: 'Terminated', value: 'Terminated' }
    ]

    const payTypeOptions = [
      { key: 'hourly', text: 'Hourly', value: 'Hourly'},
      { key: 'salary', text: 'Salary', value: 'Salary'}
    ]

    const filingOptions = [
      { key: 'single', text: 'Single', value: 'Single'},
      { key: 'married', text: 'Married', value: 'Married'},
      { key: 'married-single', text: 'Married Filing Single', value: 'Married Filing Single'}
    ]

    return(
      <div className="ui equal width form">
        <label className="ui h3">New Employee</label>
        <div className="fields">
          <div className="field">
            <label>Full Name</label>
            <input onChange={this.handleChange} type="text" name="full_name" placeholder="Full Name" value={this.state.full_name} />
          </div>
          <div className="field">
            <label>Pay Type</label>
              <Dropdown
                selection
                clearable
                options={payTypeOptions}
                onChange={(e)=>this.setState({pay_type:e.target.innerText})}
                placeholder={this.state.pay_type} />
          </div>
          <div className="field">
            <label>Pay Rate</label>
            <input onChange={this.handleChange} type="number" placeholder="Pay Rate" name="pay_rate" value={this.state.pay_rate}/>
          </div>
        </div>
        <div className="fields">
          <div className="field">
            <label>Filing Status</label>
              <Dropdown
                selection
                clearable
                options={filingOptions}
                onChange={(e)=>this.setState({filing_status:e.target.innerText})}
                placeholder={this.state.filing_status} />
          </div>
          <div className="field">
            <label>W4 Allowances</label>
            <input onChange={this.handleChange} type="number" placeholder="W4 Allowances" name="w4_allowance" value={this.state.w4_allowance}/>
          </div>
          <div className="field">
            <label>Employement Status</label>
              <Dropdown
                selection
                clearable
                options={statOptions}
                onChange={(e)=>this.setState({active_status:e.target.innerText})}
                placeholder={this.state.active_status} />
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
    .then(then)
  }
}

export default EmployeeForm
