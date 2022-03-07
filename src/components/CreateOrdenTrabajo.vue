<template>
  <div id="users" class="home">
    <!-- <hero-bar>
      Crear Orden de Trabajo
    </hero-bar> -->
    <div class="container">
      <div class="block">
        <div class="columns">
          <!-- <div class="column is-2">
        </div> -->
          <div class="column">
            <section>
              <b-field label="Número de Orden">
                <b-input
                  v-model="inputNumero"
                  :disabled="desactivarInputs"
                ></b-input>
              </b-field>

              <b-field label="Fecha Orden">
                <b-datepicker
                  v-model="inputFechaOrden"
                  :show-week-number="true"
                  :locale="undefined"
                  placeholder="Seleccionar fecha..."
                  icon="calendar-today"
                  :icon-right="inputFechaOrden ? 'close-circle' : ''"
                  icon-right-clickable
                  @icon-right-click="inputFechaOrden = null"
                  trap-focus
                  :disabled="desactivarInputs"
                >
                </b-datepicker>
              </b-field>

              <b-field label="Taller">
                <b-autocomplete
                  v-model="inputBuscarTaller"
                  placeholder="Seleccionar Taller"
                  :keep-first="false"
                  :open-on-focus="true"
                  :data="filterTalleres"
                  field="descripcion"
                  @select="(option) => (inputTaller = option)"
                  :clearable="true"
                  :disabled="desactivarInputs"
                >
                </b-autocomplete>
              </b-field>

              <b-field label="Área">
                <b-autocomplete
                  v-model="inputBuscarArea"
                  placeholder="Seleccionar Área"
                  :keep-first="false"
                  :open-on-focus="true"
                  :data="filterAreas"
                  field="descripcion"
                  @select="(option) => (inputArea = option)"
                  :clearable="true"
                  :disabled="desactivarInputs"
                >
                </b-autocomplete>
              </b-field>

              <b-field label="Activo">
                <b-autocomplete
                  v-model="inputBuscarActivo"
                  placeholder="Seleccionar Activo"
                  :keep-first="false"
                  :open-on-focus="true"
                  :data="filterActivos"
                  field="campoDisplay"
                  @select="(option) => (inputActivo = option)"
                  :clearable="true"
                  :disabled="desactivarInputs"
                >
                </b-autocomplete>
              </b-field>

              <b-field label="Solicitante">
                <b-autocomplete
                  v-model="inputBuscarTrabajador"
                  placeholder="Seleccionar Trabajador"
                  :keep-first="false"
                  :open-on-focus="true"
                  :data="filterTrabajadores"
                  field="campoDisplay"
                  @select="(option) => (inputTrabajador = option)"
                  :clearable="true"
                  :disabled="desactivarInputs"
                >
                </b-autocomplete>
              </b-field>

              <b-field label="Observaciones">
                <b-input
                  v-model="inputObservaciones"
                  :disabled="desactivarInputs"
                ></b-input>
              </b-field>

              <b-field>
                <p class="control no-print">
                  <b-button
                    label="Crear Orden"
                    type="is-primary"
                    @click="crearOrdenTrabajo"
                  />
                </p>
              </b-field>
            </section>
          </div>

        </div>
        <div class="columns">
            <div class="column">
              <CrudTareasOrden :ordenTrabajoCreada="ordenCreada"/>
          </div>
        </div>
        <div class="columns">
            <div class="column">
              <CrudMaterialesOrden :ordenTrabajoCreada="ordenCreada"/>
          </div>
        </div>
        <div class="columns">
            <div class="column is-half">
                <b-button type="is-link" @click="regresarMantenimiento" class="no-print">Regresar</b-button>
            </div>
            <div class="column is-half">
                <b-button type="is-success" @click="imprimirPagina" class="no-print">Imprimir</b-button>
            </div>
        </div>
      </div> 
    </div>
  </div>
</template>

<script>
import HeroBar from "@/components/HeroBar.vue";
import CrudTareasOrden from "@/components/CrudTareasOrden.vue";
import CrudMaterialesOrden from "@/components/CrudMaterialesOrden.vue";

export default {
  components: {
    HeroBar,
    CrudTareasOrden,
    CrudMaterialesOrden
  },
  computed: {
    filterActivos() {
      if(this.tablaActivos)
      {
        return this.tablaActivos.filter((option) => {
        return (
          option.nombre
            .toString()
            .toLowerCase()
            .indexOf(this.inputBuscarActivo.toLowerCase()) >= 0
        );
      });
      }
      else
      {
        return []
      }
    },
    filterTrabajadores() {
      if(this.tablaTrabajadores)
      {
        return this.tablaTrabajadores.filter((option) => {
        return (
          option.apellidos
            .toString()
            .toLowerCase()
            .indexOf(this.inputBuscarTrabajador.toLowerCase()) >= 0
        );
      });
      }
      else
      {
        return []
      }
    },
    filterTalleres() {
      if(this.tablaTalleres)
      {
        return this.tablaTalleres.filter((option) => {
        return (
          option.descripcion
            .toString()
            .toLowerCase()
            .indexOf(this.inputBuscarTaller.toLowerCase()) >= 0
        );
      });
      }
      else
      {
        return []
      }
    },
    filterAreas() {
      if(this.tablaAreas)
      {
        return this.tablaAreas.filter((option) => {
        return (
          option.descripcion
            .toString()
            .toLowerCase()
            .indexOf(this.inputBuscarArea.toLowerCase()) >= 0
        );
      });
      }
      else
      {
        return []
      }
    },
  },
  data() {
    return {
      //prefijo ruta @todo cambiar3
      prefixRuta: "ordentrabajo",
      //nombres campos @todo cambiar4
      desactivarInputs: false,

      inputFechaOrden: null,
      inputNumero: null,
      inputObservaciones: null,

      inputActivo: null,
      inputTrabajador: null,
      inputTaller: null,
      inputArea: null,

      inputBuscarActivo: "",
      inputBuscarTrabajador: "",
      inputBuscarTaller: "",
      inputBuscarArea: "",

      ordenCreada: null,

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
        {
          field: "Taller",
          subField: "descripcion",
          label: "Taller",
          searchable: true,
        },
        {
          field: "Area",
          subField: "descripcion",
          label: "Área",
          searchable: true,
        },
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
      ],
      //tablas auxiliares @todo cambiar8
      tablaTrabajadores: [],
      tablaActivos: [],
      tablaTalleres: [],
      tablaAreas: [],

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

    this.fetchTrabajadores();
    this.fetchActivos();
    this.fetchAreas();
    this.fetchTalleres();
  },
  methods: {
    regresarMantenimiento(){
        this.$router.push("/Mantenimiento");
    },
    imprimirPagina(){
        window.print();
    },
    crearOrdenTrabajo(){
        this.submit();
    },
    fetchTrabajadores() {
      try {
        fetch("http://localhost:3000/API/trabajadores", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        })
          .then((response) => response.json())
          .then((data) => {
            var resp = data;

            if (data) {
              this.tablaTrabajadores = data["resultado"];
              //this.tablaActivos.forEach(element => console.log(element.nombre));
              this.tablaTrabajadores.forEach((element) => {
                element.campoDisplay =
                  element.nombres + " " + element.apellidos;
              });
            } else {
              //this.$router.push("/login")
              this.tablaTrabajadores = [];
            }
          });
      } catch (e) {
        //this.$store.dispatch("setAuth", false);
      }
    },

    fetchActivos() {
      try {
        fetch("http://localhost:3000/API/Activos", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        })
          .then((response) => response.json())
          .then((data) => {
            var resp = data;

            if (data) {
              this.tablaActivos = data["resultado"];
              this.tablaActivos.forEach((element) => {
                element.campoDisplay =
                  "Nombre: " + element.nombre + " - Código " + element.codigo;
              });
              //console.log(this.tablaDatos)
            } else {
              //this.$router.push("/login")
              this.tablaActivos = [];
            }
          });
      } catch (e) {
        //this.$store.dispatch("setAuth", false);
      }
    },
    fetchAreas() {
      try {
        fetch("http://localhost:3000/API/Areas", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        })
          .then((response) => response.json())
          .then((data) => {
            var resp = data;

            if (data) {
              this.tablaAreas = data["resultado"];
              //console.log(this.tablaDatos)
            } else {
              //this.$router.push("/login")
              this.tablaAreas = [];
            }
          });
      } catch (e) {
        //this.$store.dispatch("setAuth", false);
      }
    },
    fetchTalleres() {
      try {
        fetch("http://localhost:3000/API/taller", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        })
          .then((response) => response.json())
          .then((data) => {
            var resp = data;

            if (data) {
              this.tablaTalleres = data["resultado"];

              //console.log(this.tablaDatos)
            } else {
              //this.$router.push("/login")
              this.tablaTalleres = [];
            }
          });
      } catch (e) {
        //this.$store.dispatch("setAuth", false);
      }
    },

    //Fetchs adicionales @todo cambiar10


    submit() {

        fetch("http://localhost:3000/API/" + this.prefixRuta, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            //agregar campos a crear @todo cambiar11

            numero: this.inputNumero,
            fechaOrden: this.inputFechaOrden,
            idTaller: this.inputTaller.id,
            idArea: this.inputArea.id,
            idActivo: this.inputActivo.id,
            observaciones: this.inputObservaciones,
            idSolicitante: this.inputTrabajador.id,

          }),
        })
          .then((response) => response.json())
          .then((data) => {
            var resp = data.resultado;
            console.log(resp);

            this.ordenCreada=resp;
            this.desactivarInputs=true;
            this.$buefy.dialog.alert(
              "Orden de trabajo creada correctamente, agregar tareas y materiales"
            ); //@todo cambiar13


          });

    },
    verFichaEquipo(row) {
      var idActivo = row.id;
      this.$router.push("/Equipos/" + idActivo);
    },
    editFunction(row) {
      //obtener valores para editar en form @todo cambiar16
      (this.inputDescripcion = row.descripcion),
        //id Editar @todo cambiar17
        (this.idSeleccionado = row.id);
      //mostrar modal
      this.showModalCreateEdit = true;
      this.isAdd = false;
      this.isEdit = true;
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