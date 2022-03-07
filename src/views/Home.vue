<template>
  <div>
    <SecurityComponent/>
    <title-bar :title-stack="titleStack" />
    <hero-bar :has-right-visible="false">
      Inicio
    </hero-bar>
    <section class="section is-main-section">
      <notification class="is-info">
        Resumen Sistema de Mantenimiento

        
      </notification>

      <tiles>
        <card-widget
          class="tile is-child"
          type="is-primary"
          icon="account-multiple"
          :number="3"
          label="Trabajadores"
        />
        <card-widget
          class="tile is-child"
          type="is-info"
          icon="hammer-wrench"
          :number="31"
          label="Activos"
        />
        <card-widget
          class="tile is-child"
          type="is-success"
          icon="chart-timeline-variant"
          :number="12"
          label="Tareas Mantenimiento"
        />
      </tiles>

      <card-component
        title="Rendimiento General"
        icon="finance"
        header-icon="reload"
        @header-icon-click="fillChartData"
      >
        <div
          v-if="chartData"
          class="chart-area"
        >
          <ChartCostos
          />
        </div>
      </card-component>

     
    </section>
  </div>
</template>

<script>
import { ref, onMounted } from '@vue/composition-api'
import * as chartConfig from '@/components/Charts/chart.config.js'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'
import Tiles from '@/components/Tiles.vue'
import CardWidget from '@/components/CardWidget.vue'
import CardComponent from '@/components/CardComponent.vue'
import LineChart from '@/components/Charts/LineChart.vue'
import ClientsTableSample from '@/components/ClientsTableSample.vue'
import Notification from '@/components/Notification.vue'
import SecurityComponent from "@/components/SecurityComponent.vue"
import ChartCostos from "@/components/ChartCostos.vue"

export default {
  name: 'Home',
  components: {
    ClientsTableSample,
    ChartCostos,
    CardComponent,
    CardWidget,
    Tiles,
    HeroBar,
    TitleBar,
    Notification,
    SecurityComponent
  },
  setup (props, { root: { $buefy } }) {
    const titleStack = ['Admin', 'Inicio']

    const chartOptions = chartConfig.chartOptionsMain

    const chartData = ref(null)

    const fillChartData = () => {
      chartData.value = chartConfig.sampleChartData()
    }

    onMounted(() => {
      fillChartData()

      // $buefy.snackbar.open({
      //   message: 'Bienvenido de vuelta',
      //   queue: false
      // })
    })

    return {
      titleStack,
      chartOptions,
      chartData,
      fillChartData
    }
  }
}
</script>
