import React, { Component } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class PieChart extends Component {
	render() {
		console.log(this.props);
		const ticketCount = !!this.props.company.tickets ? this.props.company.tickets.length : null
		const highCount = !!this.props.company.high ? this.props.company.high.length : null
		const mediumCount = !!this.props.company.medium ? this.props.company.medium.length : null
		const lowCount = !!this.props.company.low ? this.props.company.low.length : null
		const openCount = !!this.props.company.open ? this.props.company.open.length : null
		const pendingCount = !!this.props.company.pending ? this.props.company.pending.length : null
		const closedCount = !!this.props.company.closed ? this.props.company.closed.length : null

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
