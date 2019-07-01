import React from 'react'
import { Card } from 'semantic-ui-react'
import EmployeeForm from '../forms/employeeForm'

class Employee extends React.Component {

  state = {
    edit: true
  }

  selectEmployee = (clear, reset) => {
    // debugger
    this.props.clearOrResetEmployees(clear, reset)
  }

  editEmployee = (clear, reset) => {
    // debugger
    if (this.state.edit) {
      this.setState({
        edit: !this.state.edit
      })
    } else {
      this.selectEmployee(null, reset)
      this.setState({
        edit: !this.state.edit
      })
    }
  }

  render() {
    const emp = this.props.employee
    return(
      this.state.edit
      ? (<div className="cards">
          <Card key={emp.id} onClick={(e)=>{this.selectEmployee(emp, null)}} id={emp.id}>
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
        </div>)
      : <EmployeeForm editEmployee={this.editEmployee} employee={emp} />
    )
  }
}

export default Employee
