import React from 'react'
// import Spinner from 'react-bootstrap/Button'
import { Card } from 'semantic-ui-react'
import withAuth from '../hocs/withAuth'
import Company from '../components/company.js'

class CompaniesList extends React.Component{

  state = {
    companies: []
  }

  componentDidMount() {
    fetch('http://localhost:3000/companies', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    .then(r=>r.json())
    .then(companies=>{
      this.setState({
        companies
      })
    })
  }

  clearCompanies = (c) => {
    this.setState({
      companies: [c]
    })
  }

  selectCompany = (c) => {
    this.props.history.push(`/companies/${c.id}`)
  }

  render() {
    console.log(this.props);
    const eachCompany = this.state.companies.map(c=>{
      return <Card key={c.id} onClick={(e)=>this.selectCompany(c)} id={c.id}>
        <Card.Content>
          <Card.Header>{c.name}</Card.Header>
          <Card.Meta>Employees: <span className="badge badge-primary">{c.employees.length}</span></Card.Meta>
          <Card.Meta>
            Tickets: <span className="badge badge-info">{c.tickets.length}</span>
            <br />
          </Card.Meta>
        </Card.Content>
      </Card>
    })
    return (
      <div>
        {eachCompany}
      </div>
    )
  }
}

export default withAuth(CompaniesList)
// <Company key={c.id} company={c} companies={this.state.companies} selectCompany={this.selectCompany} />
