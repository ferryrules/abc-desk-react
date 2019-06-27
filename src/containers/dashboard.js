import React from 'react'
import { connect } from 'react-redux'
import { Card, List } from 'semantic-ui-react'
import withAuth from '../hocs/withAuth'

class Dashboard extends React.Component {

  state = {
    tickets: [],
    payrollSums: []
  }

  render() {
    console.log("dashboard");
    return (
      <div>
        The Dash
      </div>
    )
  }
}

export default withAuth(connect()(Dashboard))
