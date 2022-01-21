<template>
  <div>
    <SecurityComponent/>
    <title-bar :title-stack="titleStack" />
    <section class="section is-main-section">
      <CrudUsuarios/>
    </section>
  </div>
</template>

<script>
import Notification from "@/components/Notification.vue";
import CrudUsuarios from "@/components/CrudUsuarios.vue";
import TitleBar from "@/components/TitleBar.vue";
import SecurityComponent from "@/components/SecurityComponent.vue"


export default {
  name: "Tables",
  components: {
    TitleBar,
    Notification,
    CrudUsuarios,
    SecurityComponent
  },
  data() {
    return {
        titleStack : ['Gestión','Usuarios']
    };
  },
  methods:{

  }
};
</script>
