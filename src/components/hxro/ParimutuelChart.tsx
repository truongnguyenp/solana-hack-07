import React, { useRef, useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { SVGRenderer, SkiaChart } from '@wuba/react-native-echarts';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';

echarts.use([SVGRenderer, BarChart]);

const E_HEIGHT = 400;
const E_WIDTH = Dimensions.get('window').width;

export default function ParimutuelChart() {
	const skiaRef = useRef<any>(null);
	useEffect(() => {
		const option = {
			xAxis: {
				type: 'category',
				data: ['Optimistic', 'Pessimistic'],
			},
			yAxis: {
				type: 'value',
			},
			series: [
				{
					data: [
						87.5,
						{
							value: 87.5,
							itemStyle: {
								color: '#a90000',
							},
						},
					],
					type: 'bar',
				},
			],
		};
		let chart: any;
		if (skiaRef.current) {
			chart = echarts.init(skiaRef.current, 'light', {
				renderer: 'svg',
				width: E_WIDTH,
				height: E_HEIGHT,
			});
			chart.setOption(option);
		}
		return () => chart?.dispose();
	}, []);

	return (
		<View style={styles.container}>
			<SkiaChart ref={skiaRef} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
