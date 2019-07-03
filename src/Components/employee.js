import React from 'react'
import withAuth from '../hocs/withAuth'
import { Card } from 'semantic-ui-react'

import EmployeeForm from '../forms/employeeForm'

class Employee extends React.Component {

  state = {
    employee: [],
    edit: false
  }

  componentDidMount() {
    fetch(`http://localhost:3000${this.props.location.pathname}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    .then(r=>r.json())
    .then(employee=>{ this.setState({ employee })
    })
    .catch(error=> console.error('Error', error))
  }

  editEmployee = (emp) => {
    console.log("edit");
    this.setState({
      edit: !this.state.edit
    })
  }

  termEmployee = (emp) => {

    let termOrHire = emp.active_status ? { 'active_status': false } : { 'active_status': true }

    window.confirm(`Are you sure you want to ${emp.active_status ? 'terminate' : 'rehire'} this employee?`)

    this.fetFunc(`http://localhost:3000${this.props.location.pathname}`, 'PATCH', termOrHire, employees=>{
      this.props.history.push(`/companies/${this.state.employee.company.id}`)
    })

  }

  goBack = () => {
    this.props.history.push(`/companies/${this.state.employee.company.id}`)
  }

  render() {
    console.log("employee",this.props);
    const emp = this.state.employee
    return(
      !this.state.edit
      ? (<div className="cards">
        <div className="ui basic grey button" onClick={(e)=>this.goBack()}>
          <i className="angle double left icon" />Back
        </div>
        <Card key={`Employee-${emp.id}`} id={emp.id}>
          <Card.Content>
            <Card.Header>{emp.full_name}</Card.Header>
            <Card.Meta>{emp.active_status ? "Active" : "Terminated"}</Card.Meta>
            <Card.Description>
              Pay Type: {emp.pay_type}
              <br />
              Pay Rate: {emp.pay_rate}
            </Card.Description>
          </Card.Content>
          <div className="ui extra content" >
            <div className="ui basic blue button" onClick={(e)=>this.editEmployee(emp)}>
              <i className="edit outline icon" />Edit
            </div>
            <div className={`delete-button ui basic ${emp.active_status ? 'red' : 'green'} button`} onClick={()=>{this.termEmployee(emp)} }>
              <i className={`user ${emp.active_status ? 'delete' : 'plus'} icon`} />{emp.active_status ? 'Terminate' : 'Rehire'}
            </div>
          </div>
        </Card>
      </div>)
      : <EmployeeForm edit={this.editEmployee} props={this.props} company={emp.company} employee={emp} />
    )
  }

  fetFunc = (url, method, body, then) => {
    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify(body)
    })
    .then(r=>r.json())
    .then(then)
    .catch(error=> console.error('Error', error))
  }
}

export default withAuth(Employee)
