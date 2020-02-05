import React, { Component } from 'react'
import Chart from "chart.js";

import "./style.scss";

export default class LineChart extends Component {
    chartRef = React.createRef();
    
    componentDidMount() {
        const myChartRef = this.chartRef.current.getContext("2d");
        
        new Chart(myChartRef, {
            type: "line",
            data: {
                //Bring in data
                labels: this.props.labels,
                datasets: [
                    {
                        label: this.props.label,
                        data: this.props.data,
                        fill: false,
                        borderColor: "#c1bbff"
                    }
                ]
            },
            options: {
                //Customize chart options
                responsive: true,
                maintainAspectRatio: false,
            }
        });
    }
    render() {
        return (
            <div className="linechart-container">
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
        )
    }
}