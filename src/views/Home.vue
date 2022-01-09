<template>
  <div class="home">
    <title-bar :title-stack="titleStack" />
    <hero-bar> Activo </hero-bar>
    <section class="section is-main-section">
      <h1>Empresa Eléctrica Quito</h1>
    <img alt="Vue logo" src="../assets/logo.png" style="width:400px; height:400px;">
    <h1>Plan de mantenimiento</h1>
   
    </section>

  </div>
</template>

<script>
// @ is an alias to /src
import Notification from "@/components/Notification.vue";
import TitleBar from "@/components/TitleBar.vue";
import HeroBar from "@/components/HeroBar.vue";
import CardComponent from "@/components/CardComponent.vue";
import Tiles from "@/components/Tiles.vue";
import UserAvatar from "@/components/UserAvatar.vue";
import ProfileUpdateForm from "@/components/ProfileUpdateForm.vue";
import PasswordUpdateForm from "@/components/PasswordUpdateForm.vue";

export default {
  name: 'Home',
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
  data(){
    return{
      titleStack: ["Administración", "Activo"],
    }
  }
}
</script>
