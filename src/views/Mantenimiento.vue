<template>
  <div>
    <SecurityComponent/>
    <title-bar :title-stack="titleStack" />
    <section class="section is-main-section">
      <CrudOrdenesTrabajo />
    </section>
  </div>
</template>

<script>
import Notification from "@/components/Notification.vue";
import TitleBar from "@/components/TitleBar.vue";
import SecurityComponent from "@/components/SecurityComponent.vue"
import CrudOrdenesTrabajo from "@/components/CrudOrdenesTrabajo.vue";

export default {
  name: "Tables",
  components: {
    TitleBar,
    Notification,
    SecurityComponent,
    CrudOrdenesTrabajo,
  },
  data() {
    return {
        titleStack : ['Administración','Mantenimiento']
    };
  },
  methods:{

  }
};
</script>
