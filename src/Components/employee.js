import React from 'react'
import withAuth from '../hocs/withAuth'
import { connect } from 'react-redux'
import { Button, Grid, Label, Container, Icon, Divider, List } from 'semantic-ui-react'

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

    this.fetFunc(`http://localhost:3000${this.props.location.pathname}`, 'PATCH', termOrHire, employee=>{
      window.location.replace(`http://localhost:3001/employees/${employee.id}`)
    })
  }

  goBack = () => {
    window.location.replace(`/${this.props.company.name}/employees`)
  }

  listPaychecks = () => {
    const {paychecks, payrolls} = this.state.employee
    if (paychecks && paychecks.length > 0) {
      return payrolls.map(pr=>{
        // eslint-disable-next-line
        return paychecks.map(pc=>{
          if (pc.payroll_id === pr.id) {
            return (
              <List.Item key={`pr-${pr.id}`} icon='time'>
                <b>Check Date: </b> {pr.check_date} <b>- Hours:</b> {pc.hours}</List.Item>
            )
          }
        })
      })
    }
  }

  listRecurring = () => {
    const recur = this.state.employee.recurring_adjustments
    if (recur && recur.length > 0) {
      return recur.map(ra=>{
        return (
          <List.Item key={`ra-${ra.id}`} icon='dollar'><b>Description: </b> {ra.description}</List.Item>
        )
      })
    }
  }

  render() {
    console.log("employee",this.props);
    console.log("employee state",this.state);
    const emp = this.state.employee
    return(
      !this.state.edit
      ? (
      <Grid columns={3}>
        {/* buttons */}
        <Grid.Row>
          <Grid.Column textAlign="center">
            <Button basic color='grey' onClick={(e)=>this.goBack()}><i className="angle double left icon" />Back</Button>
          </Grid.Column>
          <Grid.Column textAlign="center">
            <Button basic color='blue' onClick={(e)=>this.editEmployee()}><i className="edit outline icon" />Edit</Button>
          </Grid.Column>
          <Grid.Column textAlign="center">
            <Button delete ui basic  color={emp.active_status === 'Active' ? 'red' : 'green'} onClick={()=>{this.termEmployee(emp)} }>
              <i className={`user ${emp.active_status === 'Active' ? 'delete' : 'plus'} icon`} />{emp.active_status === 'Active' ? 'Terminate' : 'Rehire'}
            </Button>
          </Grid.Column>
        </Grid.Row>
        {/* employee name and status */}
        <Grid.Row>
          <Grid.Column></Grid.Column>
          <Grid.Column>
            <Label ribbon color={emp.active_status === 'Active' ? 'green' : 'grey'}>{emp.active_status}</Label>
            <br />
            <br />
            <Container textAlign="center">
              <h3><Icon className="chess queen" />{emp.full_name}</h3>
              <h5>Title: {emp.title? emp.title:null}</h5>
            </Container>
          </Grid.Column>
          <Grid.Column></Grid.Column>
        </Grid.Row>
        {/* employee pay */}
        <Grid.Row>
          <Grid.Column></Grid.Column>
          <Grid.Column textAlign="center">
            <b>Pay Type:</b> <Label color={emp.pay_type === "Salary" ? 'blue' : 'orange'}>{emp.pay_type}</Label>
            <br />
            <br />
            <b>Pay Rate:</b> {emp.to_currency}
          </Grid.Column>
          <Grid.Column></Grid.Column>
        </Grid.Row>
        <Divider />
        {/* headers */}
        <Grid.Row divided>
          <Grid.Column textAlign="center">
            <h4>Tax Information</h4>
          </Grid.Column>
          <Grid.Column textAlign="center">
            <h4>Paychecks</h4>
          </Grid.Column>
          <Grid.Column textAlign="center">
            <h4>Recurring Adjustments</h4>
          </Grid.Column>
        </Grid.Row>
        {/* info */}
        <Grid.Row>
          <Grid.Column textAlign="center">
            <b>Filing Status: </b> {emp.filing_status}
            <br />
            <br />
            <b>Allowances: </b> {emp.w4_allowance}
          </Grid.Column>
          <Grid.Column textAlign="center">
            <List>
              {this.listPaychecks()}
            </List>
          </Grid.Column>
          <Grid.Column textAlign="center">
            <List>
              {this.listRecurring()}
            </List>
          </Grid.Column>
        </Grid.Row>
      </Grid>)
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
