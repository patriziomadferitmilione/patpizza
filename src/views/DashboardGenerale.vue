<template>
  <div class="chart_container">
    <v-chart
      v-show="dataLoaded"
      ref="chartOrdiniZone"
      class="chart"
      :option="optionOrdiniZone"
      autoresize
    />
    <v-chart
      v-show="dataLoaded"
      ref="chartPizzeZone"
      class="chart"
      :option="optionPizzeZone"
      autoresize
    />
    <v-chart
      v-show="dataLoaded"
      ref="chartPizzeTime"
      class="chart"
      :option="optionPizzeTime"
      autoresize
    />
  </div>
</template>

<script>
import axios from 'axios'
import { ref, reactive, nextTick, provide, defineComponent } from 'vue'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components'
import VChart, { THEME_KEY } from 'vue-echarts'
import { use } from 'echarts/core'

export default defineComponent({
  components: {
    VChart,
  },
  setup() {
    use([
      CanvasRenderer,
      PieChart,
      TitleComponent,
      TooltipComponent,
      LegendComponent,
    ])

    const dataLoaded = ref(false) // New reactive variable

    return {
      chartOrdiniZone: ref(null),
      chartPizzeZone: ref(null),
      chartPizzeTime: ref(null),
      dataLoaded, // Expose it so it can be used in the template
    }
  },
  data() {
    return {
      optionOrdiniZone: {
        title: {
          text: 'Ordini Per Zone',
          left: 'center',
          top: '20%',
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'horizontal',
          top: '90%',
          data: [], // Initialize as empty array
          textStyle: {
            color: '#f5f5f5',
            fontSize: 12,
          },
          icon: 'circle',
          itemWidth: 20,
          itemHeight: 20,
          backgroundColor: 'rgba(40,76,84,0.7)',
          borderColor: '#ccc',
          borderWidth: 2,
          padding: 10, // [top, right, bottom, left]
        },
        series: [
          {
            name: 'Traffic Sources',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [], // Initialize as empty array
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      },
      optionPizzeZone: {
        title: {
          text: 'Pizze per Zone',
          left: 'center',
          top: '20%',
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'horizontal',
          top: '90%',
          data: [],
          textStyle: {
            color: '#f5f5f5',
            fontSize: 12,
          },
          icon: 'circle',
          itemWidth: 20,
          itemHeight: 20,
          backgroundColor: 'rgba(0,0,0,0.5)',
          borderColor: '#ccc',
          borderWidth: 2,
          padding: 10, // [top, right, bottom, left]
        },
        series: [
          {
            name: 'Pizzas Sold',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      },
      optionPizzeTime: {
        title: {
          text: 'Pizze per Time',
          left: 'center',
          top: '20%',
          textStyle: {
            fontSize: 18,
          },
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
          backgroundColor: 'rgba(50,50,50,0.7)',
          borderColor: '#333',
          borderWidth: 1,
          textStyle: {
            color: '#fff',
          },
        },
        legend: {
          orient: 'horizontal',
          top: '90%',
          data: [],
          textStyle: {
            color: '#f5f5f5',
            fontSize: 14,
          },
          icon: 'circle',
          itemWidth: 20,
          itemHeight: 20,
          backgroundColor: 'rgba(0,0,0,0.5)',
          borderColor: '#ccc',
          borderWidth: 2,
          padding: 10, // [top, right, bottom, left]
        },
        series: [
          {
            name: 'Traffic Sources',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
            itemStyle: {
              color: function (params) {
                const colorList = [
                  '#c23531',
                  '#2f4554',
                  '#61a0a8',
                  '#d48265',
                  '#91c7ae',
                ]
                return colorList[params.dataIndex % colorList.length]
              },
              borderColor: '#fff',
              borderWidth: 2,
            },
          },
        ],
      },
      dataLoaded: false,
    }
  },
  methods: {
    async initializeData() {
      provide(THEME_KEY, 'dark')

      try {
        await Promise.all([
          this.pizzePerZone(),
          this.pizzePerTime(),
          this.ordiniPerZone(),
        ]) // Added ordiniPerZone here
        this.dataLoaded = true
      } catch (error) {
        console.error('Failed to initialize data', error)
        console.log(error)
      }

      nextTick(() => {
        this.chartOrdiniZone?.value?.resize()
        this.chartPizzeZone?.value?.resize()
        this.chartPizzeTime?.value?.resize()
      })
    },
    async ordiniPerZone() {
      try {
        console.log('ordiniPerZone: Fetching data...')
        const response = await axios.get(
          'https://patpizza-be.onrender.com/ordine/getOrdini'
        )
        console.log('ordiniPerZone: Data fetched', response.data)

        const data = response.data
        const zonesMap = {}

        data.forEach((item) => {
          if (!zonesMap[item.zona]) {
            zonesMap[item.zona] = 0
          }
          zonesMap[item.zona]++
        })

        const legendData = []
        const seriesData = []

        for (const [key, value] of Object.entries(zonesMap)) {
          legendData.push(key)
          seriesData.push({ value, name: key })
        }

        this.optionOrdiniZone.legend.data = legendData
        this.optionOrdiniZone.series[0].data = seriesData

        console.log(
          'ordiniPerZone: Updated chart options',
          this.optionOrdiniZone
        )
      } catch (error) {
        console.error('Failed to fetch data', error)
        console.log(error)
      }
    },
    async pizzePerZone() {
      try {
        const response = await axios.get(
          'https://patpizza-be.onrender.com/pizza/getPizzasByZonaAndTime'
        )
        const data = response.data
        const zonesMap = {}

        Object.keys(data).forEach((zone) => {
          data[zone].forEach(() => {
            if (!zonesMap[zone]) {
              zonesMap[zone] = 0
            }
            zonesMap[zone]++
          })
        })

        const legendData = []
        const seriesData = []

        for (const [zone, count] of Object.entries(zonesMap)) {
          legendData.push(zone)
          seriesData.push({ value: count, name: zone })
        }

        this.optionPizzeZone.legend.data = legendData
        this.optionPizzeZone.series[0].data = seriesData
      } catch (error) {
        console.error('Failed to fetch data', error)
      }
    },
    async pizzePerTime() {
      try {
        const response = await axios.get(
          'https://patpizza-be.onrender.com/pizza/getPizzasByZonaAndTime'
        )
        const data = response.data
        const timeMap = {}

        Object.keys(data).forEach((zone) => {
          data[zone].forEach((order) => {
            const time = order.orarioConsegna
            if (!timeMap[time]) {
              timeMap[time] = 0
            }
            timeMap[time]++
          })
        })

        const legendData = []
        const seriesData = []

        for (const [time, count] of Object.entries(timeMap)) {
          legendData.push(time)
          seriesData.push({ value: count, name: time })
        }

        this.optionPizzeTime.legend.data = legendData
        this.optionPizzeTime.series[0].data = seriesData
      } catch (error) {
        console.error('Failed to fetch data', error)
      }
    },
  },
  async mounted() {
    this.initializeData()
  },
})
</script>

<style scoped>
.chart_container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 1rem;
}

.chart {
  height: 100vh;
  width: 90vw;
}
</style>
