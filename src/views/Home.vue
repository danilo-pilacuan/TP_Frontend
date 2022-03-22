<template>
  <div>
    <SecurityComponent/>
    <title-bar :title-stack="titleStack" />
    <hero-bar :has-right-visible="false">
      Inicio
    </hero-bar>
    <section class="section is-main-section">
      

      <tiles>
        <card-widget
          class="tile is-child"
          type="is-primary"
          icon="account-multiple"
          :number="numUsuarios"
          label="Trabajadores"
        />
        <card-widget
          class="tile is-child"
          type="is-info"
          icon="hammer-wrench"
          :number="numActivos"
          label="Activos"
        />
        <card-widget
          class="tile is-child"
          type="is-success"
          icon="chart-timeline-variant"
          :number="numOrdenes"
          label="Tareas Mantenimiento"
        />
      </tiles>

      <card-component
        title="Rendimiento General"
        icon="finance" 
      >
        <div
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
  data() {
    return {
      tablaUsuarios:null,
      tablaActivos:null,
      tablaOrdenes:null,


      numUsuarios:0,
      numActivos:0,
      numOrdenes:0,


      titleStack:['Admin', 'Inicio'],

    };
  },
methods: {
    fetchUsuarios() {
      try {
        fetch(process.env.VUE_APP_TITLE+"Api/usuarios", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        })
          .then((response) => response.json())
          .then((data) => {
            var resp = data;

            if (data) {
              this.tablaUsuarios=data["resultado"]
              this.numUsuarios=this.tablaUsuarios.length
            } else {
              this.tablaUsuarios = [];
            }
          });
      } catch (e) {
        
      }
    },
    fetchActivos() {
      try {
        fetch(process.env.VUE_APP_TITLE+"Api/Activos", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        })
          .then((response) => response.json())
          .then((data) => {
            var resp = data;

            if (data) {
              this.tablaActivos=data["resultado"]
              this.numActivos=this.tablaActivos.length
            } else {
              this.tablaActivos = [];
            }
          });
      } catch (e) {
        
      }
    },
    fetchOrdenes() {
      try {
        fetch(process.env.VUE_APP_TITLE+"Api/ordentrabajo", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        })
          .then((response) => response.json())
          .then((data) => {
            var resp = data;

            if (data) {
              this.tablaOrdenes=data["resultado"]
              this.numOrdenes=this.tablaOrdenes.length
            } else {
              this.tablaOrdenes = [];
            }
          });
      } catch (e) {
        
      }
    },
    
},
mounted() {
    //llamados fetch @todo cambiar9
    this.fetchUsuarios()
    this.fetchActivos()
    this.fetchOrdenes()

  },
  
}
</script>
