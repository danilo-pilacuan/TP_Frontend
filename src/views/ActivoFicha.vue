<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <hero-bar> Activo </hero-bar>
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
            <b-input v-model="datosActivo.Area.descripcion" name="area" disabled />
          </b-field>
          <b-field horizontal label="Prioridad">
            <b-input v-model="datosActivo.Prioridad.denominacion" name="prioridad" disabled />
          </b-field>
          <b-field horizontal label="Categoría">
            <b-input v-model="datosActivo.Categoria.descripcion" name="categoria" disabled />
          </b-field>
          <b-field horizontal label="">
            <b-button
            type="is-link"
            size="is-big"
            @click.prevent="trashModalOpen(props.row)"
          >
            Descargar Manual
          </b-button> 
          </b-field>
          <b-field horizontal label="">
            
          </b-field>
        </card-component>

        <card-component title="Imagen" icon="image" class="tile is-child"> 
          
            <b-image
            src="https://img.pe.class.posot.com/es_pe/2019/08/26/Cizalla-Mltiple-Original-peddinhaus-20190826224323.jpg"
            alt="The Buefy Logo"
            ratio="600by600"
            :rounded="false"
        ></b-image>
        </card-component>
      </tiles>
      <card-component title="Historial de Mantenimiento" icon="book">
        <b-button
            type="is-success"
            size="is-big"
            @click.prevent="trashModalOpen(props.row)"
          >
            Descargar Informe
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
          <!-- <b-table-column field="actions" label="Acciones" v-slot="props">
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
          </b-table-column> -->
        </b-table>

           </card-component>
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
  },
  data() {
    return {
      titleStack: ["Administración", "Activo"],
      idActivo: 0,
      userName:"sda",
      tablaTareas:[],
      columns:[
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
      datosActivo:{
          nombre:"",
          etiqueta:"",
          codigo:"",
          modelo:"",
          numSerie:"",
          Area:{
              descripcion:""
          },
          Prioridad:{
              denominacion:""
          },
          Categoria:{
              descripcion:""
          }
      }
    };
  },
  methods: {
      fetchActivo() {
      try {
        fetch("http://localhost:3000/API/Activos/"+this.idActivo, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        })
          .then((response) => response.json())
          .then((data) => {
            var resp = data;

            if (data) {
              this.datosActivo = data["resultado"];
              this.tablaTareas=this.datosActivo.Tareas
              console.log(this.datosActivo)
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
  mounted() {
    this.idActivo = this.$route.params.id;
    console.log("The id is: " + this.idActivo);
    this.fetchActivo()
  },
  created(){
      
  }
};
</script>
