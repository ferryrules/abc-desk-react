import React from 'react'
import { connect } from 'react-redux'
import { Card, List } from 'semantic-ui-react'
import withAuth from '../hocs/withAuth'

class Dashboard extends React.Component {

  state = {
    payrollSums: []
  }

  render() {
    console.log("dash props", this.props.companies);
    console.log("dash props", this.props.tickets);
    return (
      <div>
        Dash
      </div>
    )
  }
}

const mapStateToProps = ({ usersReducer: { user: { id, email, username, permission, fname, lname, companies, tickets } } }) => ({
  id,
  email,
  username,
  permission,
  fname,
  lname,
  companies,
  tickets
})

export default withAuth(connect(mapStateToProps)(Dashboard))
