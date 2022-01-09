<template>
  <div>
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

export default {
  name: "Tables",
  components: {
    TitleBar,
    Notification,
    CrudActivos,
  },
  data() {
    return {
        titleStack : ['Administración','Tareas']
    };
  },
  methods:{

  }
};
</script>
