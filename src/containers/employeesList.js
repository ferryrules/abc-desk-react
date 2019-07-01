import React from 'react'
// import { connect } from 'react-redux'
import { Card } from 'semantic-ui-react'
// import { Alert } from "shards-react";

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
// import Employee from '../components/employee'

class EmployeesList extends React.Component {

  state = {
    hide: true
  }

  eachEmployee = () => {
    if (this.props.company.employees) {
      return this.props.company.employees.map(e=>{
        return (
          <Card key={e.id} onClick={(e)=>{console.log(e.currentTarget.id)}} id={e.id}>
            <Card.Content>
              <Card.Header>{e.full_name}</Card.Header>
              <Card.Meta>{e.active_status ? "Active" : "Terminated"}</Card.Meta>
              <Card.Description>
                Pay Type: {e.pay_type}
                <br />
                Pay Rate: {e.pay_rate}
              </Card.Description>
            </Card.Content>
          </Card>
        )
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

  render() {
    // console.log("employeesList", this.props);
    return (
      <div>
        <h3 className="ui top attached blue header" onClick={(e)=>this.collapse(e)}>
          <i className={`dropdown icon ${this.state.hide ? null : 'counterclockwise rotated'}`} />
            Employees
        </h3>
        <div className={`ui cards content transition ${this.state.hide ? 'active' : 'hidden'} attached segment`}>
          {this.eachEmployee()}
        </div>
      </div>
    )
  }
}

// const mapStateToProps = ({ usersReducer: user }) => {
//   return {user}
// }

export default EmployeesList
