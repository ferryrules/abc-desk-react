import React, { Fragment } from 'react'
import withAuth from '../hocs/withAuth'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Dropdown, Divider, Label, Icon, Table } from 'semantic-ui-react'

class TicketsList extends React.Component{

  render() {
    console.log("ticketsList State", this.state);
    console.log("ticketsList props", this.props);

    const statOptions = [
      { key: 'Open', text: 'Open', value: 'Open' },
      { key: 'Closed', text: 'Closed', value: 'Closed' },
      { key: 'Pending', text: 'Pending', value: 'Pending' }
    ]

    const priOptions = [
      { key: 'High', text: 'High', value: 'High' },
      { key: 'Medium', text: 'Medium', value: 'Medium' },
      { key: 'Low', text: 'Low', value: 'Low' }
    ]

    const colorOptions = [
      { key: 'Clear', text: 'Clear', value: 'Clear' },
      { key: 'Orange', text: 'Orange', value: 'Orange', label: { color: 'orange', empty: true, circular: true } },
      { key: 'Yellow', text: 'Yellow', value: 'Yellow', label: { color: 'yellow', empty: true, circular: true } },
      { key: 'Olive', text: 'Olive', value: 'Olive', label: { color: 'olive', empty: true, circular: true } },
      { key: 'Teal', text: 'Teal', value: 'Teal', label: { color: 'teal', empty: true, circular: true } },
      { key: 'Blue', text: 'Blue', value: 'Blue', label: { color: 'blue', empty: true, circular: true } },
      { key: 'Violet', text: 'Violet', value: 'Violet', label: { color: 'violet', empty: true, circular: true } },
      { key: 'Purple', text: 'Purple', value: 'Purple', label: { color: 'purple', empty: true, circular: true } },
      { key: 'Pink', text: 'Pink', value: 'Pink', label: { color: 'pink', empty: true, circular: true } },
      { key: 'Brown', text: 'Brown', value: 'Brown', label: { color: 'brown', empty: true, circular: true } },
      { key: 'Grey', text: 'Grey', value: 'Grey', label: { color: 'grey', empty: true, circular: true } },
      { key: 'Black', text: 'Black', value: 'Black', label: { color: 'black', empty: true, circular: true } }
    ]

    return (
      <Fragment>
        <Link to={`/${this.props.company.name}/tickets/new`}>
          <div
            className="ui basic green button"
            id={this.props.company.id}>
            <i className="icon add circle" />Add Ticket
          </div>
        </Link>
      </Fragment>
    )
  }
}

const mapStateToProps = ({...props}) => {
  return {...props}
}

export default withAuth(connect(mapStateToProps)(TicketsList))
