<template>
  <div>
    <SecurityComponent/>
    <title-bar :title-stack="titleStack" />
    <section class="section is-main-section">
      <ShowOrdenTrabajo/>
    </section>
  </div>
</template>

<script>
import Notification from "@/components/Notification.vue";
import TitleBar from "@/components/TitleBar.vue";
import SecurityComponent from "@/components/SecurityComponent.vue"
import ShowOrdenTrabajo from "@/components/ShowOrdenTrabajo.vue";

export default {
  name: "Tables",
  components: {
    TitleBar,
    Notification,
    SecurityComponent,
    ShowOrdenTrabajo,
  },
  data() {
    return {
        titleStack : ['Administración','Mantenimiento','Mostrar Orden de Trabajo']
    };
  },
  methods:{

  }
};
</script>
