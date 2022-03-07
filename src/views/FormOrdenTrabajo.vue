<template>
  <div>
    <SecurityComponent/>
    <title-bar :title-stack="titleStack" />
    <section class="section is-main-section">
      <CreateOrdenTrabajo/>
    </section>
  </div>
</template>

<script>
import Notification from "@/components/Notification.vue";
import TitleBar from "@/components/TitleBar.vue";
import SecurityComponent from "@/components/SecurityComponent.vue"
import CreateOrdenTrabajo from "@/components/CreateOrdenTrabajo.vue";

export default {
  name: "Tables",
  components: {
    TitleBar,
    Notification,
    SecurityComponent,
    CreateOrdenTrabajo,
  },
  data() {
    return {
        titleStack : ['Administración','Mantenimiento','Crear Orden de Trabajo']
    };
  },
  methods:{

  }
};
</script>
