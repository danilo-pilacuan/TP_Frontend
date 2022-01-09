<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <hero-bar>
      Activos
      <router-link slot="right" to="/" class="button"> Crear </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <card-component
        class="has-table has-mobile-sort-spaced"
        title=""
        icon="account-multiple"
      >
        <div class="container">
          <div class="block">
            <div class="columns">
              <div class="column">
                <b-table
                  :data="tablaActivos"
                  :bordered="true"
                  :striped="true"
                  :narrowed="true"
                  :hoverable="false"
                  :loading="false"
                  :focusable="true"
                  :mobile-cards="false"
                  :searchable="true"
                  :paginated="paginated"
                  :per-page="5"
                >
                  <b-table-column field="nombre" label="Nombre" searchable>
                    <template #searchable="props">
                      <b-input
                        v-model="props.filters[props.column.field]"
                        placeholder="Search..."
                        icon="magnify"
                        size="is-small"
                      />
                    </template>
                    <template v-slot="props">
                      {{ props.row.nombre }}
                    </template>
                  </b-table-column>

                  <b-table-column field="etiqueta" label="Etiqueta" searchable>
                    <template #searchable="props">
                      <b-input
                        v-model="props.filters[props.column.field]"
                        placeholder="Search..."
                        icon="magnify"
                        size="is-small"
                      />
                    </template>
                    <template v-slot="props">
                      {{ props.row.etiqueta }}
                    </template>
                  </b-table-column>
                  <b-table-column field="codigo" label="Codigo" searchable>
                    <template #searchable="props">
                      <b-input
                        v-model="props.filters[props.column.field]"
                        placeholder="Search..."
                        icon="magnify"
                        size="is-small"
                      />
                    </template>
                    <template v-slot="props">
                      {{ props.row.codigo }}
                    </template>
                  </b-table-column>
                  <b-table-column field="modelo" label="Modelo" searchable>
                    <template #searchable="props">
                      <b-input
                        v-model="props.filters[props.column.field]"
                        placeholder="Search..."
                        icon="magnify"
                        size="is-small"
                      />
                    </template>
                    <template v-slot="props">
                      {{ props.row.modelo }}
                    </template>
                  </b-table-column>
                  <b-table-column
                    field="numSerie"
                    label="Número de Serie"
                    searchable
                  >
                    <template #searchable="props">
                      <b-input
                        v-model="props.filters[props.column.field]"
                        placeholder="Search..."
                        icon="magnify"
                        size="is-small"
                      />
                    </template>
                    <template v-slot="props">
                      {{ props.row.numSerie }}
                    </template>
                  </b-table-column>
                  <b-table-column field="idArea" label="idArea" searchable>
                    <template #searchable="props">
                      <b-input
                        v-model="props.filters[props.column.field]"
                        placeholder="Search..."
                        icon="magnify"
                        size="is-small"
                      />
                    </template>
                    <template v-slot="props">
                      {{ props.row.idArea }}
                    </template>
                  </b-table-column>
                  <b-table-column
                    field="idPrioridad"
                    label="idPrioridad"
                    searchable
                  >
                    <template #searchable="props">
                      <b-input
                        v-model="props.filters[props.column.field]"
                        placeholder="Search..."
                        icon="magnify"
                        size="is-small"
                      />
                    </template>
                    <template v-slot="props">
                      {{ props.row.idPrioridad }}
                    </template>
                  </b-table-column>
                  <b-table-column
                    field="idCategoria"
                    label="idCategoria"
                    searchable
                  >
                    <template #searchable="props">
                      <b-input
                        v-model="props.filters[props.column.field]"
                        placeholder="Search..."
                        icon="magnify"
                        size="is-small"
                      />
                    </template>
                    <template v-slot="props">
                      {{ props.row.idCategoria }}
                    </template>
                  </b-table-column>

                  <b-table-column
                    field="actions"
                    label="Acciones"
                    v-slot="props"
                  >
                    <div class="buttons">
                      <b-button
                        rounded
                        type="is-warning"
                        icon-left="pencil"
                        @click="editUser(props.row)"
                      >
                      </b-button>
                      <b-button
                        rounded
                        type="is-danger"
                        icon-left="delete"
                        @click="deleteUser(props.row)"
                      >
                      </b-button>
                    </div>
                  </b-table-column>
                </b-table>
              </div>
            </div>
            <!-- <div class="columns">
          <div class="column is-1"></div>
          <div class="column">
          </div>
          <div class="column is-1"></div>
        </div> -->
          </div>
        </div>
      </card-component>

      <hr />

      <notification class="is-info">
        <div>
          <b-icon icon="buffer" custom-size="default" />
          <b>Tightly wrapped</b> &mdash; table header becomes card header
        </div>
      </notification>

      <card-component class="has-table has-mobile-sort-spaced">
        <clients-table-sample checkable />
      </card-component>

      <hr />

      <notification class="is-info">
        <div>
          <b-icon icon="buffer" custom-size="default" />
          <b>Empty table.</b> When there's nothing to show
        </div>
      </notification>

      <card-component class="has-table has-thead-hidden">
        <clients-table-sample is-empty />
      </card-component>
    </section>
  </div>
</template>

<script>
import Notification from "@/components/Notification.vue";
import ClientsTableSample from "@/components/ClientsTableSample.vue";
import CardComponent from "@/components/CardComponent.vue";
import TitleBar from "@/components/TitleBar.vue";
import HeroBar from "@/components/HeroBar.vue";

export default {
  name: "Tables",
  components: {
    HeroBar,
    TitleBar,
    CardComponent,
    ClientsTableSample,
    Notification,
  },
  data() {
    return {
      titleStack: ["Administración", "Activos"],
      username: "",
      email: "",
      password: "",
      password2: "",
      updateFailed: false,
      validatePassword: false,
      validateUsername: false,
      tablaActivos: [],
      selected: null,
      isAddUser: false,
      isEditUser: false,
      idUserEdit: 0,
      showModalCreateEdit: false,
      showModalDelete: false,
      tiposActivo: [
        { tipoValor: 1, tipoDescripcion: "SuperActivo" },
        { tipoValor: 2, tipoDescripcion: "Administrador" },
        { tipoValor: 3, tipoDescripcion: "Trabajador" },
      ],
      typeSelected: 2,
      columns: [
        // {
        //     field: '_id',
        //     label: 'ID',
        //     //width: '40,
        //     //numeric: true
        // },
        {
          field: "name",
          label: "Nombre",
        },
        {
          field: "email",
          label: "Correo",
        },
        {
          field: "typeDescription",
          label: "Tipo de Activo",
        },
      ],
    };
  },
  mounted() {
    // this.fetchUsers()
    // this.authLogin()
  },
  methods: {
    fetchActivos() {
      try {
        fetch("http://localhost:3000/api/Activos", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        })
          .then((response) => response.json())
          .then((data) => {
            var resp = data;

            if (data) {
              console.log(data);
              this.tablaActivos = data["resultado"];

              for (var i = 0; i < this.tablaActivos.length; i++) {
                if (this.tablaActivos[i].tipoActivo == 1) {
                  this.tablaActivos[i].descripcionTipo = "SuperActivo";
                } else if (this.tablaActivos[i].tipoActivo == 2) {
                  this.tablaActivos[i].descripcionTipo = "Administrador";
                } else if (this.tablaActivos[i].tipoActivo == 3) {
                  this.tablaActivos[i].descripcionTipo = "Activo";
                }
              }

              console.log(this.tablaActivos);
            } else {
              //this.$router.push("/login")
              this.tablaActivos = [];
            }
          });
      } catch (e) {
        //this.$store.dispatch("setAuth", false)
      }
    },
    addUser() {
      this.showModalCreateEdit = true;
      this.isAddUser = true;
    },
    alert() {
      this.$buefy.dialog.alert("Everything looks fine!");
    },
    submit() {
      if (this.isAddUser) {
        fetch("http://localhost:3000/api/Activos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            nombre: this.username,
            correo: this.email,
            contrasenia: this.password,
            tipoActivo: this.typeSelected,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            var resp = data.message;
            console.log(resp);
            this.selected = null;
            this.isAddUser = false;
            this.isEditUser = false;
            this.username = "";
            this.email = "";
            this.password = "";
            this.password2 = "";
            //this.fetchUsers()
            this.showModalCreateEdit = false;
            this.$buefy.dialog.alert("Activo agregado correctamente");
            this.fetchActivos();
          });
      } else if (this.isEditUser) {
        fetch(
          "http://localhost:3000/api/Activos/" + this.idUserEdit.toString(),
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              nombre: this.username,
              correo: this.email,
            }),
          }
        )
          .then((response) => response.json())
          .then((data) => {
            var resp = data.message;
            console.log(resp);
            this.selected = null;
            this.isAddUser = false;
            this.isEditUser = false;
            this.username = "";
            this.email = "";
            this.password = "";
            this.password2 = "";
            //this.fetchUsers()
            this.showModalCreateEdit = false;
            this.$buefy.dialog.alert("Activo editado correctamente");
            this.fetchActivos();
          });
      }
    },
    editUser(row) {
      console.log(row);
      this.username = row.nombre;
      console.log(this.username);
      this.idUserEdit = row.id;
      this.email = row.correo;
      this.password = "";
      this.password2 = "";
      this.showModalCreateEdit = true;
      this.isAddUser = false;
      this.isEditUser = true;
    },
    editCourse(row) {
      this.courseName = row.name;
      this.courseDescription = row.description;
      this.showModalCreateEdit = true;
      this.isAddCourse = false;
      this.isEditCourse = true;
    },
    deleteUser(row) {
      const idUserDel = row.id;
      fetch("http://localhost:3000/api/Activos/" + idUserDel.toString(), {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          var resp = data.message;
          console.log(resp);
          this.selected = null;
          this.isAddUser = false;
          this.isEditUser = false;
          this.username = "";
          this.email = "";
          this.password = "";
          this.password2 = "";
          //this.fetchUsers()
          this.showModalCreateEdit = false;
          this.$buefy.dialog.alert("Activo eliminado correctamente");
          this.fetchActivos();
        });
    },
  },
  mounted() {
    this.fetchActivos();
  },
};
</script>
