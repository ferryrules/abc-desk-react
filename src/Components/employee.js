import React from 'react'
import withAuth from '../hocs/withAuth'
import { connect } from 'react-redux'
import { Card } from 'semantic-ui-react'

import EmployeeForm from '../forms/employeeForm'

class Employee extends React.Component {

  state = {
    employee: [],
    edit: false
  }

  componentDidMount() {
    fetch(`http://localhost:3000${this.props.location.pathname}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    .then(r=>r.json())
    .then(employee=>{ this.setState({ employee })
    })
    .catch(error=> console.error('Error', error))
  }

  editEmployee = (emp) => {
    this.setState({
      edit: !this.state.edit
    })
  }

  termEmployee = (emp) => {

    let termOrHire = emp.active_status === 'Active' ? { 'active_status': 'Terminated' } : { 'active_status': 'Active' }

    window.confirm(`Are you sure you want to ${emp.active_status === 'Active' ? 'terminate' : 'rehire'} this employee?`)

    this.fetFunc(`http://localhost:3000${this.props.location.pathname}`, 'PATCH', termOrHire, employees=>{
      window.location.replace(`http://localhost:3001/${this.props.company.name}/employees`)
    })
  }

  goBack = () => {
    window.location.replace(`/${this.props.company.name}/employees`)
  }

  render() {
    console.log("employee",this.props);
    const emp = this.state.employee
    return(
      !this.state.edit
      ? (<div className="cards">
        <div className="ui basic grey button" onClick={(e)=>this.goBack()}>
          <i className="angle double left icon" />Back
        </div>
        <Card key={`Employee-${emp.id}`} id={emp.id}>
          <Card.Content>
            <Card.Header>{emp.full_name}</Card.Header>
            <Card.Meta>{emp.active_status}</Card.Meta>
            <Card.Description>
              Pay Type: {emp.pay_type}
              <br />
              Pay Rate: {emp.pay_rate}
            </Card.Description>
          </Card.Content>
          <div className="ui extra content" >
            <div className="ui basic blue button" onClick={(e)=>this.editEmployee(emp)}>
              <i className="edit outline icon" />Edit
            </div>
            <div className={`delete-button ui basic ${emp.active_status === 'Active' ? 'red' : 'green'} button`} onClick={()=>{this.termEmployee(emp)} }>
              <i className={`user ${emp.active_status === 'Active' ? 'delete' : 'plus'} icon`} />{emp.active_status === 'Active' ? 'Terminate' : 'Rehire'}
            </div>
          </div>
        </Card>
      </div>)
      : <EmployeeForm edit={this.editEmployee} props={this.props} employee={emp} company={this.props.company}/>
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

const mapStateToProps = ({ usersReducer: { user: { id, email, username, permission, fname, lname } } }) => ({
  id,
  email,
  username,
  permission,
  fname,
  lname
})

export default withAuth(connect(mapStateToProps)(Employee))
