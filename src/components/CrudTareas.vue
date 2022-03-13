<template>
  <div id="users" class="home">
    <hero-bar>
        <!-- @todo cambiar1 -->
      Tareas
      <b-button slot="right" type="is-primary" @click="createFunction">Crear</b-button>
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

    <b-modal v-model="showModalCreateEdit">
      <form @submit.prevent="submit">
        <div class="modal-card" style="width: auto">
          <header class="modal-card-head">
              <!-- @todo cambiar1.5 -->
            <p class="modal-card-title">Crear Tarea</p> 
            <button
              type="button"
              class="delete"
              @click="showModalCreateEdit = false"
            />
          </header>
          <section class="modal-card-body">
            <div class="columns">
              <div class="column">
                  <!-- @todo cambiar2 -->
                <b-field
                  label="Descripción"
                  :type="{ 'is-danger': nombreHasErrors }"
                  :message="[
                    { 'Username is not available': nombreNotAvailable },
                    { 'Username is too short': nombreTooShort },
                  ]"
                >
                  <b-input v-model="inputDescripcion"></b-input>
                </b-field>
                
              </div>
            </div>

            <div class="columns">
              <div class="column">
                <b-field label="Número de Responsables">
                    <b-numberinput v-model="inputNumeroResponsables" placeholder="0"></b-numberinput>
                </b-field>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <b-field label="Horas Hombre">
                    <b-numberinput v-model="inputHorasHombre" placeholder="0"></b-numberinput>
                </b-field>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <b-field label="Costo por Hora">
                    <b-numberinput v-model="inputCostoHora" step="0.01" placeholder="0"></b-numberinput>
                </b-field>
              </div>
            </div>

            <!-- <div class="columns">
              <div class="column">
                <b-field label="Fecha Inicio">
                    <b-datepicker
                        v-model="inputFechaInicio"
                        :show-week-number="true"
                        :locale="undefined"
                        placeholder="Seleccionar fecha..."
                        icon="calendar-today"
                        :icon-right="inputFechaInicio ? 'close-circle' : ''"
                        icon-right-clickable
                        @icon-right-click="inputFechaInicio=null"
                        trap-focus>
                    </b-datepicker>
                </b-field>
              </div>
            </div>

            <div class="columns">
              <div class="column">
                <b-field label="Semana inicial">
                    <b-numberinput v-model="inputSemanaInicial" placeholder="0"></b-numberinput>
                </b-field>
              </div>
            </div> -->

            <!-- <div class="columns">
              <div class="column">
                <b-field label="Activo">
                    <b-autocomplete
                        v-model="inputBuscarActivo"
                        placeholder="Seleccionar Activo"
                        :keep-first="false"
                        :open-on-focus="true"
                        :data="filterActivos"
                        field="campoDisplay"
                        @select="option => (inputActivo = option)"
                        :clearable="true"
                    >
                    </b-autocomplete>                    
                </b-field>
              </div>
            </div>

            <div class="columns">
              <div class="column">
                <b-field label="Trabajador Responsable">
                    <b-autocomplete
                        v-model="inputBuscarTrabajador"
                        placeholder="Seleccionar Trabajador"
                        :keep-first="false"
                        :open-on-focus="true"
                        :data="filterTrabajadores"
                        field="campoDisplay"
                        @select="option => (inputTrabajador = option)"
                        :clearable="true"
                    >
                    </b-autocomplete>                    
                </b-field>
              </div>
            </div> -->

            <div class="columns">
              <div class="column">
                <b-field label="Periodicidad">
                    <b-autocomplete
                        v-model="inputBuscarPeriodicidad"
                        placeholder="Seleccionar Periodicidad"
                        :keep-first="false"
                        :open-on-focus="true"
                        :data="filterPeriodicidad"
                        field="descripcion"
                        @select="option => (inputPeriodicidad = option)"
                        :clearable="true"
                    >
                    </b-autocomplete>                    
                </b-field>
              </div>
            </div>

            <div class="columns">
              <div class="column">
                <b-field label="Estado Mantenimiento">
                    <b-autocomplete
                        v-model="inputBuscarEstadoMantenimiento"
                        placeholder="Seleccionar Estado Mantenimiento"
                        :keep-first="false"
                        :open-on-focus="true"
                        :data="filterEstadoMantenimiento"
                        field="descripcion"
                        @select="option => (inputEstadoMantenimiento = option)"
                        :clearable="true"
                    >
                    </b-autocomplete>                    
                </b-field>
              </div>
            </div>

            <div class="columns">
              <div class="column">
                <b-field label="Tipo Mantenimiento">
                    <b-autocomplete
                        v-model="inputBuscarTipoMantenimiento"
                        placeholder="Seleccionar Tipo Mantenimiento"
                        :keep-first="false"
                        :open-on-focus="true"
                        :data="filterTipoMantenimiento"
                        field="descripcion"
                        @select="option => (inputTipoMantenimiento = option)"
                        :clearable="true"
                    >
                    </b-autocomplete>                    
                </b-field>
                <br><br><br><br><br><br>
              </div>
            </div>




          </section>
          <footer class="modal-card-foot">
            <div class="columns">
              <div class="column">
                <b-button
                  type="is-primary"
                  v-if="isAdd"
                  @click="submit"
                  label="Crear"
                />
                <b-button
                  type="is-primary"
                  v-else
                  @click="submit"
                  label="Editar"
                />
              </div>
              <div class="column">
                <b-button type="is-danger" @click="showModalCreateEdit=false" label="Cancelar" />
              </div>
            </div>
          </footer>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
import HeroBar from '@/components/HeroBar.vue'

export default {
    components: {
    HeroBar
  },
  computed: {
        // filterActivos() {
        //     return this.tablaActivos.filter((option) => {
        //             return option.nombre
        //                 .toString()
        //                 .toLowerCase()
        //                 .indexOf(this.inputBuscarActivo.toLowerCase()) >= 0
        //         })
        // },
        // filterTrabajadores() {
        //     return this.tablaTrabajadores.filter((option) => {
        //             return (option.apellidos
        //                 .toString()
        //                 .toLowerCase()
        //                 .indexOf(this.inputBuscarTrabajador.toLowerCase()) >= 0) 
        //         })
        // },
        filterPeriodicidad() {
            return this.tablaPeriodicidades.filter((option) => {
                    return option.descripcion
                        .toString()
                        .toLowerCase()
                        .indexOf(this.inputBuscarPeriodicidad.toLowerCase()) >= 0
                })
        },
        filterEstadoMantenimiento() {
            return this.tablaEstadoMantenimiento.filter((option) => {
                    return option.descripcion
                        .toString()
                        .toLowerCase()
                        .indexOf(this.inputBuscarEstadoMantenimiento.toLowerCase()) >= 0
                })
        },
        filterTipoMantenimiento() {
            return this.tablaTipoMantenimiento.filter((option) => {
                    return option.descripcion
                        .toString()
                        .toLowerCase()
                        .indexOf(this.inputBuscarTipoMantenimiento.toLowerCase()) >= 0
                })
        },
        
    },
  data() {
    return {
        //prefijo ruta @todo cambiar3
      prefixRuta: "Tareas",
      //nombres campos @todo cambiar4
       
        inputDescripcion:null,
        inputFechaInicio:null,
        inputSemanaInicial:null,

        inputActivo:null,
        inputTrabajador:null,      
        inputPeriodicidad:null,    
        inputEstadoMantenimiento:null,
        inputTipoMantenimiento:null,

        inputCostoHora:null,
        inputHorasHombre:null,
        inputNumeroResponsables:null,

        inputBuscarActivo:"",
        inputBuscarTrabajador:"",
        inputBuscarPeriodicidad:"",
        inputBuscarEstadoMantenimiento:"",
        inputBuscarTipoMantenimiento:"",
        


        // inputCodigoPrioridad: null,
        // inputDenominacion: null,
        // inputPorcentajeMarcha: null,
        // inputEquipoAuxiliar: null,
        // inputInfluenciaSobreProceso: null,
        // inputInfluenciaCalidadProducto: null,
        // inputHorasParoAlMes: null,
        // inputGradoEspecialidad: null,
        // inputInfluenciaEnlaSeguridad: null,
        // inputValorCriticidad: null,
      
      //info entidad @todo cambiar5
    //   nombreEntidad: "Caracteristicas",
      
      //tablas Datos @todo cambiar6
      tablaDatos: [],
      //columnas tabla Datos @todo cambiar7
      columns: [
        {
          field: "descripcion",
          label: "Descripción",
          searchable: true,
        },
        // {
        //   field: "fechaInicio",
        //   label: "Fecha Inicio",
        //   searchable: true,
        // },
        // {
        //   field: "semanaInicial",
        //   label: "Semana Inicial",
        //   searchable: true
        // },
        // {
        //   field: "Activo",
        //   subField: "nombre",
        //   label: "Activo",
        //   searchable: true
        // },
        // {
        //   field: "Trabajador",
        //   subField:"nombres",
        //   label: "Nombres Responsable",
        //   searchable: true
        // },
        // {
        //   field: "Trabajador",
        //   subField:"apellidos",
        //   label: "Apellidos Responsable",
        //   searchable: true
        // },
        {
          field: "numeroResponsables",
          label: "Número Responsables",
          searchable: true,
        },
        {
          field: "horasHombre",
          label: "Horas Hombre",
          searchable: true,
        },
        {
          field: "costoHora",
          label: "Costo Hora",
          searchable: true,
        },
        {
          field: "Periodicidad",
          subField: "descripcion",
          label: "Periodicidad",
          searchable: true
        },
        {
          field: "EstadoMantenimiento",
          subField: "descripcion",
          label: "Estado Mantenimiento",
          searchable: true
        },
        {
          field: "TipoMantenimiento",
          subField: "descripcion",
          label: "Tipo Mantenimiento",
          searchable: true
        }
      ],
      //tablas auxiliares @todo cambiar8
      tablaTrabajadores: [],
      tablaPeriodicidades: [],
      tablaEstadoMantenimiento: [],
      tablaActivos: [],
      tablaTipoMantenimiento: [],
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
    //this.fetchTrabajadores()
    this.fetchPeriodicidades()
    this.fetchEstadosMantenimiento()
    //this.fetchActivos()
    this.fetchTipoMantenimiento()
    
  },
  methods: {
    fetchDatos() {
      try {
        fetch("http://localhost:3000/API/"+this.prefixRuta, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        })
          .then((response) => response.json())
          .then((data) => {
            var resp = data;

            if (data) {
              this.tablaDatos = data["resultado"];
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

    // fetchTrabajadores() {
    //   try {
    //     fetch("http://localhost:3000/API/trabajadores", {
    //       method: "GET",
    //       headers: { "Content-Type": "application/json" },
    //       credentials: "include",
    //     })
    //       .then((response) => response.json())
    //       .then((data) => {
    //         var resp = data;

    //         if (data) {
    //           this.tablaTrabajadores = data["resultado"];
    //           //this.tablaActivos.forEach(element => console.log(element.nombre));
    //           // this.tablaTrabajadores.forEach(element => {
    //           //     element.campoDisplay=element.nombres +" "+element.apellidos
    //           // });
    //         } else {
    //           //this.$router.push("/login")
    //           this.tablaTrabajadores = [];
    //         }
    //       });
    //   } catch (e) {
    //     //this.$store.dispatch("setAuth", false);
    //   }
    // },

    fetchPeriodicidades() {
      try {
        fetch("http://localhost:3000/API/Periodicidades", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        })
          .then((response) => response.json())
          .then((data) => {
            var resp = data;

            if (data) {
              this.tablaPeriodicidades = data["resultado"];
              //console.log(this.tablaDatos)
            } else {
              //this.$router.push("/login")
              this.tablaPeriodicidades = [];
            }
          });
      } catch (e) {
        //this.$store.dispatch("setAuth", false);
      }
    },

    fetchEstadosMantenimiento() {
      try {
        fetch("http://localhost:3000/API/estadomantenimiento", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        })
          .then((response) => response.json())
          .then((data) => {
            var resp = data;

            if (data) {
              this.tablaEstadoMantenimiento = data["resultado"];
              //console.log(this.tablaDatos)
            } else {
              //this.$router.push("/login")
              this.tablaEstadoMantenimiento = [];
            }
          });
      } catch (e) {
        //this.$store.dispatch("setAuth", false);
      }
    },

    // fetchActivos() {
    //   try {
    //     fetch("http://localhost:3000/API/Activos", {
    //       method: "GET",
    //       headers: { "Content-Type": "application/json" },
    //       credentials: "include",
    //     })
    //       .then((response) => response.json())
    //       .then((data) => {
    //         var resp = data;

    //         if (data) {
    //           this.tablaActivos = data["resultado"]
    //           this.tablaActivos.forEach(element => {
    //               element.campoDisplay="Nombre: " +element.nombre +" - Código "+element.codigo
    //           });
    //           //console.log(this.tablaDatos)
    //         } else {
    //           //this.$router.push("/login")
    //           this.tablaActivos = [];
    //         }
    //       });
    //   } catch (e) {
    //     //this.$store.dispatch("setAuth", false);
    //   }
    // },

    fetchTipoMantenimiento() {
      try {
        fetch("http://localhost:3000/API/TipoMantenimiento", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        })
          .then((response) => response.json())
          .then((data) => {
            var resp = data;

            if (data) {
              this.tablaTipoMantenimiento = data["resultado"];
              //console.log(this.tablaDatos)
            } else {
              //this.$router.push("/login")
              this.tablaTipoMantenimiento = [];
            }
          });
      } catch (e) {
        //this.$store.dispatch("setAuth", false);
      }
    },

    createFunction() {
      this.showModalCreateEdit = true;
      this.isAdd = true;
    },
    submit() {
      if (this.isAdd) {
        fetch("http://localhost:3000/API/"+this.prefixRuta, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            //agregar campos a crear @todo cambiar11
            
            descripcion: this.inputDescripcion,
            //fechaInicio: this.inputFechaInicio,
            //semanaInicial: this.inputSemanaInicial,
            //idActivo: this.inputActivo.id,
            //idTrabajadorResponsable: this.inputTrabajador.id,
            idPeriodicidad: this.inputPeriodicidad.id,
            idEstadoMantenimiento: this.inputEstadoMantenimiento.id,
            idTipoMantenimiento: this.inputTipoMantenimiento.id,
            costoHora: this.inputCostoHora,
            numeroResponsables: this.inputNumeroResponsables,
            horasHombre: this.inputHorasHombre,

          }),
        })
          .then((response) => response.json())
          .then((data) => {
            var resp = data.message;
            console.log(resp);

            //encerar valores @todo cambiar12
            this.inputDescripcion=null,
            this.inputFechaInicio=null,
            this.inputSemanaInicial=null,
            this.inputActivo=null,
            this.inputTrabajador=null,
            this.inputPeriodicidad=null,
            this.inputEstadoMantenimiento=null,
            this.inputTipoMantenimiento=null,
            this.inputBuscarActivo="",
            this.inputBuscarTrabajador="",
            this.inputBuscarPeriodicidad="",
            this.inputBuscarEstadoMantenimiento="",
            this.inputBuscarTipoMantenimiento="",
            //cerrar modal
            this.isAdd = false;
            this.isEdit = false;

            this.showModalCreateEdit = false;
            this.$buefy.dialog.alert("Tarea agregada correctamente"); //@todo cambiar13

            this.fetchDatos();
          });
      } else if (this.isEdit) {
        fetch(
          "http://localhost:3000/API/"+this.prefixRuta+"/" + this.idSeleccionado.toString(),
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              //agregar campos editados @todo cambiar14
              descripcion: this.inputDescripcion,
            //fechaInicio: this.inputFechaInicio,
            //semanaInicial: this.inputSemanaInicial,
            //idActivo: this.inputActivo.id,
            //idTrabajadorResponsable: this.inputTrabajador.id,
            idPeriodicidad: this.inputPeriodicidad.id,
            idEstadoMantenimiento: this.inputEstadoMantenimiento.id,
            idTipoMantenimiento: this.inputTipoMantenimiento.id,
            costoHora: this.inputCostoHora,
            numeroResponsables: this.inputNumeroResponsables,
            horasHombre: this.inputHorasHombre,
            }),
          }
        )
          .then((response) => response.json())
          .then((data) => {
            var resp = data.message;
            //encerar valores @todo cambiar15
            this.inputDescripcion=null,
            this.inputFechaInicio=null,
            this.inputSemanaInicial=null,
            this.inputActivo=null,
            this.inputTrabajador=null,
            this.inputPeriodicidad=null,
            this.inputEstadoMantenimiento=null,
            this.inputTipoMantenimiento=null,
            this.inputBuscarActivo="",
            this.inputBuscarTrabajador="",
            this.inputBuscarPeriodicidad="",
            this.inputBuscarEstadoMantenimiento="",
            this.inputBuscarTipoMantenimiento="",
            
            this.showModalCreateEdit = false;
            this.$buefy.dialog.alert("Tarea editada correctamente");
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
        this.inputDescripcion=row.descripcion
        this.inputFechaInicio=new Date(row.fechaInicio)
        this.inputSemanaInicial=row.semanaInicial
        // this.inputActivo=,
        // this.inputTrabajador=null,
        // this.inputPeriodicidad=null,
        // this.inputEstadoMantenimiento=null,
        // this.inputTipoMantenimiento=null,
        console.log(row)
        //this.inputActivo=row.idActivo
        //this.inputBuscarActivo="Nombre: " +row.Activo.nombre +" - Código "+row.Activo.codigo
        //this.inputTrabajador=row.Trabajador
        //this.inputBuscarTrabajador=row.Trabajador.nombres +" "+row.Trabajador.apellidos
        this.inputPeriodicidad=row.Periodicidad
        this.inputBuscarPeriodicidad=row.Periodicidad.descripcion
        this.inputEstadoMantenimiento=row.EstadoMantenimiento
        this.inputBuscarEstadoMantenimiento=row.EstadoMantenimiento.descripcion
        this.inputTipoMantenimiento=row.TipoMantenimiento
        this.inputBuscarTipoMantenimiento=row.TipoMantenimiento.descripcion
        
      //id Editar @todo cambiar17
      this.idSeleccionado = row.id;
      //mostrar modal
      this.showModalCreateEdit = true;
      this.isAdd = false;
      this.isEdit = true;
    },
    deleteFunction(row) {
      const idDel = row.id;
      fetch("http://localhost:3000/API/"+this.prefixRuta+"/" + idDel.toString(), {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          var resp = data.message;
          //limpiar campos form @todo cambiar18
          this.inputDescripcion=null,
            //this.inputFechaInicio=null,
            //this.inputSemanaInicial=null,
            //this.inputActivo=null,
            //this.inputTrabajador=null,
            this.inputPeriodicidad=null,
            this.inputEstadoMantenimiento=null,
            this.inputTipoMantenimiento=null,
            //this.inputBuscarActivo="",
            //this.inputBuscarTrabajador="",
            //this.inputBuscarPeriodicidad="",
            this.inputBuscarEstadoMantenimiento="",
            this.inputBuscarTipoMantenimiento="",
          //cerrar form
          this.isAdd = false;
          this.isEdit = false;

          this.showModalCreateEdit = false;
          this.$buefy.dialog.alert("Tarea eliminada correctamente"); //@todo cambiar19
          //llamar fetch
          this.fetchDatos();
        });
    },
  },
};
</script>

<style>
@media print
{
    .no-print, .no-print *
    {
        display: none !important;
    }
}
</style>