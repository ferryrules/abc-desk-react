import React from 'react'
// import { Card } from 'semantic-ui-react'
import Company from '../components/company.js'

export default class CompaniesList extends React.Component{

  state = {
    companies: [],
    currentCompany: ''
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

  render() {
    const eachCompany = this.state.companies.map(c=>{
      return <Company key={c.id} company={c} />
    })
    return (
      <div>
        {eachCompany}
      </div>
    )
  }
}
