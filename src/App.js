import React from 'react';
import './App.css';

import Company from './Components/Company'
import Nav from './Components/Nav'

export default class App extends React.Component {

  state = {
    companies: []
  }

  componentDidMount() {
    fetch('http://localhost:3000/companies/')
    .then(r=>r.json())
    .then(companies=>{
      this.setState({
        companies
      })
    })
  }

  render() {
    return (
      <div>
        <Nav />
        <Company companies={this.state.companies} />
      </div>
    );
  }
}
