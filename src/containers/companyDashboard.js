import React from 'react'
import withAuth from '../hocs/withAuth'
// import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
// import { connect } from 'react-redux'
// import { Card } from 'semantic-ui-react'
// import CompaniesList from './companiesList.js'

class Dashboard extends React.Component {

  render() {
    return (
      <div>
        I'm the Dashboard
      </div>
    )
  }
}

export default withAuth(Dashboard)
