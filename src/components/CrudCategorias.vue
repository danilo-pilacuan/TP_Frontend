<template>
  <div id="users" class="home">
    <hero-bar>
      Categorias
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
              <slot name="addButtons"></slot>
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
        //prefijo ruta
      prefixRuta: "Categorias",
      //nombres campos
      inputDescripcion: null,
      
      //info entidad
      nombreEntidad: "Categorias",
      
      //tablas Datos
      tablaDatos: [],
      //columnas tabla Datos
      columns: [
        {
          field: "descripcion",
          label: "Descripción",
          searchable: true,
        }
      ],
      //tablas auxiliares
      
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
    //llamados fetch
    
    this.fetchDatos()
  },
  methods: {
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
            } else {
              //this.$router.push("/login")
              this.tablaDatos = [];
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
        fetch(process.env.VUE_APP_TITLE+"API/"+this.prefixRuta, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            //agregar campos a crear
            descripcion: this.inputDescripcion
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            var resp = data.message;
            console.log(resp);

            //encerar valores
            this.inputDescripcion=null

            //cerrar modal
            this.isAdd = false;
            this.isEdit = false;

            this.showModalCreateEdit = false;
            this.$buefy.dialog.alert("Categoría agregada correctamente");

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
              //agregar campos editados
              descripcion: this.inputDescripcion
            }),
          }
        )
          .then((response) => response.json())
          .then((data) => {
            var resp = data.message;
            //encerar valores
            this.inputDescripcion=null
            
            this.showModalCreateEdit = false;
            this.$buefy.dialog.alert("Categoría editada correctamente");
            //llamar fetch
            this.fetchDatos();
          });
      }
    },
    editFunction(row) {
      //obtener valores para editar en form
      this.inputDescripcion=row.descripcion
      //id Editar
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
          //limpiar campos form
          this.inputDescripcion=null

          //cerrar form
          this.isAdd = false;
          this.isEdit = false;

          this.showModalCreateEdit = false;
          this.$buefy.dialog.alert("Categoría eliminada correctamente");
          //llamar fetch
          this.fetchDatos();
        });
    },
  },
};
</script>

<style>
</style>