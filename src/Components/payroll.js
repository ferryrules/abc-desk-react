import React from 'react'
import withAuth from '../hocs/withAuth'
import { Card, Modal, Table, Header, Button } from 'semantic-ui-react'

import PayrollForm from '../forms/payrollForm'

class Payroll extends React.Component {

  state = {
    payroll: [],
    hours: 0,
    ot_hours: 0,
    vacation_hours: 0,
    holiday_hours: 0,
    sick_hours: 0,
    employee_id: '',
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
    window.location.replace(`/${this.props.company.name}/payrolls`)
  }

  render() {
    console.log("payroll",this.props);
    console.log("payroll state",this.state);
    const payr = this.state.payroll

    return(
      !this.state.edit
      ? (<div>
          <Button basic color='grey' onClick={(e)=>this.goBack()}>
            <i className="angle double left icon" />
            Back
          </Button>
          <Table celled structured>
            <Table.Row textAlign="center">
              <Table.HeaderCell verticalAlign='middle' rowSpan='2'>Name</Table.HeaderCell>
              <Table.HeaderCell verticalAlign='middle' rowSpan='2'>Pay Type</Table.HeaderCell>
              <Table.HeaderCell verticalAlign='middle' rowSpan='2'>Pay Rate</Table.HeaderCell>
              <Table.HeaderCell colSpan='6'>Hours Breakdown</Table.HeaderCell>
              <Table.HeaderCell colSpan='3'>Hours Breakdown</Table.HeaderCell>
            </Table.Row>
            <Table.Row  textAlign="center">
              <Table.HeaderCell>Hours</Table.HeaderCell>
              <Table.HeaderCell>OT Hours</Table.HeaderCell>
              <Table.HeaderCell>PTO Hours</Table.HeaderCell>
              <Table.HeaderCell>Vacation Hours</Table.HeaderCell>
              <Table.HeaderCell>Holiday Hours</Table.HeaderCell>
              <Table.HeaderCell>Sick Hours</Table.HeaderCell>
              <Table.HeaderCell>Type</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Amount</Table.HeaderCell>
            </Table.Row>
          </Table>
        </div>)
      : <PayrollForm  edit={this.editPayroll} props={this.props} company={payr.company} payroll={payr} />
    )
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
