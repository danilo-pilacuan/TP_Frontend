<template>
  <div id="users" class="home" v-if="ordenTrabajoCreada"> 
    <hero-bar>
        <!-- @todo cambiar1 -->
      Tareas Orden
      <!-- <b-button slot="right" class="no-print" type="is-primary" @click="createFunction" v-if="tipoUsuario==1">Crear</b-button> -->
    </hero-bar>
    <card-component
    class="no-print"
            title="Escoger Tarea"
            icon="account"
            v-if="tipoUsuario==1"
          >
            <div class="columns">
              <div class="column is-10">
                <b-autocomplete
                v-model="inputBuscarTarea"
                placeholder="Seleccionar Tarea"
                :keep-first="false"
                :open-on-focus="true"
                :data="filterTareas"
                field="descripcion"
                @select="option => (inputTarea = option)"
                :clearable="true"
                
            >
            </b-autocomplete>
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
            <b-field label="Semana Inicial">
              <b-numberinput v-model="inputSemanaInicial" placeholder="0"></b-numberinput>
            </b-field>    
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
                    <b-numberinput v-model="inputHorasHombre" step="0.01" placeholder="0"></b-numberinput>
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
              </div>
            </div>
            <b-button
              rounded
              type="is-link"
              icon-left="plus"
              @click="addTareaToOrden"
              class="mt-2"
            >Agregar Tarea
            </b-button>
              </div>
              <div class="column  is-2">
                <b-button
              rounded
              type="is-primary"
              icon-left="plus"
              @click="createFunction"
              class="mt-2"
              v-if="tipoUsuario==1"
            >Crear Tarea
            </b-button>

              </div>
            </div>
          </card-component>
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
          :paginated="false"
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
                  class="no-print"
                />
              </template>
              <template v-slot="props">
                <div v-if="typeof props.row[column.field] === 'object'">
                  <div v-if="typeof props.row[column.field][column.subField] === 'object'">
                    {{ props.row[column.field][column.subField][column.subSubField] }}
                  </div>  
                  <div v-else>
                    {{ props.row[column.field][column.subField] }}
                  </div>
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
                :disabled="tipoUsuario==2"
              >
              </b-button>
            </div>
          </b-table-column>
          <template #footer>
            <div class="columns">
              <div class="column is-8">

              </div>
              <div class="column is-3">
                <div class="has-text-right">
                    <strong>Total Tareas: </strong>
                    {{costoGeneralTareas.toFixed(2)}}
            </div>
              </div>
              <div class="column is-1">

              </div>
            </div>
            </template>
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
                  <b-input v-model="inputDescripcion" :disabled="this.isEdit"></b-input>
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
                    <b-numberinput v-model="inputHorasHombre" step="0.01" placeholder="0"></b-numberinput>
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
            <b-field label="Semana Inicial">
              <b-numberinput v-model="inputSemanaInicial" placeholder="0"></b-numberinput>
            </b-field>    
            
            

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
import CardComponent from '@/components/CardComponent.vue'

export default {
    components: {
    HeroBar,
    CardComponent
  },
  props:{
    ordenTrabajoCreada: Object
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
        filterTareas(){
            if(this.tablaTareasGeneral)
            {
                return this.tablaTareasGeneral.filter((option) => {
                    return option.descripcion
                        .toString()
                        .toLowerCase()
                        .indexOf(this.inputBuscarTarea.toLowerCase()) >= 0
                })
            }
            else
            {
                return []
            }
        },
        filterPeriodicidad() {
            if(this.tablaPeriodicidades)
            {
                return this.tablaPeriodicidades.filter((option) => {
                    return option.descripcion
                        .toString()
                        .toLowerCase()
                        .indexOf(this.inputBuscarPeriodicidad.toLowerCase()) >= 0
                })
            }
            else
            {
                return []
            }
        },
        filterEstadoMantenimiento() {
            if(this.tablaEstadoMantenimiento)
            {
                return this.tablaEstadoMantenimiento.filter((option) => {
                    return option.descripcion
                        .toString()
                        .toLowerCase()
                        .indexOf(this.inputBuscarEstadoMantenimiento.toLowerCase()) >= 0
                })
            }
            else
            {
                return []
            }
        },
        filterTipoMantenimiento() {
            if(this.tablaTipoMantenimiento)
            {
                return this.tablaTipoMantenimiento.filter((option) => {
                    return option.descripcion
                        .toString()
                        .toLowerCase()
                        .indexOf(this.inputBuscarTipoMantenimiento.toLowerCase()) >= 0
                })
            }
            else
            {
                return []
            }
        },
        
    },
  data() {
    return {
        //prefijo ruta @todo cambiar3ç
        tipoUsuario:1,
        costoGeneralTareas:0,
      prefixRuta: "Tareas",
      //nombres campos @todo cambiar4
      tareaCreada:null,
       
        inputDescripcion:null,
        inputFechaInicio:null,
        inputSemanaInicial:null,

        inputActivo:null,
        inputTrabajador:null,      
        inputPeriodicidad:null,    
        inputEstadoMantenimiento:null,
        inputTipoMantenimiento:null,

        inputTarea:null,


        inputCostoHora:null,
        inputHorasHombre:null,
        inputNumeroResponsables:null,
        

        inputBuscarTarea:"",
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
          field: "Tarea",
          subField: "descripcion",
          label: "Descripcion",
          searchable: true
        },
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
        },
        {
          field: "costoTarea",
          label: "Costo Total Tarea",
          searchable: true
        },
        
      ],
      //tablas auxiliares @todo cambiar8
      tablaTrabajadores: [],
      tablaTareasGeneral: [],
      tablaTareasOrden: [],
      tablaPeriodicidades: [],
      tablaEstadoMantenimiento: [],
      tablaActivos: [],
      tablaTipoMantenimiento: [],
      //auxiliares modal
      isAdd: false,
      isEdit: false,
      rowEdit:null,

      showModalCreateEdit: false,
      showModalDelete: false,

      //control errores validacion
      nombreNotAvailable: false,
      nombreHasErrors: false,
      nombreTooShort: false,
    };
  },
  watch:{
      ordenTrabajoCreada: function(val){
        this.fetchDatos();
      },
      showModalCreateEdit: function(val){
        if(this.showModalCreateEdit==false)
        {
          this.inputDescripcion=null
        this.inputFechaInicio=null
        this.inputSemanaInicial=""
        this.inputActivo=null
        this.inputTrabajador=null
        this.inputPeriodicidad=null
        this.inputEstadoMantenimiento=null
        this.inputTipoMantenimiento=null
        this.inputBuscarActivo=""
        this.inputBuscarTrabajador=""
        this.inputBuscarPeriodicidad=""
        this.inputBuscarEstadoMantenimiento=""
        this.inputBuscarTipoMantenimiento=""
        this.inputCostoHora=null
        this.inputNumeroResponsables=null
        this.inputHorasHombre=null
        }
      }
  },
  mounted() {
    //llamados fetch @todo cambiar9
    this.authLogin();
    this.fetchDatos()
    //this.fetchTrabajadores()
    this.fetchPeriodicidades()
    this.fetchEstadosMantenimiento()
    //this.fetchActivos()
    this.fetchTipoMantenimiento()
    this.fetchTareasGeneral()
    
  },
  methods: {
    authLogin() {
      try {

        fetch(process.env.VUE_APP_TITLE+"API/usuarios/authLogin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        })
          .then((response) => response.json())
          .then((data) => {
            var resp = data;
            console.log("Authlogin ")
            console.log(resp);
            this.tipoUsuario=resp.resultado.tipoUsuario
            
          });
      } catch (e) {
        this.$store.dispatch("setAuth", false);
      }
    },
    addTareaToOrden(){
        if(this.inputTarea && this.ordenTrabajoCreada && this.inputFechaInicio && this.inputSemanaInicial)
        {
            //this.$buefy.dialog.alert("Tarea agregada correctamente"); 
            fetch(process.env.VUE_APP_TITLE+"API/ordenTareas", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            //agregar campos a crear @todo cambiar11
            idPeriodicidad: this.inputPeriodicidad.id,
            idEstadoMantenimiento: this.inputEstadoMantenimiento.id,
            idTipoMantenimiento: this.inputTipoMantenimiento.id,
            costoHora: this.inputCostoHora,
            numeroResponsables: this.inputNumeroResponsables,
            horasHombre: this.inputHorasHombre,

            fechaSolicitud:this.inputFechaInicio,
            semanaInicial:this.inputSemanaInicial,
            idTarea:this.inputTarea.id,
            idOrden:this.ordenTrabajoCreada.id

          }),
          })
            .then((response) => response.json())
            .then((data) => {
              var resp = data["resultado"];
              this.tareaCreada=resp;
              console.log(resp);

              this.inputBuscarTarea=""
              this.inputTarea=null

              this.inputFechaInicio=null
              this.inputSemanaInicial=null

              this.showModalCreateEdit = false;
              this.$buefy.dialog.alert("Tarea agregada correctamente");

              this.fetchDatos();
            });
        }
        else
        {
          if(!this.inputFechaInicio)
          {
            this.$buefy.dialog.alert("Ingrese Fecha Inicio"); 
          }
          else if(!this.inputSemanaInicial)
          {
            this.$buefy.dialog.alert("Ingrese Semana Inicial"); 
          }
          else if(!this.inputTarea)
          {
            this.$buefy.dialog.alert("Seleccione una tarea"); 
          }
          else if(!this.ordenTrabajoCreada)
          {
            this.$buefy.dialog.alert("Seleccione una orden de trabajo"); 
          }
        }
    },
    fetchDatos() {
      try {
          //console.log(process.env.VUE_APP_TITLE+"API/ordenTareas/orden/"+this.ordenTrabajoCreada.id)
        fetch(process.env.VUE_APP_TITLE+"API/ordentrabajo/"+this.ordenTrabajoCreada.id, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        })
          .then((response) => response.json())
          .then((data) => {
            var resp = data;

            if (data) {
              this.tablaDatos = data["resultado"].Orden_Tareas;

              this.tablaDatos.forEach(element => {
                
                  // var auxCostoTareas=0;
                  // var auxCostoMateriales=0;
                  // element.Tareas.forEach(tarea => {
                  //     auxCostoTareas=auxCostoTareas+(tarea.Orden_Tarea.numeroResponsables*tarea.Orden_Tarea.horasHombre*parseFloat(tarea.Orden_Tarea.costoHora))
                  // });
                  // element.Materials.forEach(material => {
                  //     auxCostoMateriales=auxCostoMateriales+(parseFloat(material.Orden_Material.cantidad)*parseFloat(material.precioUnitario))
                  // });
                  // element.costoTareas=auxCostoTareas.toFixed(2);
                  // element.costoMateriales=auxCostoMateriales.toFixed(2);
                  var costoTarea=0;
                  costoTarea=element.numeroResponsables*element.horasHombre*parseFloat(element.costoHora)
                  
                  element.costoTarea=costoTarea;
                  element.costoTarea=Math.round(element.costoTarea*100)/100
                  this.costoGeneralTareas=this.costoGeneralTareas+element.costoTarea;
                  console.log("TTT")
                  console.log(element)
              });


              console.log(this.tablaDatos)
            } else {
              //this.$router.push("/login")
              this.tablaDatos = [];
            }
          });
      } catch (e) {
        //this.$store.dispatch("setAuth", false);
      }
    },
    
    fetchPeriodicidades() {
      try {
        fetch(process.env.VUE_APP_TITLE+"API/Periodicidades", {
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
    fetchTareasGeneral() {
      try {
        fetch(process.env.VUE_APP_TITLE+"API/Tareas", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        })
          .then((response) => response.json())
          .then((data) => {
            var resp = data;

            if (data) {
              this.tablaTareasGeneral = data["resultado"];
              //console.log(this.tablaDatos)
            } else {
              //this.$router.push("/login")
              this.tablaTareasGeneral = [];
            }
          });
      } catch (e) {
        //this.$store.dispatch("setAuth", false);
      }
    },

    fetchEstadosMantenimiento() {
      try {
        fetch(process.env.VUE_APP_TITLE+"API/estadomantenimiento", {
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
    fetchTipoMantenimiento() {
      try {
        fetch(process.env.VUE_APP_TITLE+"API/TipoMantenimiento", {
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
      this.inputSemanaInicial=""
      this.showModalCreateEdit = true;
      this.isAdd = true;
      this.isEdit=false;
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
            //fechaInicio: this.inputFechaInicio,
            //semanaInicial: this.inputSemanaInicial,
            //idActivo: this.inputActivo.id,
            //idTrabajadorResponsable: this.inputTrabajador.id,
            

          }),
        })
          .then((response) => response.json())
          .then((data) => {
            var resp = data["resultado"];
            this.inputTarea=resp;
            console.log(resp);
            this.addTareaToOrden()
            //@todo addCreatedTask
            

            this.inputDescripcion=null,
            this.inputFechaInicio=null,
            this.inputSemanaInicial="",
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
            //this.$buefy.dialog.alert("Tarea agregada correctamente"); //@todo cambiar13

            this.fetchDatos();
          });
      } else if (this.isEdit) {
        if(this.inputTarea && this.ordenTrabajoCreada && this.inputFechaInicio && this.inputSemanaInicial)
        {
            //this.$buefy.dialog.alert("Tarea agregada correctamente"); 
            fetch(process.env.VUE_APP_TITLE+"API/ordenTareas/byot", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            //agregar campos a crear @todo cambiar11
            idTarea:this.rowEdit.idTarea,
            idOrden:this.rowEdit.idOrden,

            idPeriodicidad: this.inputPeriodicidad.id,
            idEstadoMantenimiento: this.inputEstadoMantenimiento.id,
            idTipoMantenimiento: this.inputTipoMantenimiento.id,
            costoHora: this.inputCostoHora,
            numeroResponsables: this.inputNumeroResponsables,
            horasHombre: this.inputHorasHombre,

            fechaSolicitud:this.inputFechaInicio,
            semanaInicial:this.inputSemanaInicial,
            idTarea:this.inputTarea.id,
            idOrden:this.ordenTrabajoCreada.id

          }),
          })
            .then((response) => response.json())
            .then((data) => {
              var resp = data["resultado"];
              this.tareaCreada=resp;
              console.log(resp);

              this.inputBuscarTarea=""
              this.inputTarea=null

              this.inputFechaInicio=null
              this.inputSemanaInicial=null

              this.showModalCreateEdit = false;
              this.$buefy.dialog.alert("Tarea editada correctamente");

              this.fetchDatos();
            });
        }
        else
        {
          if(!this.inputFechaInicio)
          {
            this.$buefy.dialog.alert("Ingrese Fecha Inicio"); 
          }
          else if(!this.inputSemanaInicial)
          {
            this.$buefy.dialog.alert("Ingrese Semana Inicial"); 
          }
          else if(!this.inputTarea)
          {
            this.$buefy.dialog.alert("Seleccione una tarea"); 
          }
          else if(!this.ordenTrabajoCreada)
          {
            this.$buefy.dialog.alert("Seleccione una orden de trabajo"); 
          }
        }
      }
    },
    verFichaEquipo(row){
      var idActivo=row.id
      this.$router.push("/Equipos/"+idActivo);
    },
    editFunction(row) {
      //obtener valores para editar en form @todo cambiar16
      console.log("EDITTTT")
      console.log(row)
      this.inputTarea=row.Tarea
      this.rowEdit=row
        this.inputDescripcion=row.Tarea.descripcion
        this.inputFechaInicio=new Date(row.fechaSolicitud)
        this.inputSemanaInicial=row.semanaInicial
        this.inputNumeroResponsables=row.numeroResponsables
        this.inputHorasHombre=row.horasHombre
        this.inputCostoHora=row.costoHora
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
      const rowDel = row;
      console.log("DELDELDELDEL")
      console.log(rowDel)

      fetch(process.env.VUE_APP_TITLE+"API/ordenTareas/byot",
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              idTarea:rowDel.idTarea,
              idOrden:rowDel.idOrden
            
            }),
          }
        )
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
</style>