import React from 'react'
import { connect } from 'react-redux'
import { Card, List } from 'semantic-ui-react'
import withAuth from '../hocs/withAuth'

class Company extends React.Component {

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

  render() {
    console.log(this.props);
    const eachCompany = this.state.companies.map(c=>{
      return (
        <Card key={c.name} onClick={(e)=>{console.log(e.currentTarget.id)}} id={c.id}>
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
        {eachCompany}
      </div>
    )
  }
}

const mapStateToProps = ({ usersReducer: { user: { id, email, username, permission, fname, lname } } }) => ({
  id,
  email,
  username,
  permission,
  fname,
  lname
})

export default withAuth(connect(mapStateToProps)(Company))
