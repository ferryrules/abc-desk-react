import React from 'react';
import './App.css';

import Company from './Components/Company'

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
        <Company companies={this.state.companies} />
      </div>
    );
  }
}
