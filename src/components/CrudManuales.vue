<template>
  <div id="users" class="home">
    <div class="container">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">Manuales</p>
          <b-button slot="right" class="mt-1 mb-1 mx-1" type="is-primary" @click="createFunction">Cargar</b-button>
        </header>
        <div class="card-content">
          <b-table
            :data="tablaDatos"
            :bordered="true"
            :striped="true"
            :narrowed="true"
            :hoverable="false"
            :loading="false"
            :focusable="true"
            :mobile-cards="false"
            :searchable="true"
            :paginated="true"
            :per-page="3"
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
                <slot name="addButtons"></slot>
                <b-button
                  rounded
                  type="is-link"
                  icon-left="eye"
                  @click="gotoLink(props.row.url)"
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

    <b-modal v-model="showModalCreateEdit">
      <form @submit.prevent="submit">
        <!-- <b-checkbox v-model="hasError">Show errors</b-checkbox> -->
        <div class="modal-card" style="width: auto">
          <header class="modal-card-head">
            <p class="modal-card-title">Crear {{ prefixRuta }}</p>
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
                  label="Nombre"
                  :type="{ 'is-danger': nombreHasErrors }"
                  :message="[
                    { 'Username is not available': nombreNotAvailable },
                    { 'Username is too short': nombreTooShort },
                  ]"
                >
                  <b-input v-model="inputNombre"></b-input>
                </b-field>
              </div>
            </div>

            <b-field class="file is-primary" :class="{'has-name': !!file}">
                <b-upload v-model="file" class="file-label" @input="cargarManual">
                    <span class="file-cta">
                        <b-icon class="file-icon" icon="upload"></b-icon>
                        <span class="file-label">Cargar archivo</span>
                    </span>
                    <span class="file-name" v-if="file">
                        {{ file.name }}
                    </span>
                </b-upload>
            </b-field>

            
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
                <b-button
                  type="is-danger"
                  @click="showModalCreateEdit = false"
                  label="Cancelar"
                />
              </div>
            </div>
          </footer>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
import HeroBar from "@/components/HeroBar.vue";

export default {
  components: {
    HeroBar,
  },
  props: {
    idActivo: String
  },
  data() {
    return {
      //prefijo ruta @todo cambiar3
      file: null,
      prefixRuta: "manuales",
      //nombres campos @todo cambiar4
      inputNombre: null,

      //info entidad @todo cambiar5

      //tablas Datos @todo cambiar6
      tablaDatos: [],
      //columnas tabla Datos @todo cambiar7
      columns: [
        {
          field: "nombre",
          label: "Nombre",
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

    this.fetchDatos();
  },
  methods: {
    gotoLink(url){
        window.open("http://localhost:3000/"+url)
    },
    cargarManual(e){
        this.file.value = e
    },
    fetchDatos() {
        console.log("http://localhost:3000/API/manuales/activo/" + this.idActivo)
      try {
        fetch("http://localhost:3000/API/manuales/activo/" + this.idActivo, {
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

          let formData = new FormData()
      formData.append('idActivo',this.idActivo)
      formData.append('manual', this.file.value)
      formData.append('nombre',this.inputNombre)

     ///////////////////////////////////

    fetch("http://localhost:3000/API/manuales", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            var resp = data.resultado;
            this.file = null
            console.log(resp);  

            this.inputNombre = null;
            this.file = null;

            this.isAdd = false;
            this.isEdit = false;

            this.showModalCreateEdit = false;

            //emit('upload', value);
            //this.$emit('upload')
            this.$buefy.dialog.alert("Archivo cargado correctamente"); 
            this.fetchDatos();


          });

      } 
    },
    deleteFunction(row) {
      const idDel = row.id;
      fetch(
        "http://localhost:3000/API/" + this.prefixRuta + "/" + idDel.toString(),
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      )
        .then((response) => response.json())
        .then((data) => {
          var resp = data.message;
          //limpiar campos form @todo cambiar18
          this.inputNombre = null;
          this.file = null;
          //cerrar form
          this.isAdd = false;
          this.isEdit = false;

          this.showModalCreateEdit = false;
          this.$buefy.dialog.alert("Archivo eliminado correctamente"); //@todo cambiar19
          //llamar fetch
          this.fetchDatos();
        });
    },
  },
};
</script>

<style>
.quitarHover {
     text-decoration: none;
     color: inherit;
 }
</style>