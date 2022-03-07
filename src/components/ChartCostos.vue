<template>
  <div class="small">
    <button @click="fillData()">Randomize</button>
    <line-chart :chart-data="dataCostos"></line-chart>
    
  </div>
</template>

<script>
  import LineChart from './Charts/LineChart.js'

  export default {
    components: {
      LineChart
    },
    data () {
      return {
        datacollection: null,
        dataCostos:null,
        defaultColor: {
          primary: '#00D1B2',
          info: '#209CEE',
          danger: '#FF3860'
        }
      }
    },
    mounted () {
      this.fillData()
      this.getCostosData();
    },
    methods: {
      fillData () {
        this.datacollection = {
          labels: [5, 6],
          datasets: [
            {
              label: 'Data One',
              backgroundColor: '#f87979',
              data: [1, 2]
            }, 
          ]
        }
      },
      fillDataCostos(){
        
      },
      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      },
      getCostosData(){
        try {
        fetch("http://localhost:3000/API/ordentrabajo/ByDate", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        })
          .then((response) => response.json())
          .then((data) => {
            var resp = data;

            if (data) {
              this.tablaDatos = data["resultado"];
              console.log(this.tablaDatos)
              this.tablaDatos.forEach(element => {
                  var auxCostoTareas=0;
                  var auxCostoMateriales=0;
                  element.Tareas.forEach(tarea => {
                      auxCostoTareas=auxCostoTareas+(tarea.numeroResponsables*tarea.horasHombre*parseFloat(tarea.costoHora))
                  });
                  element.Materials.forEach(material => {
                      auxCostoMateriales=auxCostoMateriales+(parseFloat(material.cantidad)*parseFloat(material.precioUnitario))
                  });
                  element.costoTareas=auxCostoTareas.toFixed(2);
                  element.costoMateriales=auxCostoMateriales.toFixed(2);

                  

              });

              var labelsCostos=[];
                  var costosData=[]
                  this.tablaDatos.forEach(element => {
                      labelsCostos.push((new Date(Date.parse(element["createdAt"]))).toLocaleDateString())
                      costosData.push(parseFloat(element.costoTareas)+parseFloat(element.costoMateriales))
                  });
                  this.dataCostos = {
                    labels: labelsCostos,
                    datasets: [
                      {
                        label: 'Costos',
                        data: costosData,
                        fill: false,
                        borderColor: this.defaultColor['primary'],
                        borderWidth: 2,
                        borderDash: [],
                        borderDashOffset: 0.0,
                        pointBackgroundColor: this.defaultColor['primary'],
                        pointBorderColor: 'rgba(255,255,255,0)',
                        pointHoverBackgroundColor: this.defaultColor['primary'],
                        pointBorderWidth: 20,
                        pointHoverRadius: 4,
                        pointHoverBorderWidth: 15,
                        pointRadius: 4,
                        tension: 0.5,
                        cubicInterpolationMode: 'default'

                      }, 
                    ]
                    
                  }
              
              //console.log(this.tablaDatos)
            } else {
              //this.$router.push("/login")
              this.tablaDatos = [];
            }
          });
      } catch (e) {
        //this.$store.dispatch("setAuth", false);
      }
      }
    }
  }
</script>

<style>
  .small {
    max-width: 600px;
    margin:  150px auto;
  }
</style>