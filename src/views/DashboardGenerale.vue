<template>
  <div class="chart_container" id="scrollbar1">
    <div class="chart_card">
      <div class="chart_btn">
        <button>TOT</button>
        <button>MESE</button>
        <button>SETTIMANA</button>
        <button>OGGI</button>
      </div>
      <v-chart
        v-show="dataLoaded"
        ref="chartOrdiniZone"
        class="chart"
        :option="optionOrdiniZone"
        autoresize
      />
    </div>
    <div class="chart_card">
      <div class="chart_btn">
        <button>TOT</button>
        <button>MESE</button>
        <button>SETTIMANA</button>
        <button>OGGI</button>
      </div>
      <v-chart
        v-show="dataLoaded"
        ref="chartOrdiniPayment"
        class="chart"
        :option="optionOrdiniPayment"
        autoresize
      />
    </div>
    <div class="chart_card">
      <div class="chart_btn">
        <button>TOT</button>
        <button>MESE</button>
        <button>SETTIMANA</button>
        <button>OGGI</button>
      </div>
      <v-chart
        v-show="dataLoaded"
        ref="chartPizzeZone"
        class="chart"
        :option="optionPizzeZone"
        autoresize
      />
    </div>
    <div class="chart_card">
      <div class="chart_btn">
        <button>TOT</button>
        <button>MESE</button>
        <button>SETTIMANA</button>
        <button>OGGI</button>
      </div>
      <v-chart
        v-show="dataLoaded"
        ref="chartPizzeTime"
        class="chart"
        :option="optionPizzeTime"
        autoresize
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { ref, nextTick, provide, defineComponent } from 'vue'
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
      chartOrdiniPayment: ref(null),
      dataLoaded, // Expose it so it can be used in the template
    }
  },
  data() {
    return {
      optionOrdiniZone: {
        title: {
          text: 'Ordini per Zone',
          left: 'center',
          top: '7%',
          textStyle: {
            fontSize: 35,
          },
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
          backgroundColor: '#212121',
          borderColor: '#212121',
          borderWidth: 1,
          textStyle: {
            color: '#fb8c00',
          },
        },
        legend: {
          orient: 'horizontal',
          bottom: '3%',
          data: [],
          textStyle: {
            color: '#fb8c00',
            fontSize: 12,
          },
          icon: 'circle',
          itemWidth: 30,
          itemHeight: 30,
          backgroundColor: '#212121',
          borderRadius: 5,
          borderColor: '#212121',
          borderWidth: 1,
          padding: 10, // [top, right, bottom, left]
        },
        series: [
          {
            name: 'Ordini Per Zone',
            type: 'pie',
            radius: '75%',
            center: ['50%', '50%'],
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
                  '#ffd700',
                  '#133337',
                  '#990000',
                  '#0a75ad',
                  '#065535',
                  '#008080',
                  '#ff7f50',
                  '#c6e2ff',
                  '#66cdaa',
                ]
                return colorList[params.dataIndex % colorList.length]
              },
              borderColor: '#212121',
              borderWidth: 1.5,
            },
          },
        ],
      },
      optionPizzeZone: {
        title: {
          text: 'Pizze per Zone',
          left: 'center',
          top: '7%',
          textStyle: {
            fontSize: 35,
          },
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
          backgroundColor: '#212121',
          borderColor: '#212121',
          borderWidth: 1,
          textStyle: {
            color: '#fb8c00',
          },
        },
        legend: {
          orient: 'horizontal',
          bottom: '3%',
          data: [],
          textStyle: {
            color: '#fb8c00',
            fontSize: 12,
          },
          icon: 'circle',
          itemWidth: 30,
          itemHeight: 30,
          backgroundColor: '#212121',
          borderRadius: 5,
          borderColor: '#212121',
          borderWidth: 1,
          padding: 10, // [top, right, bottom, left]
        },
        series: [
          {
            name: 'Pizze per Zone ',
            type: 'pie',
            radius: '75%',
            center: ['50%', '50%'],
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
                  '#ffd700',
                  '#133337',
                  '#990000',
                  '#0a75ad',
                  '#065535',
                  '#008080',
                  '#ff7f50',
                  '#c6e2ff',
                  '#66cdaa',
                ]
                return colorList[params.dataIndex % colorList.length]
              },
              borderColor: '#212121',
              borderWidth: 1.5,
            },
          },
        ],
      },
      optionPizzeTime: {
        title: {
          text: 'Pizze per Time',
          left: 'center',
          top: '7%',
          textStyle: {
            fontSize: 35,
          },
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
          backgroundColor: '#212121',
          borderColor: '#212121',
          borderWidth: 1,
          textStyle: {
            color: '#fb8c00',
          },
        },
        legend: {
          orient: 'horizontal',
          bottom: '3%',
          data: [],
          textStyle: {
            color: '#fb8c00',
            fontSize: 12,
          },
          icon: 'circle',
          itemWidth: 30,
          itemHeight: 30,
          backgroundColor: '#212121',
          borderColor: '#212121',
          borderRadius: 5,
          borderWidth: 1,
          padding: 10, // [top, right, bottom, left]
        },
        series: [
          {
            name: 'Pizze Per Orari',
            type: 'pie',
            radius: '75%',
            center: ['50%', '50%'],
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
                  '#ffd700',
                  '#133337',
                  '#990000',
                  '#0a75ad',
                  '#065535',
                  '#008080',
                  '#ff7f50',
                  '#c6e2ff',
                  '#66cdaa',
                ]
                return colorList[params.dataIndex % colorList.length]
              },
              borderColor: '#212121',
              borderWidth: 1.5,
            },
          },
        ],
      },
      optionOrdiniPayment: {
        // New option object
        title: {
          text: 'Ordini per Pagamento',
          left: 'center',
          top: '7%',
          textStyle: {
            fontSize: 25,
          },
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
          backgroundColor: '#212121',
          borderColor: '#212121',
          borderWidth: 1,
          textStyle: {
            color: '#fb8c00',
          },
        },
        legend: {
          orient: 'horizontal',
          bottom: '3%',
          data: [],
          textStyle: {
            color: '#fb8c00',
            fontSize: 12,
          },
          icon: 'circle',
          itemWidth: 30,
          itemHeight: 30,
          backgroundColor: '#212121',
          borderColor: '#212121',
          borderWidth: 1,
          borderRadius: 5,
          padding: 10, // [top, right, bottom, left]
        },
        series: [
          {
            name: 'Ordini Per metodo Pagamento',
            type: 'pie',
            radius: '75%',
            center: ['50%', '50%'],
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
                  '#ffd700',
                  '#133337',
                  '#990000',
                  '#0a75ad',
                  '#065535',
                  '#008080',
                  '#ff7f50',
                  '#c6e2ff',
                  '#66cdaa',
                ]
                return colorList[params.dataIndex % colorList.length]
              },
              borderColor: '#212121',
              borderWidth: 1.5,
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
          this.ordiniPerMetodoPagamento(),
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
    async ordiniPerMetodoPagamento() {
      // New method
      try {
        const response = await axios.get(
          'https://patpizza-be.onrender.com/ordine/getOrdini'
        )
        const data = response.data
        const paymentMap = {}

        data.forEach((item) => {
          if (!paymentMap[item.metodoPagamento]) {
            paymentMap[item.metodoPagamento] = 0
          }
          paymentMap[item.metodoPagamento]++
        })

        const legendData = []
        const seriesData = []

        for (const [key, value] of Object.entries(paymentMap)) {
          legendData.push(key)
          seriesData.push({ value, name: key })
        }

        this.optionOrdiniPayment.legend.data = legendData
        this.optionOrdiniPayment.series[0].data = seriesData
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
  width: 100%;
  max-width: 100vw;
  overflow: scroll;
  overflow-x: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 0.5rem;
  column-gap: 0.5rem;
}

.chart {
  width: 95%;
  overflow-x: hidden;
  border-radius: 5px;
  padding: 1rem;
}

.chart_card {
  background-color: #f0f1fa;
  min-height: 130vh;
  border-radius: 5px;
  padding: 1rem;
  margin: 0.5rem;
  position: relative;
}

.chart_btn {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: row;
  background-color: var(--shadow);
  padding: 0.3rem;
  border-radius: 5px;
}

.chart_btn button {
  width: 100%;
  height: 5%;
  position: sticky;
  top: 0;
  border: 3px solid var(--link_light);
  border-radius: 5px;
  margin: 0.1rem;
}

button {
  background-color: var(--link);
  color: var(--link_light);
  text-align: center;
  font-weight: bold;
  font-size: 17px;
}

button:hover {
  color: var(--link);
  background-color: var(--link_light);
  cursor: pointer;
}

@media only screen and (max-width: 430px) {
  .chart_container {
    grid-template-columns: 1fr;
  }

  .chart_card {
    max-width: 90vw;
    padding: 0;
    min-height: 100vh;
    margin-bottom: 3rem;
  }

  .chart {
    overflow-x: hidden;
    padding: 0.1rem;
    width: 90vw;
  }
}
</style>
