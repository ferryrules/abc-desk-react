import React, { Component } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class MultipleAxisChart extends Component {
		constructor() {
		super();
		this.toggleDataSeries = this.toggleDataSeries.bind(this);
	}

	toggleDataSeries(e){
		if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
			e.dataSeries.visible = false;
		}
		else{
			e.dataSeries.visible = true;
		}
		this.chart.render();
	}

	render() {
		console.log(this.props);

		const hoursData = this.props.company.payrolls ? this.props.company.payrolls.map(pr=>{
			return { x: new Date(pr.check_date), y: pr.total_hours}
		}) : null

		const costData = this.props.company.payrolls ? this.props.company.payrolls.map(pr=>{
			return { x: new Date(pr.check_date), y: pr.cash_req}
		}) : null

		console.log(hoursData);
		console.log(costData);
		const options = {
			theme: "light2",
			animationEnabled: true,
			title:{
				text: "Payroll Cost vs. Hours"
			},
			axisX: {
				title: "Month"
			},
			axisY: {
				title: "Hours",
				titleFontColor: "#6D78AD",
				lineColor: "#6D78AD",
				labelFontColor: "#6D78AD",
				tickColor: "#6D78AD",
				includeZero: false
			},
			axisY2: {
				title: "Payroll Cost",
				titleFontColor: "#51CDA0",
				lineColor: "#51CDA0",
				labelFontColor: "#51CDA0",
				tickColor: "#51CDA0",
				includeZero: false
			},
			toolTip: {
				shared: true
			},
			legend: {
				cursor: "pointer",
				itemclick: this.toggleDataSeries
			},
			data: [{
				type: "spline",
				name: "Hours",
				showInLegend: true,
				xValueFormatString: "MMM YYYY",
				yValueFormatString: "#,##0 Units",
				dataPoints: hoursData
			},
			{
				type: "spline",
				name: "Payroll Cost",
				axisYType: "secondary",
				showInLegend: true,
				xValueFormatString: "MMM YYYY",
				yValueFormatString: "$#,##0.#",
				dataPoints: costData
			}]
		}


		return (
		  <div className="MultipleAxisChart">
			<CanvasJSChart options = {options}
				 onRef={ref => this.chart = ref}
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default MultipleAxisChart;
