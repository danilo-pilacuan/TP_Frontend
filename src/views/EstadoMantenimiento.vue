<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <section class="section is-main-section">
      <CrudEstadoMantenimiento />
    </section>
  </div>
</template>

<script>
import Notification from "@/components/Notification.vue";
import CrudEstadoMantenimiento from "@/components/CrudEstadoMantenimiento.vue";
import TitleBar from "@/components/TitleBar.vue";

export default {
  name: "Tables",
  components: {
    TitleBar,
    Notification,
    CrudEstadoMantenimiento,
  },
  data() {
    return {
        titleStack : ['Administración','EstadoMantenimiento']
    };
  },
  methods:{

  }
};
</script>
