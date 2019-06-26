import React from 'react'
import { connect } from 'react-redux'
import { Card } from 'semantic-ui-react'
import withAuth from '../hocs/withAuth'

const Profile = ({ email, username, permission, fname, lname }) => (
  <Card>
    <Card.Content>
      <Card.Header>{username}</Card.Header>

      <Card.Description>{permission}</Card.Description>
    </Card.Content>
  </Card>
)

const mapStateToProps = ({ usersReducer: { user: { email, username, permission, fname, lname } } }) => ({
  email,
  username,
  permission,
  fname,
  lname
})

export default withAuth(connect(mapStateToProps)(Profile))
