import React from 'react'
import withAuth from '../hocs/withAuth'
import PieChart from "../views/pie & funnel charts/Pie Chart";
// import PieChartWithCustomization from "../views/pie & funnel charts/Pie Chart with Customization";
import MultipleAxisChart from "../views/overview/Multiple Axis Chart";
import { Grid } from 'semantic-ui-react'
// import Template from '../views/Template';
// import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
// import { connect } from 'react-redux'
// import CompaniesList from './companiesList.js'

class Dashboard extends React.Component {

  render() {
    // console.log(this.props);
    return (
      <div>
        <Grid columns={2}>
          <Grid.Column>
            <PieChart company={this.props.company} />
          </Grid.Column>
          <Grid.Column>
            <MultipleAxisChart company={this.props.company} />
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default withAuth(Dashboard)
