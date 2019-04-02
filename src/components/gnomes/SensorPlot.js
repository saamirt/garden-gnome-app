import React from 'react';
import { Group } from '@vx/group';
import { GlyphDot } from '@vx/glyph';
import { LinePath } from '@vx/shape';
import { genDateValue } from '@vx/mock-data';
import { scaleTime, scaleLinear } from '@vx/scale';
import { curveMonotoneX, curveBasis } from '@vx/curve';

const data = genDateValue(20);

// accessors
const date = d => d.date;
const value = d => d.value;

// scales
const xScale = scaleTime({
	domain: [Math.min(...data.map(date)), Math.max(...data.map(date))]
});
const yScale = scaleLinear({
	domain: [0, Math.max(...data.map(value))]
});

// positions
const x = d => xScale(date(d));
const y = d => yScale(value(d));

export default ({
	width = 1200,
	height = 175,
	hue = 0,
	margin = { top: 40, bottom: 20, left: 20, right: 20 }
}) => {
	// colors
	const primary = 'hsl(' + hue + ', 100%, 70%)';
	const secondary = 'hsl(' + hue + ', 100%, 98%)';
	const contrast = '#ffffff';
	// bounds
	const xMax = width - margin.right;
	const yMax = height - margin.top - margin.bottom;

	// update scale range to match bounds
	xScale.range([margin.left, xMax]);
	yScale.range([yMax, 0]);

	return (
		<svg width={width} height={height}>
			<rect
				className="graph-bg"
				x={0}
				y={0}
				width={width}
				height={height}
				fill={secondary}
				rx={5}
			/>
			<Group top={margin.top}>
				<LinePath
					className="graph-trendline"
					data={data}
					x={x}
					y={y}
					stroke={primary}
					strokeWidth={2}
					strokeDasharray="2,2"
					curve={curveBasis}
				/>
				<LinePath
					className="graph-plot"
					data={data}
					x={x}
					y={y}
					stroke={primary}
					strokeWidth={3}
					curve={curveMonotoneX}
				/>
				{data.map((d, i) => {
					const cx = x(d);
					const cy = y(d);
					return (
						<g key={`line-point-${i}`}>
							<GlyphDot
								className="graph-contrast-dot"
								cx={cx}
								cy={cy}
								r={6}
								fill={contrast}
								stroke={secondary}
								strokeWidth={10}
							/>
							<GlyphDot
								className="graph-sec-dot"
								cx={cx}
								cy={cy}
								r={6}
								fill={secondary}
								stroke={primary}
								strokeWidth={3}
							/>
							<GlyphDot
								className="graph-inner-dot"
								cx={cx}
								cy={cy}
								r={4}
								fill={contrast}
							/>
						</g>
					);
				})}
			</Group>
		</svg>
	);
};
