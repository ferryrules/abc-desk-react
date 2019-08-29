import React from 'react'
import withAuth from '../hocs/withAuth'
import { Table, Button, Input, Icon } from 'semantic-ui-react'

// import PayrollForm from '../forms/payrollForm'

class Payroll extends React.Component {

  state = {
    payroll: [],
    payroll_id: ''
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
        payroll,
        payroll_id: payroll.id
      })
    })
  }

  editPayroll = (e) => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  goBack = () => {
    if (window.confirm('Leave this page without saving?')) {
      this.fetFunc('PATCH', 'Started')
    }
  }

  eachPaycheck = () => {
    const { paychecks } = this.state.payroll
    const { employees } = this.props.company
    if (paychecks && paychecks.length > 0) {
      return paychecks.map(pc=>{
        return (
          <Table.Row>
            <Table.Cell>
              <Icon className="save outline icon" color='green' onClick={(e)=>this.savePaycheck()}/> {pc.emp_name}
            </Table.Cell>
            <Table.Cell textAlign="center">{pc.emp_pay_type}</Table.Cell>
            <Table.Cell textAlign="center">{pc.emp_pay_rate}</Table.Cell>
            <Table.Cell textAlign="center">
              <Input size="mini" name={`hours_${pc.emp_id}`} onChange={(e)=>this.handleChange(e)} placeholder={pc.hours}>
              </Input>
            </Table.Cell>
            <Table.Cell textAlign="center">
              <Input size="mini" name={`hours_${pc.emp_id}`} onChange={(e)=>this.handleChange(e)} placeholder={pc.ot_hours}>
              </Input>
            </Table.Cell>
            <Table.Cell textAlign="center">
              <Input size="mini" name={`hours_${pc.emp_id}`} onChange={(e)=>this.handleChange(e)} placeholder={pc.pto_hours}>
              </Input>
            </Table.Cell>
            <Table.Cell textAlign="center">
              <Input size="mini" name={`hours_${pc.emp_id}`} onChange={(e)=>this.handleChange(e)} placeholder={pc.vacation_hours}>
              </Input>
            </Table.Cell>
            <Table.Cell textAlign="center">
              <Input size="mini" name={`hours_${pc.emp_id}`} onChange={(e)=>this.handleChange(e)} placeholder={pc.holiday_hours}>
              </Input>
            </Table.Cell>
            <Table.Cell textAlign="center">
              <Input size="mini" name={`hours_${pc.emp_id}`} onChange={(e)=>this.handleChange(e)} placeholder={pc.sick_hours}>
              </Input>
            </Table.Cell>
          </Table.Row>
        )
      })
    } else if (employees) {
      // eslint-disable-next-line
      return this.props.company.employees.map(emp=>{
        if (emp.active_status === 'Active') {
          return (
            <Table.Row>
              <Table.Cell>
                <Icon className="save outline icon" color='green' onClick={(e)=>this.savePaycheck()}/> {emp.full_name}</Table.Cell>
              <Table.Cell textAlign="center">{emp.pay_type}</Table.Cell>
              <Table.Cell textAlign="center">{emp.weekly_to_currency}</Table.Cell>
              <Table.Cell>
                <Input size="mini" name={`hours_${emp.id}`} onChange={(e)=>this.handleChange(e)}>
                </Input>
              </Table.Cell>
              <Table.Cell>
                <Input size="mini" name={`ot_hours_${emp.id}`} onChange={(e)=>this.handleChange(e)}>
                </Input>
              </Table.Cell>
              <Table.Cell>
                <Input size="mini" name={`pto_hours_${emp.id}`} onChange={(e)=>this.handleChange(e)}>
                </Input>
              </Table.Cell>
              <Table.Cell>
                <Input size="mini" name={`vacation_hours_${emp.id}`} onChange={(e)=>this.handleChange(e)}>
                </Input>
              </Table.Cell>
              <Table.Cell>
                <Input size="mini" name={`holiday_hours_${emp.id}`} onChange={(e)=>this.handleChange(e)}>
                </Input>
              </Table.Cell>
              <Table.Cell>
                <Input size="mini" name={`sick_hours_${emp.id}`} onChange={(e)=>this.handleChange(e)}>
                </Input>
              </Table.Cell>
            </Table.Row>
          )
        }
      })
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  submitPayroll = () => {
    this.fetFunc('PATCH', 'Submitted')
  }

  render() {
    console.log("payroll props",this.props);
    console.log("payroll state",this.state);

    return(
      !this.state.edit
      ? (<div>
          <Button basic color='grey' onClick={(e)=>this.goBack()}>
            <i className="angle double left icon" />
            Back
          </Button>
          <Button basic color='green' onClick={(e)=>this.submitPayroll()}>
            <i className="check circle outline icon" />
            Submit
          </Button>
          <Table celled structured striped>
            <Table.Header>
              <Table.Row textAlign="center">
                <Table.HeaderCell verticalAlign='middle' rowSpan='2'>Name</Table.HeaderCell>
                <Table.HeaderCell verticalAlign='middle' rowSpan='2'>Pay Type</Table.HeaderCell>
                <Table.HeaderCell verticalAlign='middle' rowSpan='2'>Pay Rate</Table.HeaderCell>
                <Table.HeaderCell colSpan='6'>Hours Breakdown</Table.HeaderCell>
              </Table.Row>
              <Table.Row  textAlign="center">
                <Table.HeaderCell>Hours</Table.HeaderCell>
                <Table.HeaderCell>OT Hours</Table.HeaderCell>
                <Table.HeaderCell>PTO Hours</Table.HeaderCell>
                <Table.HeaderCell>Vacation Hours</Table.HeaderCell>
                <Table.HeaderCell>Holiday Hours</Table.HeaderCell>
                <Table.HeaderCell>Sick Hours</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.eachPaycheck()}
            </Table.Body>
          </Table>
        </div>)
      : null
    )
  }

  fetFunc = (method, status) => {
    fetch(`http://localhost:3000${this.props.location.pathname}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        payroll_status: status
      })
    })
    .then(r=>r.json())
    .then(window.location.replace(`/${this.props.company.name}/payrolls`))
  }
}

export default withAuth(Payroll)

// <Card key={`payroll-${payr.id}`} id={payr.id}>
//   <Card.Content>
//     <Card.Header>Payroll</Card.Header>
//     <Card.Meta>{payr.payroll_status}</Card.Meta>
//     <Card.Description>
//       Start Date: {payr.start_date}
//       <br />
//       End Date: {payr.end_date}
//       <br />
//       Check Date: {payr.check_date}
//     </Card.Description>
//   </Card.Content>
//   <div className="ui extra content" >
//     <div className="ui basic blue button" onClick={(e)=>this.editPayroll(payr)}>
//       <i className="edit outline icon" />{payr.payroll_status === 'Not Started' ? 'Start' : 'Resume'}
//     </div>
//   </div>
// </Card>

// const eachEmp =  this.state.employees.map(e=>{
//   if (e.active_status === 'Active') {
//     return (
//       <Table.Row key={`PayrollForm-${e.id}`}>
//         <Table.Cell>{e.full_name}</Table.Cell>
//           <Modal compact trigger={<Table.Cell>0</Table.Cell>} onClose={(e)=>console.log("closed")}>
//             <Modal.Header>{`Enter ${e.full_name}'s Hours`}</Modal.Header>
//             <Modal.Content>
//               <Modal.Description>
//                 <Header>Default Profile Image</Header>
//                 <p>We've found the following gravatar image associated with your e-mail address.</p>
//                 <p>Is it okay to use this photo?</p>
//               </Modal.Description>
//             </Modal.Content>
//           </Modal>
//         <Table.Cell>{e.pay_rate}</Table.Cell>
//       </Table.Row>
//     )
//   }
// })
// <Table celled selectable>
//   <Table.Header>
//     <Table.Row>
//       <Table.HeaderCell>Employee</Table.HeaderCell>
//       <Table.HeaderCell>Hours</Table.HeaderCell>
//       <Table.HeaderCell>Pay</Table.HeaderCell>
//     </Table.Row>
//   </Table.Header>
//
//   <Table.Body>
//     {eachEmp}
//   </Table.Body>
// </Table>
//
