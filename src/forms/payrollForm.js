import React from 'react'
import withAuth from '../hocs/withAuth'
// import { Table, Modal, Header, Input } from 'semantic-ui-react'

class PayrollForm extends React.Component {

  state = {
    payroll_status: '',
    start_date: '',
    end_date: '',
    check_date: '',
    company_id: this.props.company.id,
    employees: []
  }

  componentDidMount() {
    if (this.props.payroll) {
      this.setState({
        payroll_status: this.props.payroll.payroll_status,
        start_date: this.props.payroll.start_date,
        end_date: this.props.payroll.end_date,
        check_date: this.props.payroll.check_date,
        employees: this.props.company.employees
      })
    }
  }

  handleChange = (e) => {
    const {name,value} = e.target
    this.setState({
      [name]: value
    })
  }

  cancelSubmit = (e) => {
    window.location.replace(`/${this.props.company.name}/payrolls`)
  }

  handleSubmit = (e) => {
    const {start_date, end_date, check_date} = this.state
    e.preventDefault()
    if (!start_date || !end_date || !check_date) {
      window.confirm(`Please enter all dates`)
    } else {
      !!this.props.payroll
      ? this.fetFunc(`http://localhost:3000/payrolls/${this.props.payroll.id}`, 'PATCH',payroll=>{
        window.location.replace(`/payrolls/${payroll.id}`)
      })
      : this.fetFunc(`http://localhost:3000/payrolls`, 'POST', payroll=>{
        window.location.replace(`/payrolls/${payroll.id}`)
      })
    }
  }

  render() {
    // console.log("payrForm state", this.state)
    // console.log("payrForm props", this.props)
    // console.log("payrForm comp", this.props.company)
    // eslint-disable-next-line

    return(
      <div className="ui equal width form">
        <div className="fields">
          <div className="field">
            <label>Payroll Status</label>
            <input autoComplete="false" disabled='true' onChange={this.handleChange} type="text" name="payroll_status" placeholder="Not Started" value={this.state.payroll_status} />
          </div>
        </div>
        <div className="fields">
          <div className="field">
            <label>Start Date</label>
            <input autoComplete="false" onChange={this.handleChange} type="date" name="start_date" placeholder="Start Date" value={this.state.start_date} />
          </div>
          <div className="field">
            <label>End Date</label>
            <input autoComplete="false" onChange={this.handleChange} type="date" placeholder="End Date" name="end_date" value={this.state.end_date}/>
          </div>
          <div className="field">
            <label>Check Date</label>
            <input autoComplete="false" onChange={this.handleChange} type="date" placeholder="Check Date" name="check_date" value={this.state.check_date}/>
          </div>
        </div>
        <button className="ui positive basic button" type="submit" onClick={(e)=>this.handleSubmit(e)}><i className="save icon"></i>Start</button>
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
        'payroll_status': this.state.payroll_status,
        'start_date': this.state.start_date,
        'end_date': this.state.end_date,
        'check_date': this.state.check_date,
        'company_id': parseInt(this.state.company_id)
      })
    })
    .then(r=>r.json())
    .then(then)
  }
}

export default withAuth(PayrollForm)
