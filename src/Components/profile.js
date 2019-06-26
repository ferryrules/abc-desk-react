import React from 'react'
import { connect } from 'react-redux'
import { Card, Image } from 'semantic-ui-react'
import withAuth from '../hocs/withAuth'

// props: { user: { email: 'url', username: 'Chandler Bing', permission: 'permission' } }
const Profile = ({ email, username, permission }) => (
  <Card>
    <Image src={email} />
    <Card.Content>
      <Card.Header>{username}</Card.Header>

      <Card.Description>{permission}</Card.Description>
    </Card.Content>
  </Card>
)

// const mapStateToProps = (reduxStoreState) => {
//   return {
//     email: reduxStoreState.usersReducer.user.email,
//     username: reduxStoreState.usersReducer.user.username,
//     permission: reduxStoreState.usersReducer.user.permission
//   }
// }

const mapStateToProps = ({ usersReducer: { user: { email, username, permission } } }) => ({
  email,
  username,
  permission
})

// const connectedToReduxHOC = connect(mapStateToProps)
// const connectedProfile = connectedToReduxHOC(Profile)
//
// const withAuthProfile = withAuth(connectedProfile)
//
// export default withAuthProfile

export default withAuth(connect(mapStateToProps)(Profile))
