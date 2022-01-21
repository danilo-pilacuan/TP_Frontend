<template>
  <div>
    <SecurityComponent/>
    <title-bar :title-stack="titleStack" />
    <section class="section is-main-section">
      <CrudTrabajadores />
    </section>
  </div>
</template>

<script>
import Notification from "@/components/Notification.vue";
import CrudTrabajadores from "@/components/CrudTrabajadores.vue";
import TitleBar from "@/components/TitleBar.vue";
import SecurityComponent from "@/components/SecurityComponent.vue"

export default {
  name: "Tables",
  components: {
    TitleBar,
    Notification,
    CrudTrabajadores,
    SecurityComponent
  },
  data() {
    return {
        titleStack : ['Administración','Trabajadores']
    };
  },
  methods:{

  }
};
</script>
