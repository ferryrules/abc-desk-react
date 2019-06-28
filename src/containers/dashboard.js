import React from 'react'
// import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
// import { connect } from 'react-redux'
import withAuth from '../hocs/withAuth'
// import { Card } from 'semantic-ui-react'
import CompaniesList from './companiesList.js'

class Dashboard extends React.Component {

  render() {
    return (
      <div>
        <CompaniesList />
      </div>
    )
  }
}

export default withAuth(Dashboard)
