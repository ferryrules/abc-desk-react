import React, { Component } from 'react'
import withAuth from '../hocs/withAuth'
import { connect } from 'react-redux'
import { Dropdown } from 'semantic-ui-react'

import TicketTable from '../views/ticketTable.js'
import TicketCardList from '../views/ticketCardList.js'

class TicketsView extends Component {

  state = {
    view: 'Cards'
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
        <span> </span>
        {this.state.view === "Table"
        ? <TicketTable company={this.props.company} />
        : <TicketCardList company={this.props.company} />}
      </div>
    )
  }
}

const mapStateToProps = ({...props}) => {
  return {...props}
}

export default withAuth(connect(mapStateToProps)(TicketsView))
