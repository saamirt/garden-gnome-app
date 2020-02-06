import React, { PureComponent } from 'react'
import Chart from "chart.js";
import "./style.scss";
let myLineChart;

//--Chart Style Options--//
Chart.defaults.global.defaultFontFamily = "somaticrounded"
//Chart.defaults.global.legend.display = false;
//--Chart Style Options--//

export default class LineChart extends PureComponent {
    chartRef = React.createRef();

    componentDidMount() {
        this.buildChart();
    }

    componentDidUpdate() {
        this.buildChart();
    }

    buildChart = () => {
        const myChartRef = this.chartRef.current.getContext("2d");
        const { data, label, labels } = this.props;

        if (typeof myLineChart !== "undefined") myLineChart.destroy();

        myLineChart = new Chart(myChartRef, {
            type: "line",
            data: {
                //Bring in data
                labels: labels,
                datasets: [
                    {
                        label: label,
                        data: data,
                        fill: false,
                        borderColor: "#6610f2"
                    }
                ]
            },
            options: {
                //Customize chart options
                responsive: true,
                maintainAspectRatio: false

            }
        });
    }
    render() {
        return (
            <div className="linechart-container">
                <canvas
                    id={this.props.label + "myLineChart"}
                    ref={this.chartRef}
                />
            </div>
        )
    }
}