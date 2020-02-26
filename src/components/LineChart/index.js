import React, { PureComponent } from 'react'
import Chart from "chart.js";
import "./style.scss";

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
        const myChartRef = this.chartRef.current;
        const { data, label, labels, borderColor } = this.props;

        if (typeof this.myLineChart !== "undefined") this.myLineChart.destroy();

        this.myLineChart = new Chart(myChartRef, {
            type: "line",
            data: {
                //Bring in data
                labels: labels,
                datasets: [
                    {
                        label: label,
                        data: data,
                        fill: false,
                        borderColor: borderColor,
                        cubicInterpolationMode:'default',
                        lineTension: 0.5
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
                    ref={this.chartRef}
                />
            </div>
        )
    }
}