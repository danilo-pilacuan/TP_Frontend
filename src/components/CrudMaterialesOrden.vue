<template>
  <div id="users" class="home" v-if="ordenTrabajoCreada">
    <hero-bar>
        <!-- @todo cambiar1 -->
      Materiales Orden
      <!-- <b-button slot="right" type="is-primary" @click="createFunction">Crear</b-button> -->
    </hero-bar>
    <card-component
            title="Escoger Tarea"
            icon="account"
            class="no-print"
          >
            <div class="columns">
              <div class="column is-10">
                <b-autocomplete
                v-model="inputBuscarMaterial"
                placeholder="Seleccionar Material"
                :keep-first="false"
                :open-on-focus="true"
                :data="filterMateriales"
                field="descripcion"
                @select="option => (inputMaterial = option)"
                :clearable="true"
            >
            </b-autocomplete>
            <b-field label="Cantidad">
              
              <b-numberinput v-model="inputCantidad" step="0.01" placeholder="0"></b-numberinput>
            </b-field>    
            <b-button
              rounded
              type="is-link"
              icon-left="plus"
              @click="addMaterialToOrden"
              class="mt-2"
            >Agregar Material
            </b-button>
              </div>
              <div class="column  is-2">
                <b-button
              rounded
              type="is-primary"
              icon-left="plus"
              @click="createFunction"
              class="mt-2"
            >Crear Material
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
                  {{ props.row[column.field][column.subField] }}
                </div>
                <div v-else>
                  {{ props.row[column.field] }}
                </div>
              </template>
            </b-table-column>
          </template>
          <b-table-column field="actions" label="Acciones" v-slot="props" class="no-print">
            <div class="buttons">
              <!-- <b-button
                rounded
                type="is-warning"
                icon-left="pencil"
                @click="editFunction(props.row)"
              >
              </b-button> -->
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
            <p class="modal-card-title">Crear Material</p> 
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
                <b-field label="Unidad">
                  <b-input v-model="inputUnidad"></b-input>
                </b-field>                
              </div>
            </div>

            <div class="columns">
              <div class="column">
                <b-field label="Precio Unitario">
                  <b-numberinput v-model="inputPrecioUnitario" step="0.01" placeholder="0"></b-numberinput>
                </b-field>                
              </div>
            </div>

            <div class="columns">
              <div class="column">
                <b-field label="Cantidad">
                  <b-numberinput v-model="inputCantidad" step="0.01" placeholder="0"></b-numberinput>
                </b-field>                
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
        filterMateriales(){
            if(this.tablaMaterialesGeneral)
            {
                return this.tablaMaterialesGeneral.filter((option) => {
                    return option.descripcion
                        .toString()
                        .toLowerCase()
                        .indexOf(this.inputBuscarMaterial.toLowerCase()) >= 0
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
        //prefijo ruta @todo cambiar3
      prefixRuta: "Materiales",
      //nombres campos @todo cambiar4
       
        inputDescripcion:null,
        inputPrecioUnitario:null,
        inputUnidad:null,
        inputCantidad:0,
        inputCantidad:0,

        inputMaterial:null,
        inputBuscarMaterial:"",

        tablaMaterialesGeneral:[],
      
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
        {
          field: "unidad",
          label: "Unidad",
          searchable: true
        },
        {
          field: "precioUnitario",
          label: "Precio Unitario",
          searchable: true
        },
        {
          field: "Orden_Material",
          subField:"cantidad",
          label: "Cantidad",
          searchable: true
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
  watch:{ 
      ordenTrabajoCreada: function(val){
        this.fetchDatos();
      }
  },
  mounted() {
    //llamados fetch @todo cambiar9
    this.fetchMaterialesGeneral()
    this.fetchDatos()
    
    
  },
  methods: {
    addMaterialToOrden(){
      if(this.inputMaterial && this.ordenTrabajoCreada)
        {
            //this.$buefy.dialog.alert("Tarea agregada correctamente"); 
          if(this.inputCantidad>0)
          {
            fetch(process.env.VUE_APP_TITLE+"API/ordenMateriales", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            //agregar campos a crear @todo cambiar11
            
            cantidad:this.inputCantidad,
            idMaterial:this.inputMaterial.id,
            idOrden:this.ordenTrabajoCreada.id
            

          }),
        })
          .then((response) => response.json())
          .then((data) => {
            var resp = data["resultado"];
            this.tareaCreada=resp;
            console.log(resp);

            
            this.inputCantidad=0
            this.inputBuscarMaterial=""
            this.inputMaterial=null

            this.showModalCreateEdit = false;
            this.$buefy.dialog.alert("Material agregado correctamente"); 

            this.fetchDatos();
          });
          }
          else
          {
            this.$buefy.dialog.alert("Ingrese la cantidad del material seleccionado"); 
          }
        }
        else
        {
          this.$buefy.dialog.alert("Escoja el material a agregar"); 
        }
    },
    fetchDatos() {
      console.log("PRETRY")
      try {
        console.log(process.env.VUE_APP_TITLE+"API/ordenTareas/orden/"+this.ordenTrabajoCreada.id)
        fetch(process.env.VUE_APP_TITLE+"API/ordentrabajo/"+this.ordenTrabajoCreada.id, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        })
          .then((response) => response.json())
          .then((data) => {
            var resp = data;

            if (data) {
              this.tablaDatos = data["resultado"].Materials;
              console.log("Ordenes Tarea")
              console.log(this.tablaDatos)
            } else {
              //this.$router.push("/login")
              this.tablaDatos = [];
            }
          });
      } catch (e) {
        //this.$store.dispatch("setAuth", false);
        //console.log(e)
      }
    },
    fetchMaterialesGeneral() {
      try {
        fetch(process.env.VUE_APP_TITLE+"API/materiales/", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        })
          .then((response) => response.json())
          .then((data) => {
            var resp = data;

            if (data) { 
              this.tablaMaterialesGeneral = data["resultado"];
              //console.log(this.tablaDatos)
            } else {
              //this.$router.push("/login")
              this.tablaMaterialesGeneral = [];
            }
          });
      } catch (e) {
        //this.$store.dispatch("setAuth", false);
      }
    },
    
    //Fetchs adicionales @todo cambiar10

    createFunction() {
      this.showModalCreateEdit = true;
      this.isAdd = true;
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
            precioUnitario: this.inputPrecioUnitario,
            unidad: this.inputUnidad,


          }),
        })
          .then((response) => response.json())
          .then((data) => {
            var resp = data["resultado"];
            console.log("Resu Materiallls")
            console.log(resp);
            this.inputMaterial=resp;
            this.addMaterialToOrden();
            //encerar valores @todo cambiar12
            this.inputDescripcion=null,
            this.inputPrecioUnitario=null,
            this.inputUnidad=null,

            //cerrar modal
            this.isAdd = false;
            this.isEdit = false;

            this.showModalCreateEdit = false;
            //this.$buefy.dialog.alert("Material agregado correctamente"); //@todo cambiar13

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
                descripcion: this.inputDescripcion,
                precioUnitario: this.inputPrecioUnitario,
                unidad: this.inputUnidad,
                idOrdenTrabajo: this.ordenTrabajo.id
            }),
          }
        )
          .then((response) => response.json())
          .then((data) => {
            var resp = data.message;
            //encerar valores @todo cambiar15
            this.inputDescripcion=null,
            this.inputPrecioUnitario=null,
            this.inputUnidad=null,
            
            this.showModalCreateEdit = false;
            this.$buefy.dialog.alert("Material editado correctamente");
            //llamar fetch
            this.fetchDatos();
          });
      }
    },
    editFunction(row) {
      //obtener valores para editar en form @todo cambiar16
        this.inputDescripcion=row.descripcion,
        this.inputPrecioUnitario=row.precioUnitario,
        this.inputUnidad=row.unidad,

        
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

      fetch(process.env.VUE_APP_TITLE+"API/ordenMateriales/byom",
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              idMaterial:rowDel.Orden_Material.idMaterial,
              idOrden:rowDel.Orden_Material.idOrden
            
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
          this.$buefy.dialog.alert("Material eliminado correctamente"); //@todo cambiar19
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