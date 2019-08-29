import React, { Component } from 'react'
import withAuth from '../hocs/withAuth'
import { connect } from 'react-redux'
import { Dropdown } from 'semantic-ui-react'

import EmployeeTable from '../views/employeeTable.js'
import EmployeeCardList from '../views/employeeCardList.js'

class EmployeesView extends Component {

  state = {
    view: 'Table'
  }

  render() {

    const viewOptions = [
      { key: "table", text: "Table", value: "table"},
      { key: "cards", text: "Cards", value: "cards"}
    ]

    return(
      <div>
        <Dropdown
          selection
          onChange={(e)=>{this.setState({view: e.target.innerText})}}
          options={viewOptions}
          placeholder="Table"
        />
        {this.state.view === "Table"
        ? <EmployeeTable company={this.props.company} />
        : <EmployeeCardList company={this.props.company} />}
      </div>
    )
  }
}

const mapStateToProps = ({...props}) => {
  return {...props}
}

export default withAuth(connect(mapStateToProps)(EmployeesView))
