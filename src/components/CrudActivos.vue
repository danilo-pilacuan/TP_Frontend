<template>
  <div id="users" class="home">
    <hero-bar>
      Activos
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
                type="is-link"
                icon-left="eye"
                @click="verFicha(props.row)"
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

    <b-modal v-model="showModalCreateEdit">
      <form @submit.prevent="submit">
        <!-- <b-checkbox v-model="hasError">Show errors</b-checkbox> -->
        <div class="modal-card" style="width: auto">
          <header class="modal-card-head">
            <p class="modal-card-title">Crear {{ nombreEntidad }}</p>
            <button
              type="button"
              class="delete"
              @click="showModalCreateEdit = false"
            />
          </header>
          <section class="modal-card-body">
            <div class="columns">
              <div class="column">
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

            <div class="columns">
              <div class="column">
                <b-field label="Etiqueta">
                  <b-input v-model="inputEtiqueta"></b-input>
                </b-field>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <b-field label="Código">
                  <b-input v-model="inputCodigo"></b-input>
                </b-field>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <b-field label="Modelo">
                  <b-input v-model="inputModelo"></b-input>
                </b-field>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <b-field label="Número de Serie">
                  <b-input v-model="inputNumSerie"></b-input>
                </b-field>
              </div>
            </div>

            <div class="columns">
              <div class="column">
                <b-field label="Área">
                  <b-select placeholder="Seleccionar Área" v-model="inputArea">
                    <option
                      v-for="option in tablaAreas"
                      :value="option.id"
                      :key="option.id"
                    >
                      {{ option.descripcion }}
                    </option>
                  </b-select>
                </b-field>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <b-field label="Prioridad (Criticidad)">
                  <b-select
                    placeholder="Seleccionar Prioridad"
                    v-model="inputPrioridad"
                  >
                    <option
                      v-for="option in tablaPrioridades"
                      :value="option.id"
                      :key="option.id"
                    >
                      {{option.codigoPrioridad}} ({{ option.denominacion }})
                    </option>
                  </b-select>
                </b-field>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <b-field label="Categoría">
                  <b-select
                    placeholder="Seleccionar Categoría"
                    v-model="inputCategoria"
                  >
                    <option
                      v-for="option in tablaCategorias"
                      :value="option.id"
                      :key="option.id"
                    >
                      {{ option.descripcion }}
                    </option>
                  </b-select>
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
  data() {
    return {
      //nombres campos
      inputNombre: null,
      inputEtiqueta: null,
      inputCodigo: null,
      inputModelo: null,
      inputNumSerie: null,
      inputCategoria: null,
      inputPrioridad: null,
      inputArea: null,
      idSeleccionado: null,
      //info entidad
      nombreEntidad: "Activo",
      uri: process.env.VUE_APP_TITLE+"API/activos",
      //tablas Datos
      tablaDatos: [],
      //columnas tabla Datos
      columns: [
        {
          field: "nombre",
          label: "Nombre",
          searchable: true,
        },
        {
          field: "etiqueta",
          label: "Etiqueta",
          searchable: true,
        },
        {
          field: "codigo",
          label: "Código",
          searchable: true,
        },
        {
          field: "modelo",
          label: "Modelo",
          searchable: true,
        },
        {
          field: "numSerie",
          label: "numSerie",
          searchable: true,
        },
        {
          field: "Area",
          subField: "descripcion",
          label: "Area",
          searchable: true,
        },
        {
          field: "Prioridad",
          subField: "denominacion",
          label: "Prioridad",
          searchable: true,
        },
        {
          field: "Categoria",
          subField: "descripcion",
          label: "Categoria",
          searchable: true,
        },
      ],
      //tablas auxiliares
      tablaAreas: [],
      tablaPrioridades: [],
      tablaCategorias: [],
      //auxiliares modal
      isAdd: false,
      isEdit: false,

      showModalCreateEdit: false,
      showModalDelete: false,

      //control errores validacion
      nombreNotAvailable: false,
      nombreHasErrors: false,
      nombreTooShort: false,
      titleSAs: process.env.VUE_APP_TITLE 

    };
  },
  mounted() {
    //llamados fetch
    this.fetchActivos();
    this.fetchPrioridades();
    this.fetchCategorias();
    this.fetchAreas();
    console.log("ENVENVNENVNVNENVS")
    console.log(this.titleSAs)
  },
  methods: {
    verFicha(row)
    {
      var idActivo=row.id
      this.$router.push("/Activos/"+idActivo);
    },
    fetchActivos() {
      try {
        fetch(this.uri, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        })
          .then((response) => response.json())
          .then((data) => {
            var resp = data;

            if (data) {
              this.tablaDatos = data["resultado"];
            } else {
              //this.$router.push("/login")
              this.tablaDatos = [];
            }
          });
      } catch (e) {
        //this.$store.dispatch("setAuth", false);
      }
    },
    fetchAreas() {
      try {
        fetch(process.env.VUE_APP_TITLE+"API/areas", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        })
          .then((response) => response.json())
          .then((data) => {
            var resp = data;

            if (data) {
              this.tablaAreas = data["resultado"];
            } else {
              //this.$router.push("/login")
              this.tablaAreas = [];
            }
          });
      } catch (e) {
        //this.$store.dispatch("setAuth", false);
      }
    },
    fetchCategorias() {
      try {
        fetch(process.env.VUE_APP_TITLE+"API/categorias", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        })
          .then((response) => response.json())
          .then((data) => {
            var resp = data;

            if (data) {
              this.tablaCategorias = data["resultado"];
            } else {
              //this.$router.push("/login")
              this.tablaCategorias = [];
            }
          });
      } catch (e) {
        //this.$store.dispatch("setAuth", false);
      }
    },
    fetchPrioridades() {
      try {
        fetch(process.env.VUE_APP_TITLE+"API/prioridades", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        })
          .then((response) => response.json())
          .then((data) => {
            var resp = data;

            if (data) {
              this.tablaPrioridades = data["resultado"];
            } else {
              this.tablaPrioridades = [];
            }
          });
      } catch (e) {}
    },

    createFunction() {
      this.showModalCreateEdit = true;
      this.isAdd = true;
    },
    submit() {
      if (this.isAdd) {
        fetch(process.env.VUE_APP_TITLE+"api/Activos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            //agregar campos a crear
            nombre: this.inputNombre,
            etiqueta: this.inputEtiqueta,
            codigo: this.inputCodigo,
            modelo: this.inputModelo,
            numSerie: this.inputNumSerie,
            idCategoria: this.inputCategoria,
            idPrioridad: this.inputPrioridad,
            idArea: this.inputArea,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            var resp = data.message;
            console.log(resp);

            //encerar valores
            this.inputNombre = null;
            this.inputEtiqueta = null;
            this.inputCodigo = null;
            this.inputModelo = null;
            this.inputNumSerie = null;
            this.inputCategoria = null;
            this.inputPrioridad = null;
            this.inputArea = null;

            //cerrar modal
            this.isAdd = false;
            this.isEdit = false;

            this.showModalCreateEdit = false;
            this.$buefy.dialog.alert("Activo agregado correctamente");

            this.fetchActivos();
          });
      } else if (this.isEdit) {
        fetch(
          process.env.VUE_APP_TITLE+"api/Activos/" + this.idSeleccionado.toString(),
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              //agregar campos editados
              nombre: this.inputNombre,
              etiqueta: this.inputEtiqueta,
              codigo: this.inputCodigo,
              modelo: this.inputModelo,
              numSerie: this.inputNumSerie,
              idCategoria: this.inputCategoria,
              idPrioridad: this.inputPrioridad,
              idArea: this.inputArea,
            }),
          }
        )
          .then((response) => response.json())
          .then((data) => {
            var resp = data.message;
            //limpiar campos
            this.selected = null;
            this.isAdd = false;
            this.isEdit = false;
            this.username = "";
            this.email = "";
            this.password = "";
            this.password2 = "";
            //this.fetchUsers();
            this.showModalCreateEdit = false;
            this.$buefy.dialog.alert("Activo editado correctamente");
            //llamar fetch
            this.fetchActivos();
          });
      }
    },
    editFunction(row) {
      //obtener valores para editar en form
      this.inputNombre = row.nombre;
      this.inputEtiqueta = row.etiqueta;
      this.inputCodigo = row.codigo;
      this.inputModelo = row.modelo;
      this.inputNumSerie = row.numSerie;
      this.inputCategoria = row.idCategoria;
      this.inputPrioridad = row.idPrioridad;
      this.inputArea = row.idArea;
      this.idSeleccionado = row.id;
      //mostrar modal
      this.showModalCreateEdit = true;
      this.isAdd = false;
      this.isEdit = true;
    },
    deleteFunction(row) {
      const idDel = row.id;
      fetch(process.env.VUE_APP_TITLE+"api/Activos/" + idDel.toString(), {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          var resp = data.message;
          //limpiar campos form
          this.selected = null;
          this.isAdd = false;
          this.isEdit = false;
          this.username = "";
          this.email = "";
          this.password = "";
          this.password2 = "";

          this.showModalCreateEdit = false;
          this.$buefy.dialog.alert("Activo eliminado correctamente");
          //llamar fetch
          this.fetchActivos();
        });
    },
  },
};
</script>

<style>
</style>