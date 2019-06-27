import React from 'react'
import { connect } from 'react-redux'
import { Card, List } from 'semantic-ui-react'
import withAuth from '../hocs/withAuth'

class Company extends React.Component {

  eachEmployee = () => {
    if (this.props.currentCompany.employees) {
      return this.props.currentCompany.employees.map(e=>{
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

  render() {
    console.log("company", this.eachEmployee());
    return (
      <div>
        {this.eachEmployee()}
      </div>
    )
  }
}

export default Company
