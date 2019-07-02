import React from 'react'
import withAuth from '../hocs/withAuth'

import { Card } from 'semantic-ui-react'
import EmployeeForm from '../forms/employeeForm'

class Employee extends React.Component {

  state = {
    employee: []
  }

  componentDidMount() {
    fetch(`http://localhost:3000/${this.props.location.pathname}`, {
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

  editEmployee = (clear, reset) => {
    this.props.history.push(`${this.props.location.pathname}/edit`)
  }

  render() {
    console.log("employee",this.props);
    const emp = this.state.employee
    return(
      <div className="cards">
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
            <div className="ui basic blue button" onClick={(e)=>this.editEmployee(emp, null)}>
              <i className="edit outline icon" />Edit
            </div>
          </div>
        </Card>
      </div>
    )
  }
}

export default withAuth(Employee)
