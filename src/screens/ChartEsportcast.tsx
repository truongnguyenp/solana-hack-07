import { Text, StyleSheet, View } from "react-native";
import tw from "twrnc";
import React, { useRef, useEffect } from "react"
import * as echarts from 'echarts/core'
import { LineChart } from 'echarts/charts'
import { GridComponent } from 'echarts/components'
import { SVGRenderer, SkiaChart } from '@wuba/react-native-echarts'

import { Screen } from "../components/Screen";
import { DataNavigateToChart } from "../types";
echarts.use([SVGRenderer, LineChart, GridComponent]);

export function ChartEsportcast({ navigation, route }) {
  const skiaRef = useRef<any>(null);

  const { name, tokenUsage, totalUserBetting } = route.params as DataNavigateToChart

  useEffect(() => {
    const option = {
      xAxis: {
        type: 'category',
        data: ['0', '5', '10', '15', '20', '25', '30'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: tokenUsage,
          type: 'line',
        },
        {
          data: totalUserBetting,
          type: 'line',
        }
      ],
    };
    let chart: any;
    if (skiaRef.current) {
      chart = echarts.init(skiaRef.current, 'light', {
        renderer: 'svg',
        width: 400,
        height: 400,
      });
      chart.setOption(option);
    }
    return () => chart?.dispose();
  }, []);

  return (
    <Screen>
      <Text style={tw`text-center`}>Chart of token {name}</Text>
      <View style={styles.noteContainer}>
        <View style={[styles.noteLine, { backgroundColor: 'yellow' }]} />
        <Text style={styles.noteText}>Total user betting</Text>
      </View>

      {/* Note for the blue line */}
      <View style={styles.noteContainer}>
        <View style={[styles.noteLine, { backgroundColor: 'blue' }]} />
        <Text style={styles.noteText}>Total token usage for betting</Text>
      </View>

      <SkiaChart ref={skiaRef} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  noteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  noteLine: {
    width: 20,
    height: 3,
    marginRight: 8,
  },
  noteText: {
    fontSize: 16,
  },
});