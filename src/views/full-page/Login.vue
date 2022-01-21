<template>
  <card-component
    title="Login"
    icon="lock"
  >
    <router-link
      slot="button"
      to="/"
      class="button is-small"
    >
      Dashboard
    </router-link>

    <form
      method="POST"
      @submit.prevent="submit"
    >
      <b-field label="Correo Electrónico"
      :type="{ 'is-danger': loginHasErrors }"
                  :message="[
                    { 'Credenciales no válidas': loginHasErrors },
                  ]"
                  >
        <b-input
          v-model="inputCorreo"
          name="email"
          type="email"
          required
          autofocus
        />
      </b-field>


      <b-field label="Contraseña"
      :type="{ 'is-danger': loginHasErrors }"
                  :message="[
                    { 'Credenciales no válidas': loginHasErrors },
                  ]">
        <b-input
          v-model="inputContrasenia"
          type="password"
          name="password"
          required
        />
      </b-field>

      <b-field>
        <b-checkbox
          v-model="remember"
          type="is-black"
          class="is-thin"
        >
          Recordarme
        </b-checkbox>
      </b-field>

      <hr>

      <b-field grouped>
        <div class="control">
          <b-button
            native-type="submit"
            type="is-black"
            :loading="isLoading"
          >
            Ingresar
          </b-button>
        </div>
        <!-- <div class="control">
          <router-link
            to="/"
            class="button is-outlined is-black"
          >
            Dashboard
          </router-link>
        </div> -->
      </b-field>
    </form>
  </card-component>
</template>

<script>
import { reactive, ref } from '@vue/composition-api'
import { useRouter } from '@/router'
import CardComponent from '@/components/CardComponent.vue'

export default {
  name: 'Login',
  components: { CardComponent },
  data(){
    return {
      isLoading: false,
      inputCorreo: '',
      inputContrasenia: '',
      remember: false,
      loginHasErrors: false
    }
  },
  methods:{
    submit(){
      this.isLoading = true
      fetch("http://localhost:3000/api/usuarios/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            
            correo: this.inputCorreo,
            contrasenia: this.inputContrasenia,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data)
            var resp = data.resultado;
            if(resp!=null)
            {
              this.$router.push('/')
            }
            else
            {
              this.isLoading=false
              this.loginHasErrors=true
            }
        
            
          });

    }
  },
  
}
</script>
