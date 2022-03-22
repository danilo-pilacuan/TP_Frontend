<template>
  <div id="users" class="home">
    <hero-bar>
        <!-- @todo cambiar1 -->
      Prioridades
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
            <p class="modal-card-title">Crear Prioridad</p> 
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
                  label="Código Prioridad"
                  :type="{ 'is-danger': nombreHasErrors }"
                  :message="[
                    { 'Username is not available': nombreNotAvailable },
                    { 'Username is too short': nombreTooShort },
                  ]"
                >
                  <b-input v-model="inputCodigoPrioridad"></b-input>
                </b-field>
                
              </div>
            </div>

            <div class="columns">
              <div class="column">
                <b-field label="Denominación">
                  <b-input disabled v-model="inputDenominacion"></b-input>
                </b-field>
              </div>
            </div>

            <div class="columns">
              <div class="column">
                <b-field label="Porcentaje de marcha">
                    <b-numberinput v-model="inputPorcentajeMarcha" placeholder="0"></b-numberinput>
                </b-field>
              </div>
            </div>

            <div class="columns">
              <div class="column">
                <b-field label="Equipo Auxiliar">
                    <b-numberinput v-model="inputEquipoAuxiliar" placeholder="0"></b-numberinput>
                </b-field>
              </div>
            </div>

            <div class="columns">
              <div class="column">
                <b-field label="Influencia sobre el proceso">
                    <b-numberinput v-model="inputInfluenciaSobreProceso" placeholder="0"></b-numberinput>
                </b-field>
              </div>
            </div>

            <div class="columns">
              <div class="column">
                <b-field label="Influencia en la calidad del producto">
                    <b-numberinput v-model="inputInfluenciaCalidadProducto" placeholder="0"></b-numberinput>
                </b-field>
              </div>
            </div>

            <div class="columns">
              <div class="column">
                <b-field label="Horas de paro en el mes">
                    <b-numberinput v-model="inputHorasParoAlMes" placeholder="0"></b-numberinput>
                </b-field>
              </div>
            </div>

            <div class="columns">
              <div class="column">
                <b-field label="Grado de especialidad">
                    <b-numberinput v-model="inputGradoEspecialidad" placeholder="0"></b-numberinput>
                </b-field>
              </div>
            </div>

            <div class="columns">
              <div class="column">
                <b-field label="Influencia en la seguridad">
                    <b-numberinput v-model="inputInfluenciaEnlaSeguridad" required placeholder="0"></b-numberinput>
                </b-field>
              </div>
            </div>

            <div class="columns">
              <div class="column">
                <b-field label="Valor Criticidad">
                    <b-numberinput v-model="inputValorCriticidad" placeholder="0" disabled></b-numberinput>
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
  watch:{
      inputPorcentajeMarcha: function(val){
        this.inputValorCriticidad=this.inputPorcentajeMarcha+
        this.inputEquipoAuxiliar+
        this.inputInfluenciaSobreProceso+
        this.inputInfluenciaCalidadProducto+
        this.inputHorasParoAlMes+
        this.inputGradoEspecialidad+
        this.inputInfluenciaEnlaSeguridad
        if(this.inputValorCriticidad>=1 && this.inputValorCriticidad<7)
        {
            this.inputDenominacion="No criticidad"
        }
        else if(this.inputValorCriticidad>=7 && this.inputValorCriticidad<11)
        {
            this.inputDenominacion="Poca criticidad"
        }
        else if(this.inputValorCriticidad>=11 && this.inputValorCriticidad<18)
        {
            this.inputDenominacion="Criticidad Media"
        }
        else if(this.inputValorCriticidad>=18 && this.inputValorCriticidad<26)
        {
            this.inputDenominacion="Criticidad Considerable"
        }
        else if(this.inputValorCriticidad>=26)
        {
            this.inputDenominacion="Alta Criticidad"
        }
      },
      inputEquipoAuxiliar: function(val){
        this.inputValorCriticidad=this.inputPorcentajeMarcha+
        this.inputEquipoAuxiliar+
        this.inputInfluenciaSobreProceso+
        this.inputInfluenciaCalidadProducto+
        this.inputHorasParoAlMes+
        this.inputGradoEspecialidad+
        this.inputInfluenciaEnlaSeguridad
        if(this.inputValorCriticidad>=1 && this.inputValorCriticidad<7)
        {
            this.inputDenominacion="No criticidad"
        }
        else if(this.inputValorCriticidad>=7 && this.inputValorCriticidad<11)
        {
            this.inputDenominacion="Poca criticidad"
        }
        else if(this.inputValorCriticidad>=11 && this.inputValorCriticidad<18)
        {
            this.inputDenominacion="Criticidad Media"
        }
        else if(this.inputValorCriticidad>=18 && this.inputValorCriticidad<26)
        {
            this.inputDenominacion="Criticidad Considerable"
        }
        else if(this.inputValorCriticidad>=26)
        {
            this.inputDenominacion="Alta Criticidad"
        }
      },
      inputInfluenciaSobreProceso: function(val){
        this.inputValorCriticidad=this.inputPorcentajeMarcha+
        this.inputEquipoAuxiliar+
        this.inputInfluenciaSobreProceso+
        this.inputInfluenciaCalidadProducto+
        this.inputHorasParoAlMes+
        this.inputGradoEspecialidad+
        this.inputInfluenciaEnlaSeguridad
        if(this.inputValorCriticidad>=1 && this.inputValorCriticidad<7)
        {
            this.inputDenominacion="No criticidad"
        }
        else if(this.inputValorCriticidad>=7 && this.inputValorCriticidad<11)
        {
            this.inputDenominacion="Poca criticidad"
        }
        else if(this.inputValorCriticidad>=11 && this.inputValorCriticidad<18)
        {
            this.inputDenominacion="Criticidad Media"
        }
        else if(this.inputValorCriticidad>=18 && this.inputValorCriticidad<26)
        {
            this.inputDenominacion="Criticidad Considerable"
        }
        else if(this.inputValorCriticidad>=26)
        {
            this.inputDenominacion="Alta Criticidad"
        }
      },
      inputInfluenciaCalidadProducto: function(val){
        this.inputValorCriticidad=this.inputPorcentajeMarcha+
        this.inputEquipoAuxiliar+
        this.inputInfluenciaSobreProceso+
        this.inputInfluenciaCalidadProducto+
        this.inputHorasParoAlMes+
        this.inputGradoEspecialidad+
        this.inputInfluenciaEnlaSeguridad
        if(this.inputValorCriticidad>=1 && this.inputValorCriticidad<7)
        {
            this.inputDenominacion="No criticidad"
        }
        else if(this.inputValorCriticidad>=7 && this.inputValorCriticidad<11)
        {
            this.inputDenominacion="Poca criticidad"
        }
        else if(this.inputValorCriticidad>=11 && this.inputValorCriticidad<18)
        {
            this.inputDenominacion="Criticidad Media"
        }
        else if(this.inputValorCriticidad>=18 && this.inputValorCriticidad<26)
        {
            this.inputDenominacion="Criticidad Considerable"
        }
        else if(this.inputValorCriticidad>=26)
        {
            this.inputDenominacion="Alta Criticidad"
        }
      },
      inputHorasParoAlMes: function(val){
        this.inputValorCriticidad=this.inputPorcentajeMarcha+
        this.inputEquipoAuxiliar+
        this.inputInfluenciaSobreProceso+
        this.inputInfluenciaCalidadProducto+
        this.inputHorasParoAlMes+
        this.inputGradoEspecialidad+
        this.inputInfluenciaEnlaSeguridad
        if(this.inputValorCriticidad>=1 && this.inputValorCriticidad<7)
        {
            this.inputDenominacion="No criticidad"
        }
        else if(this.inputValorCriticidad>=7 && this.inputValorCriticidad<11)
        {
            this.inputDenominacion="Poca criticidad"
        }
        else if(this.inputValorCriticidad>=11 && this.inputValorCriticidad<18)
        {
            this.inputDenominacion="Criticidad Media"
        }
        else if(this.inputValorCriticidad>=18 && this.inputValorCriticidad<26)
        {
            this.inputDenominacion="Criticidad Considerable"
        }
        else if(this.inputValorCriticidad>=26)
        {
            this.inputDenominacion="Alta Criticidad"
        }
      },
      inputGradoEspecialidad: function(val){
        this.inputValorCriticidad=this.inputPorcentajeMarcha+
        this.inputEquipoAuxiliar+
        this.inputInfluenciaSobreProceso+
        this.inputInfluenciaCalidadProducto+
        this.inputHorasParoAlMes+
        this.inputGradoEspecialidad+
        this.inputInfluenciaEnlaSeguridad
        if(this.inputValorCriticidad>=1 && this.inputValorCriticidad<7)
        {
            this.inputDenominacion="No criticidad"
        }
        else if(this.inputValorCriticidad>=7 && this.inputValorCriticidad<11)
        {
            this.inputDenominacion="Poca criticidad"
        }
        else if(this.inputValorCriticidad>=11 && this.inputValorCriticidad<18)
        {
            this.inputDenominacion="Criticidad Media"
        }
        else if(this.inputValorCriticidad>=18 && this.inputValorCriticidad<26)
        {
            this.inputDenominacion="Criticidad Considerable"
        }
        else if(this.inputValorCriticidad>=26)
        {
            this.inputDenominacion="Alta Criticidad"
        }
      },
      inputInfluenciaEnlaSeguridad: function(val){
        this.inputValorCriticidad=this.inputPorcentajeMarcha+
        this.inputEquipoAuxiliar+
        this.inputInfluenciaSobreProceso+
        this.inputInfluenciaCalidadProducto+
        this.inputHorasParoAlMes+
        this.inputGradoEspecialidad+
        this.inputInfluenciaEnlaSeguridad
        if(this.inputValorCriticidad>=1 && this.inputValorCriticidad<7)
        {
            this.inputDenominacion="No criticidad"
        }
        else if(this.inputValorCriticidad>=7 && this.inputValorCriticidad<11)
        {
            this.inputDenominacion="Poca criticidad"
        }
        else if(this.inputValorCriticidad>=11 && this.inputValorCriticidad<18)
        {
            this.inputDenominacion="Criticidad Media"
        }
        else if(this.inputValorCriticidad>=18 && this.inputValorCriticidad<26)
        {
            this.inputDenominacion="Criticidad Considerable"
        }
        else if(this.inputValorCriticidad>=26)
        {
            this.inputDenominacion="Alta Criticidad"
        }
      }
  },
  data() {
    return {
        //prefijo ruta @todo cambiar3
      tipoUsuario:1,
      prefixRuta: "Prioridades",
      //nombres campos @todo cambiar4
       
        inputCodigoPrioridad: null,
        inputDenominacion: null,
        inputPorcentajeMarcha: null,
        inputEquipoAuxiliar: null,
        inputInfluenciaSobreProceso: null,
        inputInfluenciaCalidadProducto: null,
        inputHorasParoAlMes: null,
        inputGradoEspecialidad: null,
        inputInfluenciaEnlaSeguridad: null,
        inputValorCriticidad: null,
      
      //info entidad @todo cambiar5
    //   nombreEntidad: "Caracteristicas",
      
      //tablas Datos @todo cambiar6
      tablaDatos: [],
      //columnas tabla Datos @todo cambiar7
      columns: [
        {
          field: "codigoPrioridad",
          label: "Código Prioridad",
          searchable: true,
        },
        {
          field: "denominacion",
          label: "Denominación",
          searchable: true,
        },
        {
          field: "porcentajeMarcha",
          label: "Porcentaje Marcha",
          searchable: true
        },
        {
          field: "equipoAuxiliar",
          label: "Equipo Auxiliar",
          searchable: true
        },
        {
          field: "influenciaSobreProceso",
          label: "Influencia sobre proceso",
          searchable: true
        },
        {
          field: "influenciaCalidadProducto",
          label: "Influencia calidad producto",
          searchable: true
        },
        {
          field: "horasParoAlMes",
          label: "Horas paro al mes",
          searchable: true
        },
        {
          field: "gradoEspecialidad",
          label: "Grado Especialidad",
          searchable: true
        },
        {
          field: "influenciaEnLaSeguridad",
          label: "Influencia en la seguridad",
          searchable: true
        },
        {
          field: "valorCriticidad",
          label: "Valor Criticidad",
          searchable: true
        }
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
            
            codigoPrioridad: this.inputCodigoPrioridad,
            denominacion: this.inputDenominacion,
            porcentajeMarcha: this.inputPorcentajeMarcha,
            equipoAuxiliar: this.inputEquipoAuxiliar,
            influenciaSobreProceso: this.inputInfluenciaSobreProceso,
            influenciaCalidadProducto: this.inputInfluenciaCalidadProducto,
            horasParoAlMes: this.inputHorasParoAlMes,
            gradoEspecialidad: this.inputGradoEspecialidad,
            influenciaEnLaSeguridad: this.inputInfluenciaEnlaSeguridad,
            valorCriticidad: this.inputValorCriticidad,

          }),
        })
          .then((response) => response.json())
          .then((data) => {
            var resp = data.message;
            console.log(resp);

            //encerar valores @todo cambiar12
            this.inputCodigoPrioridad=null,
            this.inputDenominacion=null,
            this.inputPorcentajeMarcha=null,
            this.inputEquipoAuxiliar=null,
            this.inputInfluenciaSobreProceso=null,
            this.inputInfluenciaCalidadProducto=null,
            this.inputHorasParoAlMes=null,
            this.inputGradoEspecialidad=null,
            this.inputInfluenciaEnlaSeguridad=null,
            this.inputValorCriticidad=null,
            //cerrar modal
            this.isAdd = false;
            this.isEdit = false;

            this.showModalCreateEdit = false;
            this.$buefy.dialog.alert("Prioridad agregada correctamente"); //@todo cambiar13

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
              codigoPrioridad: this.inputCodigoPrioridad,
                denominacion: this.inputDenominacion,
                porcentajeMarcha: this.inputPorcentajeMarcha,
                equipoAuxiliar: this.inputEquipoAuxiliar,
                influenciaSobreProceso: this.inputInfluenciaSobreProceso,
                influenciaCalidadProducto: this.inputInfluenciaCalidadProducto,
                horasParoAlMes: this.inputHorasParoAlMes,
                gradoEspecialidad: this.inputGradoEspecialidad,
                influenciaEnLaSeguridad: this.inputInfluenciaEnlaSeguridad,
                valorCriticidad: this.inputValorCriticidad,
            }),
          }
        )
          .then((response) => response.json())
          .then((data) => {
            var resp = data.message;
            //encerar valores @todo cambiar15
            this.inputCodigoPrioridad=null,
            this.inputDenominacion=null,
            this.inputPorcentajeMarcha=null,
            this.inputEquipoAuxiliar=null,
            this.inputInfluenciaSobreProceso=null,
            this.inputInfluenciaCalidadProducto=null,
            this.inputHorasParoAlMes=null,
            this.inputGradoEspecialidad=null,
            this.inputInfluenciaEnlaSeguridad=null,
            this.inputValorCriticidad=null,
            
            this.showModalCreateEdit = false;
            this.$buefy.dialog.alert("Prioridad editada correctamente");
            //llamar fetch
            this.fetchDatos();
          });
      }
    },
    verFichaEquipo(row){
      var idActivo=row.id
      this.$router.push("/Equipos/"+idActivo);
    },
    editFunction(row) {
      //obtener valores para editar en form @todo cambiar16
        this.inputCodigoPrioridad=row.codigoPrioridad,
        this.inputDenominacion=row.denominacion,
        this.inputPorcentajeMarcha=row.porcentajeMarcha,
        this.inputEquipoAuxiliar=row.equipoAuxiliar,
        this.inputInfluenciaSobreProceso=row.influenciaSobreProceso,
        this.inputInfluenciaCalidadProducto=row.influenciaCalidadProducto,
        this.inputHorasParoAlMes=row.horasParoAlMes,
        this.inputGradoEspecialidad=row.gradoEspecialidad,
        this.inputInfluenciaEnlaSeguridad=row.influenciaEnLaSeguridad,
        this.inputValorCriticidad=row.valorCriticidad,
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
          this.inputCodigoPrioridad=null,
            this.inputDenominacion=null,
            this.inputPorcentajeMarcha=null,
            this.inputEquipoAuxiliar=null,
            this.inputInfluenciaSobreProceso=null,
            this.inputInfluenciaCalidadProducto=null,
            this.inputHorasParoAlMes=null,
            this.inputGradoEspecialidad=null,
            this.inputInfluenciaEnlaSeguridad=null,
            this.inputValorCriticidad=null,
          //cerrar form
          this.isAdd = false;
          this.isEdit = false;

          this.showModalCreateEdit = false;
          this.$buefy.dialog.alert("Prioridad eliminada correctamente"); //@todo cambiar19
          //llamar fetch
          this.fetchDatos();
        });
    },
  },
};
</script>

<style>
</style>