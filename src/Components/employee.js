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
    .then(employee=>{
      this.setState({
        employee
      })
    })
  }

  editEmployee = (emp) => {
    this.setState({
      edit: !this.state.edit
    })
  }

  deleteEmployee = (emp) => {
    console.log(emp);
    window.confirm('Are you sure you wish to delete this item?')
    fetch(`http://localhost:3000${this.props.location.pathname}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    .then(r=>r.json())
    .then(employees=>{
      this.props.history.push(`/companies/${this.state.employee.company.id}`)
    })
  }

  render() {
    console.log("employee",this.props);
    const emp = this.state.employee
    return(
      !this.state.edit
      ? (<div className="cards">
        <Card key={emp.id} id={emp.id}>
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
            <div className="delete-button ui basic red button" onClick={()=>{this.deleteEmployee(emp)} }>
              <i className="user delete icon" />Delete
            </div>
          </div>
        </Card>
      </div>)
      : <EmployeeForm edit={this.editEmployee} props={this.props} company={emp.company} employee={emp} />
    )
  }
}

export default withAuth(Employee)
