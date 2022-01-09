<template>
  <div>
    
    <section class="section is-main-section">

<CrudActivos/>
      
    </section>
  </div>
</template>

<script>
import Notification from '@/components/Notification.vue'
import CrudActivos from '@/components/CrudActivos.vue'
import CardComponent from '@/components/CardComponent.vue'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'

export default {
  name: 'Tables',
  components: {
    HeroBar,
    TitleBar,
    CardComponent,
    Notification,
    CrudActivos
  },
  data(){
return{
    data1:" datos1",
    data2:" datos2",
    data3:" datos3",
    data4:" datos4",
    uriActivos:"http://localhost:3000/API/Activos",
    uriAreas:"http://localhost:3000/API/Areas",
    columnsAreas:[
      {
        field: 'descripcion',
        label: 'descripcion',
        searchable: true
      },
      {
        field: 'codigoArea',
        label: 'codigoArea',
        searchable: true
      },
      {
        field: 'idEdificio',
        label: 'idEdificio',
        searchable: true
      }
    ],
    
  }
  }
  
}
</script>
