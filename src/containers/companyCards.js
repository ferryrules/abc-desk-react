import React from 'react'
import { connect } from 'react-redux'
import { Card, List } from 'semantic-ui-react'
import withAuth from '../hocs/withAuth'
import Employees from './employees'

class CompanyCards extends React.Component {

  state = {
    companies: [],
    currentCompany: ''
  }

  componentDidMount() {
    fetch('http://localhost:3000/companies',{
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

  selectCompany = (e) => {
    // console.log(e.currentTarget.id);
    let currentCompany = this.state.companies.find(c=>c.id===parseInt(e.currentTarget.id))
    this.setState({
      companies: [],
      currentCompany
    })
  }

  render() {
    // console.log(this.state);
    const eachCompany = this.state.companies.map(c=>{
      return (
        <Card key={c.name} onClick={(e)=>{this.selectCompany(e)}} id={c.id}>
          <Card.Content>
            <Card.Header>{c.name}</Card.Header>
              <Card.Description>
                <List>{c.employees.map(e=>{
                  return <List.Item key={e.id}>{e.full_name}</List.Item>
                }).sort((a,b)=>{
                  return a.props.children.localeCompare(b.props.children)
                })
              }</List>
            </Card.Description>
          </Card.Content>
        </Card>
      )
    })
    return (
      <div className="ui cards">
        {this.state.companies.length > 0 ?
          eachCompany
        : <Employees currentCompany={this.state.currentCompany} />}
      </div>
    )
  }
}

export default withAuth(connect()(CompanyCards))
