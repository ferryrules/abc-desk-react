import React, { Fragment } from 'react'
import withAuth from '../hocs/withAuth'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Dropdown, Label, Icon, Table } from 'semantic-ui-react'

class TicketsList extends React.Component{

  state = {
    tableColor: 'clear',
    statFilter: 'all',
    priFilter: 'all'
  }

  eachTicket = () => {
    const { all_tickets } = this.props.company

    if (all_tickets) {
      return all_tickets[this.state.statFilter.toLowerCase()]
      .filter(tic=>{
        return this.state.priFilter === 'all' ? tic : this.state.priFilter === 'All' ? tic : this.state.priFilter === tic.priority
      })
      .map(tic=>{
        return (
          <Table.Row verticalAlign='middle' key={tic.id} id={tic.id}>
            <Table.Cell
              onClick={(e)=>window.location.replace(`${window.location.origin}/tickets/${tic.id}`)}
              colSpan='2'>
              {tic.title}
            </Table.Cell>

            <Table.Cell
              onClick={(e)=>window.location.replace(`${window.location.origin}/tickets/${tic.id}`)} verticalAlign='middle' textAlign="center">
              <Label color={tic.priority === "High" ? 'red' : tic.priority === "Medium" ? 'yellow' : 'green'}>
                <Icon className={tic.priority === "High" ? 'bomb' : tic.priority === "Medium" ? 'fire extinguisher' : 'bed'} />
                {tic.priority}
              </Label>
            </Table.Cell>

            <Table.Cell
              onClick={(e)=>window.location.replace(`${window.location.origin}/tickets/${tic.id}`)} verticalAlign='middle' textAlign="center">
              <Label color={tic.ticket_status === "Open" ? 'purple' : tic.ticket_status === "Pending" ? 'blue' : 'grey'}>{tic.ticket_status}</Label>
            </Table.Cell>

            <Table.Cell
              onClick={(e)=>window.location.replace(`${window.location.origin}/tickets/${tic.id}`)} verticalAlign='middle'>
              {tic.description.length > 60 ? tic.description.substr(0,60).concat(' ...') : tic.description}
            </Table.Cell>

          </Table.Row>
        )
      })
    }
  }

  chooseColor = (color) => {
    if (color === "clearclearorangeyellowolivetealbluevioletpurplepinkbrowngreyblack") {
      return
    }
    this.setState({tableColor: color})
  }

  debug = (e) => {
    console.log(e.target);

    debugger
  }

  render() {
    console.log("ticketsList State", this.state);
    console.log("ticketsList props", this.props);

    const statOptions = [
      { key: 'Open', text: 'Open', value: 'Open' },
      { key: 'Closed', text: 'Closed', value: 'Closed' },
      { key: 'Pending', text: 'Pending', value: 'Pending' },
      { key: 'All', text: 'All', value: 'All' }
    ]

    const priOptions = [
      { key: 'High', text: 'High', value: 'High' },
      { key: 'Medium', text: 'Medium', value: 'Medium' },
      { key: 'Low', text: 'Low', value: 'Low' },
      { key: 'All', text: 'All', value: 'All' }
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
        <span> </span>
        <br />
        <br />
        <Dropdown
        selection
        options={colorOptions}
        onChange={(e)=>this.chooseColor(e.target.textContent.toLowerCase())}
        placeholder="Table Color"/>
        <br />
        <Table celled selectable color={this.state.tableColor} className={(this.state.tableColor && this.state.tableColor !== 'clear') ? "inverted" : ""} >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                colSpan='2'
                onClick={(e)=>this.setState({nameSort: !this.state.nameSort})}>
                Title
              </Table.HeaderCell>
              <Table.HeaderCell
                textAlign="center">
                <Dropdown
                  simple
                  compact
                  options={priOptions}
                  onChange={(e)=>this.setState({priFilter: e.target.innerText})}
                  placeholder="All" />
              </Table.HeaderCell>
              <Table.HeaderCell
                textAlign="center">
                <Dropdown
                  simple
                  compact
                  options={statOptions}
                  onChange={(e)=>this.setState({statFilter: e.target.innerText.toLowerCase()})}
                  placeholder="Active" />
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                Description
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.eachTicket()}
          </Table.Body>
        </Table>
      </Fragment>
    )
  }
}

const mapStateToProps = ({...props}) => {
  return {...props}
}

export default withAuth(connect(mapStateToProps)(TicketsList))
