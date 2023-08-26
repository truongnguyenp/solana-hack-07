import { Text } from "react-native";
import tw from "twrnc";
import React, { useRef, useEffect } from "react"
import * as echarts from 'echarts/core'
import { LineChart } from 'echarts/charts'
import { GridComponent } from 'echarts/components'
import { SVGRenderer, SkiaChart } from '@wuba/react-native-echarts'
 
import { Screen } from "../components/Screen";
echarts.use([SVGRenderer, LineChart, GridComponent]);

export function ChartEsportcast() {
  const skiaRef = useRef<any>(null);
  
  useEffect(() => {
    const option = {
      xAxis: {
        type: 'value',
        data: ['0', '5', '10', '15', '20', '25', '30'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line',
        },
        {
          data: [179, 40, 124, 248, 35, 147, 80],
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
      <Text style={tw`mb-4`}>chart EsportForecast</Text>
      <SkiaChart ref={skiaRef}/>
    </Screen>
  );
}
