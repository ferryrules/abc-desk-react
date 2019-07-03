import React from 'react'
import withAuth from '../hocs/withAuth'
import { Card } from 'semantic-ui-react'

import PayrollForm from '../forms/payrollForm'

class Payroll extends React.Component {

  state = {
    payroll: [],
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
    .then(payroll=>{
      this.setState({
        payroll
      })
    })
  }

  editPayroll = (payr) => {
    this.setState({
      edit: !this.state.edit
    })
  }

  render() {
    console.log("payroll",this.props);
    const payr = this.state.payroll
    return(
      !this.state.edit
      ? (<div className="cards">
        <Card key={payr.id} id={payr.id}>
          <Card.Content>
            <Card.Header>Payroll</Card.Header>
            <Card.Meta>{payr.payroll_status}</Card.Meta>
            <Card.Description>
              Start Date: {payr.start_date}
              <br />
              End Date: {payr.end_date}
              <br />
              Check Date: {payr.check_date}
            </Card.Description>
          </Card.Content>
          <div className="ui extra content" >
            <div className="ui basic blue button" onClick={(e)=>this.editPayroll(payr)}>
              <i className="edit outline icon" />{payr.payroll_status === 'Not Started' ? 'Start' : 'Resume'}
            </div>
          </div>
        </Card>
      </div>)
      : <PayrollForm edit={this.editPayroll} props={this.props} company={payr.company} payroll={payr} />
    )
  }
}

export default withAuth(Payroll)
