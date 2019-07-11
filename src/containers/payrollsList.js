import React from 'react'
import withAuth from '../hocs/withAuth'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card } from 'semantic-ui-react'

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"

class PayrollsList extends React.Component {

  eachPayroll = () => {
    const { payrolls } = this.props.company
    if (payrolls) {
      return payrolls.map(payr=>{
        return <Card key={payr.id} id={payr.id}>
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
        return b.props.children.props.children[0].props.children[1].localeCompare(a.props.children.props.children[0].props.children[1])
      })
    }
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <Link to={`/${this.props.company.name}/payrolls/new`}>
          <div
            className="ui basic green button"
            id={this.props.company.id}>
            <i className="icon add circle" />Add Payroll
          </div>
        </Link>
        {this.eachPayroll()}
      </div>
    )
  }
}

const mapStateToProps = ({...props}) => {
  return {...props}
}

export default withAuth(connect(mapStateToProps)(PayrollsList))

// extra
// import PayrollForm from '../forms/payrollForm'
// import Payroll from '../components/payroll'
//
// state = {
//   hide: true,
//   newPayr: false
// }
//
// selectPayroll = (payr) => {
//   this.props.props.history.push(`/payrolls/${payr.id}`)
// }
//
// collapse = (e) => {
//   this.setState({
//     hide: !this.state.hide
//   })
// }
//
// addPayroll = (e) => {
//   this.props.newEmpOrTicketOrPayroll(false, false, true)
//   this.setState({
//     newPayr: !this.state.newPayr
//   })
// }
//
// !this.state.newPayr
// ? (<div>
//     <br />
//     <div className="ui basic green button" id={this.props.company.id} onClick={this.addPayroll}>
//       <i className="icon add circle" />Add Payroll
//     </div>
//     <h3 className="ui fluid button top attached green header" onClick={(e)=>this.collapse(e)} >
//       <i className={`dropdown icon ${this.state.hide ? null : 'counterclockwise rotated'}`} />
//         Payrolls
//     </h3>
//     <div className={`ui cards content transition ${this.state.hide ? 'active' : 'hidden'} attached segment`}>
//       {this.eachPayroll()}
//     </div>
//   </div>)
// : <PayrollForm company={this.props.company} employees={this.props.company.employees}/>
