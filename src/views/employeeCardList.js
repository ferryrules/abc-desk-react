import React, { Component, Fragment } from 'react'
import withAuth from '../hocs/withAuth'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card, Dropdown, Label, Divider, Button, Icon } from 'semantic-ui-react'

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"

class EmployeeCardList extends Component {

  state = {
    filterEmps: 'Active',
    payFilter: '',
    nameSort: true
  }

  eachEmployee = () => {
    const { employees } = this.props.company
    if (employees) {
      // debugger
      return employees.sort((a,b)=>{
        return this.state.nameSort ? a.full_name.localeCompare(b.full_name) : b.full_name.localeCompare(a.full_name)
      })
      .map(emp=>{
        debugger
        return (this.state.filterEmps === emp.active_status || !this.state.filterEmps) && (this.state.payFilter === emp.pay_type || !this.state.payFilter)
        ? (<Card key={emp.id} id={emp.id} onClick={(e)=>window.location.replace(`${window.location.origin}/employees/${emp.id}`)}>
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
        </Card>) : null
      })
    }
  }

  render() {
    // console.log("emplist props", this.props);
    console.log("emplist state", this.state);
    const statOptions = [
      { key: 'active', text: 'Active', value: 'active' },
      { key: 'terminated', text: 'Terminated', value: 'terminated' }
    ]

    const payOptions = [
      { key: 'hourly', text: 'Hourly', value: 'hourly'},
      { key: 'salary', text: 'Salary', value: 'salary'}
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
        <br />
        <br />
        <Button basic color="purple" onClick={(e)=>this.setState({nameSort: !this.state.nameSort})}>Sort <Icon link className="sort" /></Button>
        <Dropdown
          selection
          clearable
          options={statOptions}
          onChange={(e)=>this.setState({filterEmps: e.target.innerText})}
          placeholder="Filter by Status" />
        <span> </span>
        <Dropdown
          selection
          clearable
          options={payOptions}
          onChange={(e)=>this.setState({payFilter: e.target.innerText})}
          placeholder="Filter by Pay Type" />
        <span> </span>
        <br />
        <br />
        <div className="ui three cards">
          {this.eachEmployee()}
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = ({...props}) => {
  return {...props}
}

export default withAuth(connect(mapStateToProps)(EmployeeCardList))
