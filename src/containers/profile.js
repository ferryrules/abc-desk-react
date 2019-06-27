import React from 'react'
import { connect } from 'react-redux'
import { Card } from 'semantic-ui-react'
import withAuth from '../hocs/withAuth'

const Profile = ({ email, username, permission, fname, lname }) => (
  <Card>
    <Card.Content>
      <Card.Header>{fname} {lname}</Card.Header>
      <Card.Meta>{permission}</Card.Meta>
      <Card.Description>
        Username: {username}
        <br />
        Email: {email}
      </Card.Description>
    </Card.Content>
  </Card>
)

const mapStateToProps = ({ usersReducer: { user: { id, email, username, permission, fname, lname } } }) => ({
  id,
  email,
  username,
  permission,
  fname,
  lname
})

export default withAuth(connect(mapStateToProps)(Profile))
