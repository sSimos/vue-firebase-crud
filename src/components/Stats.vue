<template>
  <Doughnut v-if="loaded" :chart-data="chartData" :chart-id="mucustomchart" />
</template>

<script>
import { Doughnut } from 'vue-chartjs'
import { useLoadWaitTasks } from '@/firebase'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

export default {
  name: 'DoughnutChart',
  components: { Doughnut },
  props: {
    chartId: {
      type: String,
      default: 'bar-chart'
    },
    cssClasses: {
      default: 'doughnut-chart-half',
      type: String
    }
  },
  data: () => ({
    loaded: false,
    chartData: null
  }),
  async mounted() {
    this.loaded = false

    try {
      var tasks = await useLoadWaitTasks()
      this.chartData = this.tasksToChartData(tasks)

      this.loaded = true
    } catch (e) {
      console.error(e)
    }
  },
  methods: {
    tasksToChartData(tasks) {
      var holder = {}
      tasks.forEach(function(d) {
        // console.log(d)
        if (Object.prototype.hasOwnProperty.call(holder, d.user)) {
          holder[d.user] = holder[d.user] + parseInt(d.time)
        } else {
          holder[d.user] = parseInt(d.time)
        }
      })
      var my_labels = []
      var my_data = []
      var my_colors = []
      for (var prop in holder) {
        //   obj2.push({ name: prop, value: holder[prop] })
        // assign a random color
        my_labels.push(prop)
        my_data.push(holder[prop])
        my_colors.push('#' + (((1 << 24) * Math.random()) | 0).toString(16))
      }
      return {
        labels: my_labels,
        datasets: [
          {
            label: 'Data One',
            backgroundColor: my_colors,
            data: my_data
          }
        ]
      }
    }
  }
}
</script>

<style>
#doughnut-chart {
  max-height: 50vh !important;
}
</style>
