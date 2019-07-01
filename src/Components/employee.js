import React from 'react'
import { Card } from 'semantic-ui-react'

class Employee extends React.Component {

  // state = {
  //
  // }

  selectEmployee = (e, emp) => {
    this.props.clearEmployees(emp)
    // this.setState({
    //   clicked: !this.state.clicked
    // })
  }

  render() {
    const emp = this.props.employee
    return(
      <div className="cards">
        <Card key={emp.id} onClick={(e)=>{this.selectEmployee(e, emp)}} id={emp.id}>
          <Card.Content>
            <Card.Header>{emp.full_name}</Card.Header>
            <Card.Meta>{emp.active_status ? "Active" : "Terminated"}</Card.Meta>
            <Card.Description>
              Pay Type: {emp.pay_type}
              <br />
              Pay Rate: {emp.pay_rate}
            </Card.Description>
          </Card.Content>
        </Card>
      </div>
    )
  }
}

export default Employee
