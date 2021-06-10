import { createApp } from 'vue'
import Echarts from 'vue-echarts';

import {
    CanvasRenderer
  } from 'echarts/renderers'
  import {
    BarChart
  } from 'echarts/charts'
  import {
    GridComponent,
    TooltipComponent
  } from 'echarts/components'

const app = createApp(...)

app.component('v-chart', ECharts)

app.mount(...)