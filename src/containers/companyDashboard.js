import React from 'react'
import withAuth from '../hocs/withAuth'
import Template from '../views/Template';
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
        <Template />
      </div>
    )
  }
}

export default withAuth(Dashboard)
