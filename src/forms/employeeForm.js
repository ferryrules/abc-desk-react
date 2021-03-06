import React from 'react'
import withAuth from '../hocs/withAuth'
import { Dropdown } from 'semantic-ui-react'

class EmployeeForm extends React.Component {

  state = {
    fname: '',
    lname: '',
    pay_type: '',
    pay_rate: '',
    filing_status: '',
    w4_allowance: '',
    active_status: '',
    title: '',
    company_id: this.props.company.id
  }

  componentDidMount() {
    if (this.props.employee) {
      this.setState({
        fname: this.props.employee.fname,
        lname: this.props.employee.lname,
        pay_type: this.props.employee.pay_type,
        pay_rate: this.props.employee.pay_rate,
        filing_status: this.props.employee.filing_status,
        w4_allowance: this.props.employee.w4_allowance,
        active_status: this.props.employee.active_status,
        title: this.props.employee.title
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
    window.location.replace(`${window.location.origin}/${this.props.company.name}/employees`)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (!this.state.fname || !this.state.lname || !this.state.pay_type || !this.state.pay_rate || !this.state.filing_status || !this.state.active_status || !this.state.title) {
      window.confirm(`All Fields Required`)
    } else {
      !!this.props.employee
      ? this.fetFunc(`https://abc-desk.herokuapp.com/employees/${this.props.employee.id}`, 'PATCH',employee=>{
        window.location.replace(`/employees/${employee.id}`)
      })
      : this.fetFunc(`https://abc-desk.herokuapp.com/employees`, 'POST', employee=>{
        window.location.replace(`/${this.props.company.name}/employees`)
      })
    }
  }

  render() {
    // console.log("empForm state", this.state)
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
        <label className="ui h3">{!this.props.full_name ? 'New Employee' : `Edit ${this.state.full_name}`}</label>
        <div className="fields">
          <div className="field">
            <label>First Name</label>
            <input autoComplete="false" onChange={this.handleChange} type="text" name="fname" placeholder="First Name" value={this.state.fname} />
          </div>
          <div className="field">
            <label>Last Name</label>
            <input autoComplete="false" onChange={this.handleChange} type="text" name="lname" placeholder="Last Name" value={this.state.lname} />
          </div>
          <div className="field">
            <label>Title</label>
            <input autoComplete="false" onChange={this.handleChange} type="text" name="title" placeholder="Title" value={this.state.title} />
          </div>
        </div>
        <div className="fields">
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
            <input autoComplete="false" onChange={this.handleChange} type="number" placeholder="Pay Rate" name="pay_rate" value={this.state.pay_rate}/>
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
            <input autoComplete="false" onChange={this.handleChange} type="number" placeholder="W4 Allowances" name="w4_allowance" value={this.state.w4_allowance}/>
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
        'fname': this.state.fname,
        'lname': this.state.lname,
        'pay_type': this.state.pay_type,
        'pay_rate': this.state.pay_rate,
        'filing_status': this.state.filing_status,
        'w4_allowance': this.state.w4_allowance,
        'active_status': this.state.active_status,
        'title': this.state.title,
        'company_id': parseInt(this.state.company_id)
      })
    })
    .then(r=>r.json())
    .then(then)
  }
}

export default withAuth(EmployeeForm)
