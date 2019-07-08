import React from 'react'
import withAuth from '../hocs/withAuth'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card, Dropdown } from 'semantic-ui-react'

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"

class EmployeesList extends React.Component {

  state = {
    statSort: ''
  }

  eachEmployee = () => {
    const { employees } = this.props.company
    if (employees) {
      return employees.map(emp=>{
        return (this.state.statSort === emp.active_status || !this.state.statSort) ? (<Card key={emp.id} id={emp.id} onClick={(e)=>window.location.replace(`http://localhost:3001/employees/${emp.id}`)}>
          <Card.Content>
            <Card.Header>{emp.full_name}</Card.Header>
            <Card.Meta>{emp.active_status}</Card.Meta>
            <Card.Description>
              Pay Type: {emp.pay_type}
              <br />
              Pay Rate: {emp.pay_rate}
            </Card.Description>
          </Card.Content>
        </Card>) : null
      })
      // .sort((a,b)=>{
      //   console.log(a.props.children.props.children[0].props.children);
      //   console.log(b.props.children.props.children[0].props.children);
      //   debugger
      //   return a.props.children.props.children[0].props.children.localeCompare(b.props.children.props.children[0].props.children)
      // })
    }
  }

  render() {
    const statOptions = [
      { key: 'active', text: 'Active', value: 'Active' },
      { key: 'terminated', text: 'Terminated', value: 'Terminated' }
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
        <Dropdown
          selection
          clearable
          options={statOptions}
          onChange={(e)=>this.setState({statSort:e.target.innerText})}
          placeholder="Filter by Status" />
        <br />
        <br />
        <div className="ui cards">
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
//     <h3 className="ui fluid button top attached blue header" onClick={(e)=>this.collapse(e)} >
//       <i className={`dropdown icon ${this.state.hide ? null : 'counterclockwise rotated'}`} />
//         Employees
//     </h3>
//     <div className={`ui cards content transition ${this.state.hide ? 'active' : 'hidden'} attached segment`}>
//       {this.eachEmployee()}
//     </div>
//   </div>)
// : <EmployeeForm company={this.props.company} />
