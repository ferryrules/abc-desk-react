import React from 'react';

export default class Company extends React.Component {
  render() {
    const eachCompany = this.props.companies.map(c=>{
      return <li key={c.name}>{c.name}</li>
    })
    return (
      <div>
        <ul>
          {eachCompany}
        </ul>
      </div>
    );
  }
}
