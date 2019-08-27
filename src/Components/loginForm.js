import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router'
import { loginUser } from '../actions/user'
import { Button, Message, Card, Input } from 'semantic-ui-react'
// import { bindActionCreators } from 'redux'

class LoginForm extends React.Component {

  state = { username: '', password: '' }

  handleChange = (e, semanticInputData) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleLoginSubmit = (e) => {
    this.props.loginUser(this.state.username, this.state.password)
    this.setState({ username: '', password: '' })
  }

  render() {
    // console.log('%c LOGIN FORM PROPS: ', 'color: red', this.props)
    // console.log(this.state);
    return this.props.loggedIn ? (
      <Redirect to={`/dashboard`} />
    ) : (
      <div className="limiter" loading={!!this.props.authenticatingUser} error={!!this.props.failedLogin}>
    		<div className="container-login100">
    			<div className="wrap-login100">
          <Message className={!!this.props.failedLogin ? ".alert-validate" : "hidden"} header={!!this.props.failedLogin ? this.props.error : null} />
    				<div className="login100-form">
    					<span className="login100-form-title p-b-26">
    						Welcome
    					</span>
    					<br/>
    					<span className="login100-form-title p-b-48">
    						<i className="zmdi zmdi-font"></i>
    					</span>
    					<br/>
    					<div className="wrap-input100">
    						<h5>Username</h5>
    						<input
                  className="input100"
                  type="text"
                  name="username"
                  onChange={this.handleChange}
                  value={this.state.username}/>
    						<span className="focus-input100"></span>
    					</div>

    					<div className="wrap-input100">
    						<span className="btn-show-pass">
    							<i className="zmdi zmdi-eye"></i>
    						</span>
    						<h5>Password</h5>
    						<input
                  className="input100"
                  type="password"
                  name="password"
                  onChange={this.handleChange}
                  value={this.state.password}/>
    						<span className="focus-input100"></span>
    					</div>

    					<div className="container-login100-form-btn">
    						<div className="wrap-login100-form-btn">
    							<div className="login100-form-bgbtn"></div>
    							<button className="login100-form-btn" onClick={this.handleLoginSubmit}>
    								Login
    							</button>
    						</div>
    					</div>
    				</div>
    			</div>
    		</div>
    	</div>
    )
  }
}

const mapStateToProps = ({ usersReducer: { authenticatingUser, failedLogin, error, loggedIn } }) => ({
  authenticatingUser,
  failedLogin,
  error,
  loggedIn
})

export default withRouter(connect(mapStateToProps, { loginUser })(LoginForm))

// <Fragment>
//
//   <Card
//     loading={this.props.authenticatingUser}
//     error={this.props.failedLogin}
//     centered raised>
//     <Card.Content textAlign="center">
//       <br/>
//       <Card.Header color="violet">Username</Card.Header>
//       <br/>
//       <Input
//         placeholder="username"
//         name="username"
//         onChange={this.handleChange}
//         value={this.state.username}/>
//       <br/>
//       <br/>
//       <Card.Header color="violet">Password</Card.Header>
//       <br/>
//       <Input
//         type="password"
//         placeholder="password"
//         name="password"
//         onChange={this.handleChange}
//         value={this.state.password}/>
//       <br/>
//       <br/>
//     </Card.Content>
//   </Card>
//   <div id="container-login100-form-btn">
//     <div id="wrap-login100-form-btn">
//       <div id="login100-form-bgbtn"></div>
//       <button id="login100-form-btn" type="submit" onClick={this.handleLoginSubmit}>
//         Login
//       </button>
//     </div>
//   </div>
// </Fragment>
