<template>
  <div>
    <SecurityComponent/>
    <title-bar :title-stack="titleStack" />
    <section class="section is-main-section">
      <CrudActivos />
    </section>
  </div>
</template>

<script>
import Notification from "@/components/Notification.vue";
import CrudActivos from "@/components/CrudActivos.vue";
import TitleBar from "@/components/TitleBar.vue";
import SecurityComponent from "@/components/SecurityComponent.vue"
export default {
  name: "Tables",
  components: {
    TitleBar,
    Notification,
    CrudActivos,
    SecurityComponent
  },
  data() {
    return {
        titleStack : ['Administración','Activos']
    };
  },
  methods:{

  }
};
</script>
