import React from 'react'
import Employee from '../components/employee'
// import { connect } from 'react-redux'
// import { Card } from 'semantic-ui-react'
// import { Alert } from "shards-react";

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"

class EmployeesList extends React.Component {

  state = {
    employees: this.props.employees,
    hide: true
  }

  clearEmployees = (emp) => {
    this.setState({
      employees: [emp]
    })
  }

  eachEmployee = () => {
    if (this.state.employees) {
      return this.state.employees.map(e=>{
        return <Employee clearEmployees={this.clearEmployees} employee={e} />
      }).sort((a,b)=>{
        return a.props.employee.full_name.localeCompare(b.props.employee.full_name)
      })
    }
  }

  collapse = (e) => {
    this.setState({
      hide: !this.state.hide
    })
  }

  render() {
    // console.log("employeesList", this.props);
    return (
      <div>
        <h3 className="ui top attached blue header" onClick={(e)=>this.collapse(e)}>
          <i className={`dropdown icon ${this.state.hide ? null : 'counterclockwise rotated'}`} />
            Employees
        </h3>
        <div className={`ui cards content transition ${this.state.hide ? 'active' : 'hidden'} attached segment`}>
          {this.eachEmployee()}
        </div>
      </div>
    )
  }
}

export default EmployeesList
