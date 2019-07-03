import React from 'react'
import { Table } from 'semantic-ui-react'

class EmployeeForm extends React.Component {

  state = {
    payroll_status: '',
    start_date: '',
    end_date: '',
    check_date: '',
    company_id: this.props.company.id
  }

  componentDidMount() {
    if (this.props.payroll) {
      this.setState({
        payroll_status: this.props.payroll.payroll_status,
        start_date: this.props.payroll.start_date,
        end_date: this.props.payroll.end_date,
        check_date: this.props.payroll.check_date
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
    !!this.props.payroll
    ? this.fetFunc(`http://localhost:3000/payrolls/${this.props.payroll.id}`, 'PATCH',payroll=>{
      this.props.props.history.push(`/companies/${this.state.company_id}`)
    })
    : this.fetFunc(`http://localhost:3000/payrolls`, 'POST', payroll=>{
      this.props.props.history.push(`/payrolls/${payroll.id}`)
    })
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

  render() {
    // console.log("payrForm state", this.state)
    // console.log("payrForm props", this.props)
    console.log("payrForm comp", this.props.company)
    const eachEmp = this.props.company.employees.map(e=>{
      return (
        <Table.Row key={`PayrollForm-${e.id}`}>
          <Table.Cell>{e.full_name}</Table.Cell>
          <Table.Cell>40</Table.Cell>
          <Table.Cell>{e.pay_rate}</Table.Cell>
        </Table.Row>
      )
    })

    return(
      <div className="ui equal width form">
        <div className="fields">
          <div className="field">
            <label>Payroll Status</label>
            <input onChange={this.handleChange} type="text" name="payroll_status" placeholder="Status" value={this.state.payroll_status} />
          </div>
        </div>
        <div className="fields">
          <div className="field">
            <label>Start Date</label>
            <input onChange={this.handleChange} type="date" name="start_date" placeholder="Start Date" value={this.state.start_date} />
          </div>
          <div className="field">
            <label>End Date</label>
            <input onChange={this.handleChange} type="date" placeholder="End Date" name="end_date" value={this.state.end_date}/>
          </div>
          <div className="field">
            <label>Check Date</label>
            <input onChange={this.handleChange} type="date" placeholder="Check Date" name="check_date" value={this.state.check_date}/>
          </div>
        </div>
        <Table celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Employee</Table.HeaderCell>
              <Table.HeaderCell>Hours</Table.HeaderCell>
              <Table.HeaderCell>Pay</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {eachEmp}
          </Table.Body>
        </Table>
        <button className="ui button" type="submit" onClick={(e)=>this.handleSubmit(e)}>Submit</button>
      </div>
    )
  }
}

export default EmployeeForm
