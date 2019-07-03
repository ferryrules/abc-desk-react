import React from 'react'
import PayrollForm from '../forms/payrollForm'
import withAuth from '../hocs/withAuth'
import { Card } from 'semantic-ui-react'
// import Payroll from '../components/payroll'

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"

class PayrollsList extends React.Component {

  state = {
    hide: true,
    newPayr: false
  }

  selectPayroll = (payr) => {
    this.props.props.history.push(`/payrolls/${payr.id}`)
  }

  eachPayroll = () => {
    if (this.props.payrolls) {
      return this.props.payrolls.map(payr=>{
        return <Card key={payr.id} id={payr.id} onClick={(e)=>this.selectPayroll(payr)}>
          <Card.Content>
            <Card.Header>Payroll - {payr.end_date}</Card.Header>
            <Card.Meta>{payr.payroll_status}</Card.Meta>
            <Card.Description>
              From {payr.start_date} To {payr.end_date}
              <br />
              Check Date: {payr.check_date}
            </Card.Description>
          </Card.Content>
        </Card>
      }).sort((a,b)=>{
        return a.props.children.props.children[0].props.children.localeCompare(b.props.children.props.children[0].props.children)
      })
    }
  }

  collapse = (e) => {
    this.setState({
      hide: !this.state.hide
    })
  }

  addPayroll = (e) => {
    this.props.newEmpOrTicketOrPayroll(false, false, true)
    this.setState({
      newPayr: !this.state.newPayr
    })
  }

  render() {
    // console.log("payrollList props", this.props);
    return (
      !this.state.newPayr
      ? (<div>
          <div className="ui basic green button" id={this.props.company.id} onClick={this.addPayroll}>
            <i className="icon add circle" />Add Payroll
          </div>
          <h3 className="ui fluid button top attached green header" onClick={(e)=>this.collapse(e)} >
            <i className={`dropdown icon ${this.state.hide ? null : 'counterclockwise rotated'}`} />
              Payrolls
          </h3>
          <div className={`ui cards content transition ${this.state.hide ? 'active' : 'hidden'} attached segment`}>
            {this.eachPayroll()}
          </div>
        </div>)
      : <PayrollForm company={this.props.company} employees={this.props.company.employees}/>
    )
  }
}

export default withAuth(PayrollsList)
