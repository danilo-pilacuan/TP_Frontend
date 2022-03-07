<template>
  <div>
    <SecurityComponent/>
    <title-bar :title-stack="titleStack" />
    <section class="section is-main-section">
      <CrudCostos />
    </section>
  </div>
</template>

<script>
import Notification from "@/components/Notification.vue";
import TitleBar from "@/components/TitleBar.vue";
import SecurityComponent from "@/components/SecurityComponent.vue"
import CrudCostos from "@/components/CrudCostos.vue";

export default {
  name: "Tables",
  components: {
    TitleBar,
    Notification,
    SecurityComponent,
    CrudCostos,
  },
  data() {
    return {
        titleStack : ['Administración','Costos']
    };
  },
  methods:{

  }
};
</script>
