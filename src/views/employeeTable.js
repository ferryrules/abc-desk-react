import React, { Component, Fragment } from 'react'
import withAuth from '../hocs/withAuth'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Icon, Table, Dropdown, Button, Label } from 'semantic-ui-react'
// import _ from 'lodash'

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"

class EmployeesList extends Component {

  state = {
    nameSort: true,
    payFilter: 'All',
    statFilter: 'active',
    tableColor: 'clear'
  }

  eachEmployee = () => {
    const { employees } = this.props.company

    if (employees) {
      return this.props.company[this.state.statFilter === "all" ? 'employees' : this.state.statFilter]
      .sort((a,b)=>{
        return this.state.nameSort ? a.lname.localeCompare(b.lname) : b.lname.localeCompare(a.lname)
      })
      .filter(emp=>{
        return this.state.payFilter === "All" ? emp : this.state.payFilter === emp.pay_type
      })
      .map(emp=>{
        return (<Table.Row verticalAlign='middle' key={emp.id} id={emp.id}>

        <Table.Cell onClick={(e)=>window.location.replace(`${window.location.origin}/employees/${emp.id}`)} colSpan='2'>
          {emp.lname}, {emp.fname}
          <br/>
          {emp.title}
        </Table.Cell>

        <Table.Cell onClick={(e)=>window.location.replace(`${window.location.origin}/employees/${emp.id}`)} verticalAlign='middle' textAlign="center"><Label color={emp.pay_type === "Salary" ? 'blue' : 'orange'}>{emp.pay_type}</Label></Table.Cell>

        <Table.Cell onClick={(e)=>window.location.replace(`${window.location.origin}/employees/${emp.id}`)} verticalAlign='middle' textAlign="center">{emp.to_currency}</Table.Cell>

        <Table.Cell className={emp.active_status === "Terminated" ? this.state.lightTerm : null} onClick={(e)=>window.location.replace(`${window.location.origin}/employees/${emp.id}`)} verticalAlign='middle' textAlign="center">{emp.active_status}</Table.Cell>

        <Table.Cell onClick={(e)=>window.location.replace(`${window.location.origin}/employees/${emp.id}`)} verticalAlign='middle' textAlign="center"><Icon link name="binoculars"/></Table.Cell>

        <Table.Cell verticalAlign='middle' textAlign="center"><Button delete ui basic color={emp.active_status === 'Active' ? 'red' : 'green'} onClick={()=>{this.termEmployee(emp)} }>
          <i className={`user ${emp.active_status === 'Active' ? 'delete' : 'plus'} icon`} />{emp.active_status === 'Active' ? 'Terminate' : 'Rehire'}
        </Button></Table.Cell>
      </Table.Row>)
      })
    }
  }

  chooseColor = (color) => {
    if (color === "clearclearorangeyellowolivetealbluevioletpurplepinkbrowngreyblack") {
      return
    }
    this.setState({tableColor: color})
  }

  termEmployee = (emp) => {

    let termOrHire = emp.active_status === 'Active' ? { 'active_status': 'Terminated' } : { 'active_status': 'Active' }

    if (window.confirm(`Are you sure you want to ${emp.active_status === 'Active' ? 'terminate' : 'rehire'} this ${emp.full_name}?`)) {
      this.fetFunc(`https://abc-desk.herokuapp.com${this.props.location.pathname}`, 'PATCH', termOrHire, employee=>{
        window.location.replace(`${window.location.origin}/employees/${employee.id}`)
      })
    }
  }

  debug = (e) => {
    console.log(e.target);
    // this.setState({tableColor: e.target.innerText.toLowerCase()})
    debugger
  }

  render() {
    console.log("emplist props", this.props);
    console.log("emplist state", this.state);

    const statOptions = [
      { key: 'Terminated', text: 'Terminated', value: 'Terminated' },
      { key: 'Active', text: 'Active', value: 'Active' },
      { key: 'All', text: 'All', value: 'All' }
    ]

    const payOptions = [
      { key: 'Hourly', text: 'Hourly', value: 'Hourly' },
      { key: 'Salary', text: 'Salary', value: 'Salary' },
      { key: 'All', text: 'All', value: 'All' }
    ]

    const colorOptions = [
      { key: 'Clear', text: 'Clear', value: 'Clear' },
      { key: 'Orange', text: 'Orange', value: 'Orange', label: { color: 'orange', empty: true, circular: true } },
      { key: 'Yellow', text: 'Yellow', value: 'Yellow', label: { color: 'yellow', empty: true, circular: true } },
      { key: 'Olive', text: 'Olive', value: 'Olive', label: { color: 'olive', empty: true, circular: true } },
      { key: 'Teal', text: 'Teal', value: 'Teal', label: { color: 'teal', empty: true, circular: true } },
      { key: 'Blue', text: 'Blue', value: 'Blue', label: { color: 'blue', empty: true, circular: true } },
      { key: 'Violet', text: 'Violet', value: 'Violet', label: { color: 'violet', empty: true, circular: true } },
      { key: 'Purple', text: 'Purple', value: 'Purple', label: { color: 'purple', empty: true, circular: true } },
      { key: 'Pink', text: 'Pink', value: 'Pink', label: { color: 'pink', empty: true, circular: true } },
      { key: 'Brown', text: 'Brown', value: 'Brown', label: { color: 'brown', empty: true, circular: true } },
      { key: 'Grey', text: 'Grey', value: 'Grey', label: { color: 'grey', empty: true, circular: true } },
      { key: 'Black', text: 'Black', value: 'Black', label: { color: 'black', empty: true, circular: true } }
    ]

    return (
      <Fragment>
      <Link to={`/${this.props.company.name}/employees/new`}>
        <div
          className="ui basic green button"
          id={this.props.company.id}>
          <i className="icon add circle" />Add Employee
        </div>
      </Link>
      <span> </span>
      <br />
      <br />
      <Dropdown
      selection
      options={colorOptions}
      onChange={(e)=>this.chooseColor(e.target.textContent.toLowerCase())}
      placeholder="Table Color"/>
      <br />
      <Table celled selectable color={this.state.tableColor} className={(this.state.tableColor && this.state.tableColor !== 'clear') ? "inverted" : ""} >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              colSpan='2'
              onClick={(e)=>this.setState({nameSort: !this.state.nameSort})}>
              Name<Icon link className="sort" />
            </Table.HeaderCell>
            <Table.HeaderCell
              textAlign="center">
              <Dropdown
                simple
                compact
                options={payOptions}
                onChange={(e)=>this.setState({payFilter: e.target.innerText})}
                placeholder="All" />
            </Table.HeaderCell>
            <Table.HeaderCell
              textAlign="center">
              Pay Rate
            </Table.HeaderCell>
            <Table.HeaderCell
              textAlign="center">
              <Dropdown
                simple
                compact
                options={statOptions}
                onChange={(e)=>this.setState({statFilter: e.target.innerText.toLowerCase()})}
                placeholder="Active" />
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">
              View
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">

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
