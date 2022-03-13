<template>
  <div>
    <SecurityComponent />
    <title-bar :title-stack="titleStack" />
    <hero-bar>Ficha Activo </hero-bar>
    <section class="section is-main-section">
      <tiles>
        <card-component
          title="Información"
          icon="hammer-screwdriver"
          class="tile is-child"
        >
          <b-field horizontal label="Nombre">
            <b-input v-model="datosActivo.nombre" name="nombre" disabled />
          </b-field>
          <b-field horizontal label="Etiqueta">
            <b-input v-model="datosActivo.etiqueta" name="etiqueta" disabled />
          </b-field>
          <b-field horizontal label="Código">
            <b-input v-model="datosActivo.codigo" name="codigo" disabled />
          </b-field>
          <b-field horizontal label="Modelo">
            <b-input v-model="datosActivo.modelo" name="modelo" disabled />
          </b-field>
          <b-field horizontal label="Número de Serie">
            <b-input v-model="datosActivo.numSerie" name="numSerie" disabled />
          </b-field>
          <b-field horizontal label="Área">
            <b-input
              v-model="datosActivo.Area.descripcion"
              name="area"
              disabled
            />
          </b-field>
          <b-field horizontal label="Prioridad">
            <b-input
              v-model="datosActivo.Prioridad.denominacion"
              name="prioridad"
              disabled
            />
          </b-field>
          <b-field horizontal label="Categoría">
            <b-input
              v-model="datosActivo.Categoria.descripcion"
              name="categoria"
              disabled
            />
          </b-field>
          <div class="no-print">
            <CrudManuales :idActivo="idActivo"/>
          </div>
          <!-- <b-field horizontal label="">
            <b-button
              type="is-warning"
              size="is-big"
            >
              Actualizar Manual
            </b-button>
            <b-button
              type="is-link"
              size="is-big"
            >
              Descargar Manual
            </b-button>
          </b-field> -->
        </card-component>

        <card-component title="Imagenes" icon="image" class="tile is-child no-print">
          <div class="card" >
            <header class="card-header">
              <file-picker type="is-info" class="mt-1 mx-1 mb-1" :idActivo="datosActivo.id" @upload="imgSubida"/>

              
            </header>
            <div class="card-content" v-if="hayImgs">
              <b-carousel>
                <b-carousel-item v-for="imagen in tablaImagenes" :key="imagen.id">
                  <div class="card-image">
                    <figure class="image is-1by1">
                      <img
                        :src="apiurl+imagen.url"
                        alt=""
                      />
                    </figure>
                  </div>
                  <div class="card-content">
                    <div class="media">
                      <b-button
                        type="is-danger"
                        size="is-big"
                        @click="eliminarImagen(imagen.id)"
                      >
                        Eliminar Imagen
                      </b-button>
                    </div>
                  </div>
                </b-carousel-item>
                              
               
              </b-carousel>
            </div>
          </div>
        </card-component>
      </tiles>
      <!-- <card-component title="Historial de Mantenimiento" icon="book">
        <b-button
          type="is-success"
          size="is-big"
          @click.prevent="imprimirInforme()"
        >
          Imprimir Informe
        </b-button>
        <b-table
          :data="tablaTareas"
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
          
        </b-table>
      </card-component> -->
    </section>
  </div>
</template>

<script>
import Notification from "@/components/Notification.vue";
import TitleBar from "@/components/TitleBar.vue";
import HeroBar from "@/components/HeroBar.vue";
import CardComponent from "@/components/CardComponent.vue";
import Tiles from "@/components/Tiles.vue";
import UserAvatar from "@/components/UserAvatar.vue";
import ProfileUpdateForm from "@/components/ProfileUpdateForm.vue";
import PasswordUpdateForm from "@/components/PasswordUpdateForm.vue";
import SecurityComponent from "@/components/SecurityComponent.vue";
import FilePicker from '@/components/FilePicker.vue'
import CrudManuales from '@/components/CrudManuales.vue'

export default {
  name: "Tables",
  components: {
    TitleBar,
    Notification,
    HeroBar,
    CardComponent,
    Tiles,
    UserAvatar,
    PasswordUpdateForm,
    ProfileUpdateForm,
    SecurityComponent,
    FilePicker,
    CrudManuales
  },
  data() {
    return {
      titleStack: ["Administración", "Activo"],
      idActivo: 1,
      userName: "sda",
      tablaTareas: [],
      tablaImagenes: [],
      hayImgs: false,
      apiurl:process.env.VUE_APP_TITLE,
      columns: [
        {
          field: "descripcion",
          label: "Descripción",
          searchable: true,
        },
        {
          field: "mantenimiento",
          label: "Mantenimiento",
          searchable: true,
        },
        {
          field: "Trabajador",
          subField: "nombres",
          label: "Nombre Encargado",
          searchable: true,
        },
        {
          field: "Trabajador",
          subField: "apellidos",
          label: "Apellido Encargado",
          searchable: true,
        },
        {
          field: "Periodicidad",
          subField: "descripcion",
          label: "Periodicidad",
          searchable: true,
        },
        {
          field: "EstadoMantenimiento",
          subField: "descripcion",
          label: "Estado Mantenimiento",
          searchable: true,
        },
      ],
      datosActivo: {
        nombre: "",
        etiqueta: "",
        codigo: "",
        modelo: "",
        numSerie: "",
        Area: {
          descripcion: "",
        },
        Prioridad: {
          denominacion: "",
        },
        Categoria: {
          descripcion: "",
        },
      },
    };
  },
  methods: {
    imprimirInforme()
    {
      window.print();
    },
    eliminarImagen(idImagen){
      fetch(process.env.VUE_APP_TITLE+"API/imagenes/" + idImagen.toString(), {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          var resp = data.message;
          this.$buefy.dialog.alert("Imagen eliminada correctamente"); 
          this.fetchImagenes()
        });
    },
    imgSubida(){
        this.$buefy.dialog.alert("Imagen agregada correctamente");
        this.fetchImagenes()

    },
    fetchImagenes(){
      try {
        fetch(process.env.VUE_APP_TITLE+"API/imagenes/activo/" + this.idActivo, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        })
          .then((response) => response.json())
          .then((data) => {
            var resp = data;

            if (data) {
              this.tablaImagenes = data["resultado"];
              if(this.tablaImagenes.length>0)
              {
                this.hayImgs=true;
              }
              console.log(this.tablaImagenes);
            } else {
              //this.$router.push("/login")
              this.tablaImagenes = null;
            }
          });
      } catch (e) {
        //this.$store.dispatch("setAuth", false);
      }
    },
    fetchActivo() {
      console.log('process.env.VUE_APP_TITLE+"API/Activos/" + this.idActivo')
      console.log(process.env.VUE_APP_TITLE+"API/Activos/" + this.idActivo)
      try {
        fetch(process.env.VUE_APP_TITLE+"API/Activos/" + this.idActivo, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        })
          .then((response) => response.json())
          .then((data) => {
            var resp = data;

            if (data) {
              console.log("this.datosActivo");
              console.log(this.datosActivo);
              this.datosActivo = data["resultado"];
              this.tablaTareas = this.datosActivo.Tareas;

              console.log(this.datosActivo);
            } else {
              //this.$router.push("/login")
              this.datosActivo = null;
            }
          });
      } catch (e) {
        //this.$store.dispatch("setAuth", false);
      }
    },
  },
  beforeMount(){
    this.idActivo = this.$route.params.id;
  },
  mounted() {
    
    console.log("The id is: " + this.idActivo);
    this.fetchActivo();
    this.fetchImagenes();
  },
  created() {},
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