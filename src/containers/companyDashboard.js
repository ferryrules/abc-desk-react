import React from 'react'
import withAuth from '../hocs/withAuth'
// import Chart from 'chart.js';
// .getContext('2d');
// import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
// import { connect } from 'react-redux'
// import { Card } from 'semantic-ui-react'
// import CompaniesList from './companiesList.js'

class Dashboard extends React.Component {

  render() {
    console.log(this.props);
    return (
      <div>
        <h3>{this.props.company.name} Dashboard</h3>
      </div>
    )
  }
}

export default withAuth(Dashboard)
