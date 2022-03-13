<template>
  <div id="users" class="home">
    <hero-bar>
        <!-- @todo cambiar1 -->
      Costos Por Orden de Trabajo
    </hero-bar>
    <div class="container">
        
      <div class="block">
        <div class="columns">
          <div class="column">
            
          </div>
        </div>
        <b-table
          :data="tablaDatos"
          :bordered="true"
          :striped="true"
          :narrowed="false"
          :hoverable="false"
          :loading="false"
          :focusable="true"
          :mobile-cards="false"
          :searchable="true"
          :paginated="true"
          :per-page="20"
        >
          <template v-for="column in columns">
            <b-table-column :key="column.id" v-bind="column">
              <template
                v-if="column.searchable && !column.numeric"
                #searchable="props"
              >
                <b-input
                  v-model="props.filters[props.column.field]"
                  placeholder="Buscar..."
                  icon="magnify"
                  size="is-small"
                />
              </template>
              <template v-slot="props">
                <div v-if="typeof props.row[column.field] === 'object'">
                  {{ props.row[column.field][column.subField] }}
                </div>
                <div v-else>
                  {{ props.row[column.field] }}
                </div>
              </template>
            </b-table-column>
          </template>
          <b-table-column field="actions" label="Acciones" v-slot="props">
            <div class="buttons">
              <b-button
                rounded
                type="is-link"
                icon-left="eye"
                @click="verOrden(props.row)"
              >
              </b-button>
              <b-button
                rounded
                type="is-warning"
                icon-left="pencil"
                @click="editFunction(props.row)"
              >
              </b-button>
              <b-button
                rounded
                type="is-danger"
                icon-left="delete"
                @click="deleteFunction(props.row)"
              >
              </b-button>
            </div>
          </b-table-column>
        </b-table>
      </div>
    </div>

  </div>
</template>

<script>
import HeroBar from '@/components/HeroBar.vue'

export default {
    components: {
    HeroBar
  },
  data() {
    return {
        //prefijo ruta @todo cambiar3
      prefixRuta: "ordentrabajo",
      //nombres campos @todo cambiar4
       
        inputDescripcion: null,
        
      
      //info entidad @todo cambiar5
    //   nombreEntidad: "Caracteristicas",
      
      //tablas Datos @todo cambiar6
      tablaDatos: [],
      //columnas tabla Datos @todo cambiar7
      columns: [
        {
          field: "numero",
          label: "Número",
          searchable: true,
        },
        {
          field: "fechaOrden",
          label: "Fecha Orden",
          searchable: true,
        },
        // {
        //   field: "Taller",
        //   subField: "descripcion",
        //   label: "Taller",
        //   searchable: true,
        // },
        // {
        //   field: "Area",
        //   subField: "descripcion",
        //   label: "Área",
        //   searchable: true,
        // },
        {
          field: "Activo",
          subField: "nombre",
          label: "Activo",
          searchable: true,
        },
        {
          field: "observaciones",
          label: "Observaciones",
          searchable: true,
        },
        {
          field: "Trabajador",
          subField: "nombres",
          label: "Nombres Solicitante",
          searchable: true,
        },
        {
          field: "Trabajador",
          subField: "apellidos",
          label: "Apellidos Solicitante",
          searchable: true,
        },       
        {
          field: "costoTareas",
          label: "Costo Tareas",
          searchable: true,
        },
        {
          field: "costoMateriales",
          label: "Costo Materiales",
          searchable: true,
        },    
        
      ],
      //tablas auxiliares @todo cambiar8
      
      //auxiliares modal
      isAdd: false,
      isEdit: false,

      showModalCreateEdit: false,
      showModalDelete: false,

      //control errores validacion
      nombreNotAvailable: false,
      nombreHasErrors: false,
      nombreTooShort: false,
    };
  },
  mounted() {
    //llamados fetch @todo cambiar9
    
    this.fetchDatos()
  },
  methods: {
    verOrden(row){
      var idOrden=row.id
      this.$router.push("/Ordenes/"+idOrden);
    },
    fetchDatos() {
      try {
        fetch(process.env.VUE_APP_TITLE+"API/"+this.prefixRuta, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        })
          .then((response) => response.json())
          .then((data) => {
            var resp = data;

            if (data) {
              this.tablaDatos = data["resultado"];
              this.tablaDatos.forEach(element => {
                
                  var auxCostoTareas=0;
                  var auxCostoMateriales=0;
                  element.Tareas.forEach(tarea => {
                      auxCostoTareas=auxCostoTareas+(tarea.numeroResponsables*tarea.horasHombre*parseFloat(tarea.costoHora))
                  });
                  element.Materials.forEach(material => {
                      auxCostoMateriales=auxCostoMateriales+(parseFloat(material.Orden_Material.cantidad)*parseFloat(material.precioUnitario))
                  });
                  element.costoTareas=auxCostoTareas.toFixed(2);
                  element.costoMateriales=auxCostoMateriales.toFixed(2);
              });
              
              //console.log(this.tablaDatos)
            } else {
              //this.$router.push("/login")
              this.tablaDatos = [];
            }
          });
      } catch (e) {
        //this.$store.dispatch("setAuth", false);
      }
    },
    
    //Fetchs adicionales @todo cambiar10

    createFunction() {
      this.$router.push("/ordentrabajocrear");
    },
    submit() {
      if (this.isAdd) {
        fetch(process.env.VUE_APP_TITLE+"API/"+this.prefixRuta, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            //agregar campos a crear @todo cambiar11
            
            descripcion: this.inputDescripcion,

          }),
        })
          .then((response) => response.json())
          .then((data) => {
            var resp = data.message;
            console.log(resp);

            //encerar valores @todo cambiar12
            this.inputDescripcion=null,
            
            //cerrar modal
            this.isAdd = false;
            this.isEdit = false;

            this.showModalCreateEdit = false;
            this.$buefy.dialog.alert("Tipo Mantenimiento agregado correctamente"); //@todo cambiar13

            this.fetchDatos();
          });
      } else if (this.isEdit) {
        fetch(
          process.env.VUE_APP_TITLE+"API/"+this.prefixRuta+"/" + this.idSeleccionado.toString(),
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              //agregar campos editados @todo cambiar14
                descripcion:this.inputDescripcion
            }),
          }
        )
          .then((response) => response.json())
          .then((data) => {
            var resp = data.message;
            //encerar valores @todo cambiar15
            this.inputDescripcion=null,
            
            this.showModalCreateEdit = false;
            this.$buefy.dialog.alert("Tipo Mantenimiento editado correctamente");
            //llamar fetch
            this.fetchDatos();
          });
      }
    },
    verFichaEquipo(row){
      var idActivo=row.id
      this.$router.push("/Equipos/"+idActivo);
    },
    editFunction(row) {
      //obtener valores para editar en form @todo cambiar16
      this.inputDescripcion=row.descripcion,
      //id Editar @todo cambiar17
      this.idSeleccionado = row.id;
      //mostrar modal
      this.showModalCreateEdit = true;
      this.isAdd = false;
      this.isEdit = true;
    },
    deleteFunction(row) {
      const idDel = row.id;
      fetch(process.env.VUE_APP_TITLE+"API/"+this.prefixRuta+"/" + idDel.toString(), {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          var resp = data.message;
          //limpiar campos form @todo cambiar18
          this.inputDescripcion=null,
          //cerrar form
          this.isAdd = false;
          this.isEdit = false;

          this.showModalCreateEdit = false;
          this.$buefy.dialog.alert("Tipo Mantenimiento eliminado correctamente"); //@todo cambiar19
          //llamar fetch
          this.fetchDatos();
        });
    },
  },
};
</script>

<style>
</style>