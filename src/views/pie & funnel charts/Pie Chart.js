import React, { Component } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class PieChart extends Component {
	render() {
		console.log(this.props.company)

		const ticketCount = !!this.props.company.tickets ? this.props.company.tickets.length : null
		const highCount = !!this.props.company.all_tickets.high ? this.props.company.all_tickets.high.length : null
		const mediumCount = !!this.props.company.all_tickets.medium ? this.props.company.all_tickets.medium.length : null
		const lowCount = !!this.props.company.all_tickets.low ? this.props.company.all_tickets.low.length : null
		const openCount = !!this.props.company.all_tickets.open ? this.props.company.all_tickets.open.length : null
		const pendingCount = !!this.props.company.all_tickets.pending ? this.props.company.all_tickets.pending.length : null
		const closedCount = !!this.props.company.all_tickets.closed ? this.props.company.all_tickets.closed.length : null

		const options = {
			exportEnabled: true,
			animationEnabled: true,
			title: {
				text: `Total Tickets: ${ticketCount}`
			},
			backgroundColor: 'transparent',
			data: [{
				type: "pie",
				startAngle: 125,
				showInLegend: false,
				indexLabelFontSize: 16,
				indexLabel: "{label}: {y}",
				dataPoints: [
					{ y: highCount, label: "High Pri", color: 'red' },
					{ y: mediumCount, label: "Medium Pri", color: 'orange' },
					{ y: lowCount, label: "Low Pri", color: 'green' },
					{ y: pendingCount, label: "Pending", color: 'blue' },
					{ y: openCount, label: "Open", color: 'purple' },
					{ y: closedCount, label: "Closed", color: 'grey' }
				]
			}]
		}

		return (
		<div>
			<CanvasJSChart options = {options}
				onRef={ref => this.chart = ref}
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default PieChart;
