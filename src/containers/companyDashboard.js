import React from 'react'
import withAuth from '../hocs/withAuth'
import PieChart from "../charts/Pie Chart";
import MultipleAxisChart from "../charts/Multiple Axis Chart";
import { Grid } from 'semantic-ui-react'
// import PieChartWithCustomization from "../views/pie & funnel charts/Pie Chart with Customization";
// import Template from '../views/Template';
// import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
// import { connect } from 'react-redux'
// import CompaniesList from './companiesList.js'

class Dashboard extends React.Component {

  render() {
    // console.log("dashboard props", this.props);
    return (
      <div>
        {!!this.props.company.message ? window.location.reload() : null}
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
