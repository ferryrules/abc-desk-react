import React from 'react'
import { connect } from 'react-redux'
import { Card, List } from 'semantic-ui-react'
import withAuth from '../hocs/withAuth'

class Dashboard extends React.Component {

  state = {
    payrollSums: []
  }

  render() {
    const { companies, tickets } = this.props
    console.log("dash companies", this.props.companies);
    console.log("dash tickets", this.props.tickets);
    console.log("dash props", this.props);
    const eachCompany = companies.map(c=>{
      return c.name
    })
    console.log(eachCompany);
    return (
      <div>
        Dash
        {eachCompany}
      </div>
    )
  }
}

const mapStateToProps = ({ usersReducer: { user: { companies, tickets } } }) => ({
  companies,
  tickets
})

export default withAuth(connect(mapStateToProps)(Dashboard))
