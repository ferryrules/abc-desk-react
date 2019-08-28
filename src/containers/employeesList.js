import React, { Component, Fragment } from 'react'
import withAuth from '../hocs/withAuth'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Icon, Table, Dropdown, Button } from 'semantic-ui-react'
// import _ from 'lodash'

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"

class EmployeesList extends Component {

  state = {
    filterEmps: 'active',
    nameSort: true
  }

  eachEmployee = () => {
    const { employees } = this.props.company

    if (employees) {
      // debugger
      return this.props.company[!!this.state.filterEmps ? this.state.filterEmps : 'employees']
      .sort((a,b)=>{
        return this.state.nameSort ? a.full_name.localeCompare(b.full_name) : b.full_name.localeCompare(a.full_name)
      })
      .map(emp=>{
        return (<Table.Row verticalAlign='middle' key={emp.id} id={emp.id}>
        <Table.Cell onClick={(e)=>window.location.replace(`${window.location.origin}/employees/${emp.id}`)} colSpan='2'>
          <h5>{emp.full_name}</h5>
          {emp.title}
        </Table.Cell>
        <Table.Cell onClick={(e)=>window.location.replace(`${window.location.origin}/employees/${emp.id}`)} verticalAlign='middle' textAlign="center">{emp.pay_type}</Table.Cell>
        <Table.Cell onClick={(e)=>window.location.replace(`${window.location.origin}/employees/${emp.id}`)} verticalAlign='middle' textAlign="center">{emp.pay_rate}</Table.Cell>
        <Table.Cell onClick={(e)=>window.location.replace(`${window.location.origin}/employees/${emp.id}`)} verticalAlign='middle' textAlign="center">{emp.active_status}</Table.Cell>
        <Table.Cell onClick={(e)=>window.location.replace(`${window.location.origin}/employees/${emp.id}`)} verticalAlign='middle' textAlign="center"><Icon link name="edit outline"/></Table.Cell>
        <Table.Cell verticalAlign='middle' textAlign="center"><Button delete ui basic color={emp.active_status === 'Active' ? 'red' : 'green'} onClick={()=>{this.termEmployee(emp)} }>
          <i className={`user ${emp.active_status === 'Active' ? 'delete' : 'plus'} icon`} />{emp.active_status === 'Active' ? 'Terminate' : 'Rehire'}
        </Button></Table.Cell>
      </Table.Row>)
      })
    }
  }

  termEmployee = (emp) => {

    let termOrHire = emp.active_status === 'Active' ? { 'active_status': 'Terminated' } : { 'active_status': 'Active' }

    if (window.confirm(`Are you sure you want to ${emp.active_status === 'Active' ? 'terminate' : 'rehire'} ${emp.full_name}?`)) {
      this.fetFunc(`http://localhost:3000/employees/${emp.id}`, 'PATCH', termOrHire)
    }
    window.location.reload()
  }

  render() {
    console.log("emplist props", this.props);
    console.log("emplist state", this.state);

    const statOptions = [
      { key: 'Active', text: 'Active', value: 'Active' },
      { key: 'Terminated', text: 'Terminated', value: 'Terminated' },
      { key: 'Hourly', text: 'Hourly', value: 'Hourly' },
      { key: 'Salary', text: 'Salary', value: 'Salary' }
    ]

    // const { column, data, direction, filterEmps } = this.state
    // debugger
    return (
      <Fragment>
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
        onChange={(e)=>this.setState({filterEmps: e.target.innerText.toLowerCase()})}
        placeholder="Filter" />
      <br />
      <br />
      <Table celled fixed selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              colSpan='2'
              onClick={(e)=>this.setState({nameSort: !this.state.nameSort})}>
              <Icon link><h4>Name</h4></Icon>
            </Table.HeaderCell>
            <Table.HeaderCell
              textAlign="center">
              Pay Type
            </Table.HeaderCell>
            <Table.HeaderCell
              textAlign="center">
              Pay Rate
            </Table.HeaderCell>
            <Table.HeaderCell
              textAlign="center">
              Employment Status
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">
              Edit
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">
              Quick Fire
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {this.eachEmployee()}
        </Table.Body>
      </Table>
      </Fragment>
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


const mapStateToProps = ({...props}) => {
  return {...props}
}

export default withAuth(connect(mapStateToProps)(EmployeesList))



// handleSort = (clickedColumn) => () => {
//   const { column, data, direction } = this.state
//
//   if (column !== clickedColumn) {
//     this.setState({
//       column: clickedColumn,
//       data: _.sortBy(data, [clickedColumn]),
//       direction: 'ascending',
//     })
//
//     return
//   }
//
//   this.setState({
//     data: this.eachEmployee.reverse(),
//     direction: direction === 'ascending' ? 'descending' : 'ascending',
//   })
// }

// {_.map(this.eachEmployee(), ({ id, full_name, title, pay_type, pay_rate, active_status }) => (
//   <Table.Row verticalAlign='middle' key={id} id={id} onClick={(e)=>window.location.replace(`${window.location.origin}/employees/${id}`)}>
//     <Table.Cell colSpan='2'>
//       <h3 >{full_name}</h3>
//       <br/>
//       {title}
//     </Table.Cell>
//     <Table.Cell textAlign="center">{pay_type}</Table.Cell>
//     <Table.Cell textAlign="center">{pay_rate}</Table.Cell>
//     <Table.Cell textAlign="center">{active_status}</Table.Cell>
//     <Table.Cell textAlign="center"><Icon link name="edit outline"/></Table.Cell>
//   </Table.Row>
// ))}

// <Link to={`/${this.props.company.name}/employees/new`}>
//   <div
//     className="ui basic green button"
//     id={this.props.company.id}>
//     <i className="icon add circle" />Add Employee
//   </div>
// </Link>
// <Button basic color="purple" >Sort</Button>
// <Dropdown
//   selection
//   clearable
//   options={statOptions}
//   onChange={(e)=>this.setState({filterEmps: e.target.innerText.toLowerCase()})}
//   placeholder="Filter" />
// <span> </span>
// <br />
// <br />
// <div className="ui three cards">
//   {this.eachEmployee()}
// </div>

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
