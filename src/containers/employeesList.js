import React, { Component } from 'react'
import withAuth from '../hocs/withAuth'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card, Dropdown, Label, Divider, Button } from 'semantic-ui-react'

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"

class EmployeesList extends Component {

  state = {
    filterEmps: 'employees',
    nameSort: true
  }

  eachEmployee = () => {
    const { employees } = this.props.company
    if (employees) {
      return this.props.company[this.state.filterEmps]
      .sort((a,b)=>{
        return this.state.nameSort ? a.full_name.localeCompare(b.full_name) : b.full_name.localeCompare(a.full_name)
      })
      .map(emp=>{
        return (<Card key={emp.id} id={emp.id} onClick={(e)=>window.location.replace(`http://localhost:3001/employees/${emp.id}`)}>
          <Card.Content>
            <Label ribbon color={emp.active_status === "Active" ? "green" : "grey"}>{emp.active_status}</Label>
            <br />
            <br />
            <Card.Header>{emp.full_name}</Card.Header>
            <Card.Meta>{emp.title}</Card.Meta>
            <Divider />
            <Card.Description>
              Pay Type: <Label color={emp.pay_type === "Salary" ? 'blue' : 'orange'}>{emp.pay_type}</Label>
              <br />
              <br />
              Pay Rate: {emp.to_currency}
            </Card.Description>
          </Card.Content>
        </Card>)
      })
    }
  }

  render() {
    console.log(this.props);
    console.log(this.state);
    const statOptions = [
      { key: 'active', text: 'Active', value: 'active' },
      { key: 'terminated', text: 'Terminated', value: 'terminated' },
      { key: 'hourly', text: 'Hourly', value: 'Hourly'},
      { key: 'salary', text: 'Salary', value: 'salary'}
    ]

    return (
      <div>
        <Link to={`/${this.props.company.name}/employees/new`}>
          <div
            className="ui basic green button"
            id={this.props.company.id}>
            <i className="icon add circle" />Add Employee
          </div>
        </Link>
        <Button basic color="purple" onClick={(e)=>this.setState({nameSort: !this.state.nameSort})}>Sort</Button>
        <Dropdown
          selection
          clearable
          options={statOptions}
          onChange={(e)=>this.setState({filterEmps: e.target.innerText.toLowerCase()})}
          placeholder="Filter" />
        <span> </span>
        <br />
        <br />
        <div className="ui three cards">
          {this.eachEmployee()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({...props}) => {
  return {...props}
}

export default withAuth(connect(mapStateToProps)(EmployeesList))

// extra
// import Employee from '../components/employee'
// import EmployeeForm from '../forms/employeeForm'
// state = {
//   hide: true,
//   newEmp: false
// }
//
// selectEmployee = (emp) => {
//   this.props.props.history.push(`/employees/${emp.id}`)
// }
//
// collapse = (e) => {
//   this.setState({
//     hide: !this.state.hide
//   })
// }
//
// addEmployee = (e) => {
//   this.props.newEmpOrTicketOrPayroll(true, false, false)
//   this.setState({
//     newEmp: !this.state.newEmp
//   })
// }
// !this.state.newEmp
// ? (<div>
//     <div className="ui basic green button" id={this.props.company.id} onClick={this.addEmployee}>
//       <i className="icon add circle" />Add Employee
//     </div>
        // <Dropdown
        //   selection
        //   clearable
        //   options={payTypeOptions}
        //   onChange={(e)=>this.setState({paySort:e.target.innerText})}
        //   placeholder="Filter by Pay Type" />
//     <h3 className="ui fluid button top attached blue header" onClick={(e)=>this.collapse(e)} >
//       <i className={`dropdown icon ${this.state.hide ? null : 'counterclockwise rotated'}`} />
//         Employees
//     </h3>
//     <div className={`ui cards content transition ${this.state.hide ? 'active' : 'hidden'} attached segment`}>
//       {this.eachEmployee()}
//     </div>
//   </div>)
// : <EmployeeForm company={this.props.company} />
