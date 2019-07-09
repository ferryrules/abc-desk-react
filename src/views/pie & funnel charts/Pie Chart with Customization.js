import React, { Component } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class PieChartWithCustomization extends Component {
	render() {
    console.log(this.props);
		const employeeCount = !!this.props.company.employees ? this.props.company.employees.length : null
		const ticketCount = !!this.props.company.tickets ? this.props.company.tickets.length : null
		const options = {
			exportEnabled: true,
			animationEnabled: true,
			title: {
				text: `${this.props.company.name} Payroll`
			},
			backgroundColor: 'transparent',
			data: [{
				type: "pie",
				startAngle: 75,
				toolTipContent: "<b>{label}</b>: {y}%",
				showInLegend: false,
				indexLabelFontSize: 16,
				indexLabel: "{label} - {y}",
				dataPoints: [
					{ y: employeeCount, label: "Employees" },
					{ y: ticketCount, label: "Tickets" },
					{ y: 9, label: "Paid Search" },
					{ y: 5, label: "Referral" },
					{ y: 19, label: "Social" }
				]
			}]
		}

		return (
		<div>
			<CanvasJSChart options = {options}
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default PieChartWithCustomization;
