import React, { Fragment } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Menu } from 'semantic-ui-react'
// import { fetchCurrentUser } from '../actions/user'
// import LoginForm from './loginForm'

class Nav extends React.Component {

  logout = (e) => {
    localStorage.clear()
    this.props.dispatch({ type: 'LOG_OUT' })
  }

  render() {
    const { user: { loggedIn }, location: { pathname } } = this.props
    return (
      <Menu pointing secondary>
        {loggedIn ? (
          <Fragment>
            <Menu.Item as={NavLink} to="/profile" name="Profile" active={pathname === '/profile'} />
            <Menu.Menu position="right">
            <Menu.Item to="/logout" name="Logout" onClick={this.logout} />
            </Menu.Menu>
          </Fragment>
        ) : (
          <Menu.Item as={NavLink} to="/login" name="Login" active={pathname === '/login'} />
        )}
      </Menu>
    )
  }
}

const mapStateToProps = ({ usersReducer: user }) => ({ user })

export default withRouter(connect(mapStateToProps)(Nav))
