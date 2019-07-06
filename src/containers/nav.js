import React, { Fragment } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Menu } from 'semantic-ui-react'

class Nav extends React.Component {

  logout = (e) => {
    localStorage.clear()
    this.props.dispatch({ type: 'LOG_OUT' })
  }

  render() {
    console.log(this.props)
    const { user: { loggedIn }, location: { pathname } } = this.props
    return (
      <Menu pointing secondary>
        {loggedIn ? (
          <Fragment>
            <Menu.Item as={NavLink} to="/dashboard" name="Dashboard" active={pathname === '/dashboard'} />
            <Menu.Item as={NavLink} to={`/${this.props.company.name}`} name={this.props.company.name} active={pathname === '/companies'} />
            <Menu.Menu position="right">
              <Menu.Item as={NavLink} to="/profile" name="Profile" active={pathname === '/profile'} />
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

const mapStateToProps = ({ usersReducer: user }) => {
  return {user}
}

export default withRouter(connect(mapStateToProps)(Nav))
