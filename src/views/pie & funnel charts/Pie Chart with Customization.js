import React, { Component } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class PieChartWithCustomization extends Component {
	render() {
    console.log(this.props);
		const employeeCount = !!this.props.company.employees ? this.props.company.employees.length : null
		const ticketCount = !!this.props.company.tickets ? this.props.company.tickets.length : null
		const options = {
			theme: "light5",
			animationEnabled: true,
			exportFileName: "New Year Resolutions",
			exportEnabled: true,
			title:{
				text: "Top Categories of New Year's Resolution"
			},
			data: [{
				type: "pie",
				showInLegend: false,
				legendText: "{label}",
				toolTipContent: "{label}: <strong>{y}%</strong>",
				indexLabel: "{y} {label}",
				indexLabelPlacement: "inside",
				dataPoints: [
					{ y: employeeCount, label: "Employees" },
					{ y: ticketCount, label: "Tickets" },
					{ y: 15, label: "Education" },
					{ y: 19, label: "Career" },
					{ y: 5, label: "Family" },
					{ y: 7, label: "Real Estate" }
				]
			}]
		}

		return (
		<div>
			<h1>React Pie Chart with Index Labels Placed Inside</h1>
			<CanvasJSChart options = {options}
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default PieChartWithCustomization;
