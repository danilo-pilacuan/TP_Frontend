<template>
  <div>
    <SecurityComponent/>
    <title-bar :title-stack="titleStack" />
    <section class="section is-main-section">
      <CrudTipoMantenimiento />
    </section>
  </div>
</template>

<script>
import Notification from "@/components/Notification.vue";
import CrudTipoMantenimiento from "@/components/CrudTipoMantenimiento.vue";
import TitleBar from "@/components/TitleBar.vue";
import SecurityComponent from "@/components/SecurityComponent.vue"

export default {
  name: "Tables",
  components: {
    TitleBar,
    Notification,
    CrudTipoMantenimiento,
    SecurityComponent
  },
  data() {
    return {
        titleStack : ['Administración','TipoMantenimiento']
    };
  },
  methods:{

  }
};
</script>
