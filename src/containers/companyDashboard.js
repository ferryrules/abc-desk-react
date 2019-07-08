import React from 'react'
import withAuth from '../hocs/withAuth'
import Template from '../views/Template';
import PieChart from "../views/pie & funnel charts/Pie Chart";
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
        <PieChart company={this.props.company} />
      </div>
    )
  }
}

export default withAuth(Dashboard)
