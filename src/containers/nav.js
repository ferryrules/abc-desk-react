import React, { Fragment } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Dropdown, Menu } from 'semantic-ui-react'
import Employees from './employees'

class Nav extends React.Component {

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

  selectCompany = (e) => {
    console.log(e.currentTarget.id);
    let currentCompany = this.state.companies.find(c=>c.id===parseInt(e.currentTarget.id))
    console.log(currentCompany);
  }

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
            <Menu.Item as={NavLink} to="/dashboard" name="Dashboard" active={pathname === '/dashboard'} />
            <Dropdown text='Company' className='dropdown link item'>
              <Dropdown.Menu>
                {this.state.companies.map(c=>{
                  return (
                    <Dropdown key={c.id} text={c.name} className='dropdown link item' id={c.id}>
                      <Dropdown.Menu>
                        <Dropdown.Item key={`${c.id} Payroll`} id={c.id}>Payroll</Dropdown.Item>
                        <Dropdown.Item key={`${c.id} Employees`}  id={c.id} as={NavLink} to={`/companies/${c.id}`} active={pathname === `/companies/${c.id}`} propsChildren={this.state}>Employees</Dropdown.Item>
                        <Dropdown.Item key={`${c.id} Tickets`}  id={c.id}>Tickets</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  )
                })}
              </Dropdown.Menu>
            </Dropdown>
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

const mapStateToProps = ({ usersReducer: user }) => ({ user })

export default withRouter(connect(mapStateToProps)(Nav))



// import { fetchCurrentUser } from '../actions/user'
// import LoginForm from './loginForm'
