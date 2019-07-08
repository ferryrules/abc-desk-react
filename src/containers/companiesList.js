import React from 'react'
import withAuth from '../hocs/withAuth'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card } from 'semantic-ui-react'

class CompaniesList extends React.Component{

  selectCompany = (c) => {
    this.props.currentCompany.push(c)
    this.props.history.push(`/companies/${c.id}`)
  }

  render() {
    const eachCompany = this.props.companies.map(c=>{
      return <Card key={c.id} onClick={(e)=>this.selectCompany(c)} id={c.id}>
        <Card.Content>
          <Card.Header>{c.name}</Card.Header>
          <Card.Meta>Employees: <span className="badge badge-primary">{c.employees.length}</span></Card.Meta>
          <Card.Meta>
            Tickets: <span className="badge badge-info">{c.tickets.length}</span>
            <br />
          </Card.Meta>
          <Card.Meta>
            Next Payroll: {!!c.payrolls.length > 0 ? c.payrolls.pop().end_date : 'None'}
            <br />
          </Card.Meta>
        </Card.Content>
      </Card>
    })
    return (
      <div>
        <Link to={`/${this.props.company.name}/companies/new`}>
          <div
            className="ui basic green button"
            id={this.props.company.id}>
            <i className="icon add circle" />Add Company
          </div>
        </Link>
        {this.eachTicket()}
      </div>
    )
  }
}

const mapStateToProps = ({...props}) => {
  return {...props}
}

export default withAuth(connect(mapStateToProps)(CompaniesList))


// import Company from '../components/company.js'
