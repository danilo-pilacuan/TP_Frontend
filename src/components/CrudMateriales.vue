<template>
  <div id="users" class="home">
    <hero-bar>
        <!-- @todo cambiar1 -->
      Materiales
      <b-button slot="right" type="is-primary" @click="createFunction" v-if="tipoUsuario==1">Crear</b-button>
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
              <b-button
                rounded
                type="is-warning"
                icon-left="pencil"
                @click="editFunction(props.row)"
                :disabled="tipoUsuario==2"
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
                  <b-input v-model="inputPrecioUnitario"></b-input>
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

export default {
    components: {
    HeroBar
  },
  props:{
    ordenTrabajo: Object
  },
  computed: {
        
    },
  data() {
    return {
      tipoUsuario:1,
        //prefijo ruta @todo cambiar3
      prefixRuta: "Materiales",
      //nombres campos @todo cambiar4
       
        inputDescripcion:null,
        inputPrecioUnitario:null,
        inputUnidad:null,

        
      
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
      ordenTrabajo: function(val){
        this.fetchDatos();
      }
  },
  mounted() {
    //llamados fetch @todo cambiar9
    this.authLogin();
    this.fetchDatos()
    
    
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
    fetchDatos() {
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
            var resp = data.message;
            console.log(resp);

            //encerar valores @todo cambiar12
            this.inputDescripcion=null,
            this.inputPrecioUnitario=null,
            this.inputUnidad=null,

            //cerrar modal
            this.isAdd = false;
            this.isEdit = false;

            this.showModalCreateEdit = false;
            this.$buefy.dialog.alert("Material agregado correctamente"); //@todo cambiar13

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
            this.inputPrecioUnitario=null,
            this.inputUnidad=null,
            

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