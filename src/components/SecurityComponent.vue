<template>
  <div id="users" class="home" style="display: none;">
  </div>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  mounted() {
    //this.fetchUsers();
    console.log("SecComp")
    this.authLogin();
  },
  methods: {
    authLogin() {
      try {
          /*
           fetch("http://localhost:3000/API/"+this.prefixRuta, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            //agregar campos a crear @todo cambiar11
            nombre: this.inputNombre,
            correo: this.inputCorreo,
            tipoUsuario: this.inputTipoUsuario,
            contrasenia: "",
          }),
        })
          */
        fetch("http://localhost:3000/api/usuarios/authLogin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        })
          .then((response) => response.json())
          .then((data) => {
            var resp = data;
            console.log("Authlogin ")
            console.log(resp);
            if (resp.resultado.id) {
              console.log("hello " + resp.resultado.nombre);
            //   if (data.userType) {
            //     this.$store.dispatch("setUserType", data.userType);
            //   }
            //   this.$store.dispatch("setAuth", true);
            } else {
              this.$router.push("/login");
            }
          });
      } catch (e) {
        this.$store.dispatch("setAuth", false);
      }
    },
    
  },
};
</script>

<style>
</style>