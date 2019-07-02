import React from 'react'
import EmployeeForm from '../forms/employeeForm'
import withAuth from '../hocs/withAuth'
import { Card } from 'semantic-ui-react'
// import Employee from '../components/employee'

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"

class EmployeesList extends React.Component {

  state = {
    hide: true,
    newEmp: false
  }

  selectEmployee = (emp) => {
    this.props.props.history.push(`/employees/${emp.id}`)
  }

  eachEmployee = () => {
    if (this.props.employees) {
      return this.props.employees.map(emp=>{
        return <Card key={emp.id} id={emp.id} onClick={(e)=>this.selectEmployee(emp)}>
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
      }).sort((a,b)=>{
        return a.props.children.props.children[0].props.children.localeCompare(b.props.children.props.children[0].props.children)
      })
    }
  }

  collapse = (e) => {
    this.setState({
      hide: !this.state.hide
    })
  }

  addEmployee = (e) => {
    // console.log(parseInt(e.target.id));
    this.setState({
      newEmp: !this.state.newEmp
    })
  }

  render() {
    // console.log("employeeList props", this.props);
    return (
      !this.state.newEmp
      ? (<div>
        <h3 className="ui top attached blue header" onClick={(e)=>this.collapse(e)} >
          <i className={`dropdown icon ${this.state.hide ? null : 'counterclockwise rotated'}`} />
            Employees
        </h3>
        <button id={this.props.company.id} onClick={this.addEmployee}>
          <i className='icon add circle' />
          Add Employee
        </button>
        <div className={`ui cards content transition ${this.state.hide ? 'active' : 'hidden'} attached segment`}>
          {this.eachEmployee()}
        </div>
      </div>)
      : <EmployeeForm company={this.props.company} addEmp={this.addEmployee}/>
    )
  }
}

export default withAuth(EmployeesList)


// <div className="ui extra content" >
//   <div className="ui basic blue button" onClick={(e)=>this.editEmployee(emp)}>
//     <i className="edit outline icon" />Edit
//   </div>
// </div>
