import React from 'react'
import Employee from '../components/employee'
import withAuth from '../hocs/withAuth'

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"

class EmployeesList extends React.Component {

  state = {
    hide: true
  }

  selectEmployee = (e) => {
    // debugger
    this.props.props.history.push(`${this.props.props.location.pathname}/employees/${e.id}`)
  }

  clearOrResetEmployees = (clear, reset) => {
    // debugger
    if (clear) {
      this.state.employees.filter(e=>{
        if (e.id !== clear.id) {
          this.state.filtered.push(e)
        }
      })
      this.setState({
        employees: [clear]
      }, this.props.toggle(false, true))
    } else {
      console.log(this.state.filtered);
      console.log(reset);
      // debugger
      this.setState({
        employees: [...this.state.filtered, {
          id: reset.id,
          full_name: reset.full_name,
          pay_rate: reset.pay_rate,
          pay_type: reset.pay_type,
          active_status: reset.active_status,
          filing_status: reset.filing_status,
          w4_allowance: reset.w4_allowance
        }]
      }, this.props.toggle(true, true))
    }
  }

  eachEmployee = () => {
    if (this.props.employees) {
      return this.props.employees.map(e=>{
        return <Employee key={e.id} props={this.props} selectEmployee={this.selectEmployee} employee={e} />
      }).sort((a,b)=>{
        return a.props.employee.full_name.localeCompare(b.props.employee.full_name)
      })
    }
  }

  collapse = (e) => {
    this.setState({
      hide: !this.state.hide
    })
  }

  render() {
    console.log("employeeList props", this.props);
    return (
      <div>
        <h3 className="ui top attached blue header" onClick={(e)=>this.collapse(e)} >
          <i className={`dropdown icon ${this.state.hide ? null : 'counterclockwise rotated'}`} />
            Employees
        </h3>
        <div>
          <i className='icon add circle' />
          Add Employee
        </div>
        <div className={`ui cards content transition ${this.state.hide ? 'active' : 'hidden'} attached segment`}>
          {this.eachEmployee()}
        </div>
      </div>
    )
  }
}

export default withAuth(EmployeesList)
