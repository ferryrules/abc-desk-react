import React from 'react'
import withAuth from '../hocs/withAuth'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card } from 'semantic-ui-react'
import CompanyForm from '../forms/companyForm'
import UserForm from '../forms/userForm'

class Profile extends React.Component {
  render() {
    return (
      <div className="ui cards">
        {console.log("props", this.props)}
        <Card>
          <Card.Content>
            <Card.Header>{this.props.company.name}</Card.Header>
            <Card.Meta>Employees: {!!this.props.company.employees ? this.props.company.employees.length : null}</Card.Meta>
          </Card.Content>
          <div className="ui extra content" >
            <Link to={`/${this.props.company.name}/edit`}>
              <div className="ui basic blue button" onClick={(e)=><CompanyForm company={this.props.company}/>}>
                <i className="edit outline icon" />Edit
              </div>
            </Link>
          </div>
        </Card>
        <Card>
          <Card.Content>
            <Card.Header>{this.props.fname} {this.props.lname}</Card.Header>
            <Card.Meta>{this.props.permission}</Card.Meta>
            <Card.Description>
              Username: {this.props.username}
              <br />
              Email: {this.props.email}
            </Card.Description>
          </Card.Content>
          <div className="ui extra content" >
            <Link to={`/edit`}>
              <div className="ui basic blue button" onClick={(e)=><UserForm company={this.props.company}/>}>
                <i className="edit outline icon" />Edit
              </div>
            </Link>
          </div>
        </Card>
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

export default withAuth(connect(mapStateToProps)(Profile))
