<template>
  <div>
    <SecurityComponent/>
    <title-bar :title-stack="titleStack" />
    <section class="section is-main-section">
      <CrudTareas />
    </section>
  </div>
</template>

<script>
import Notification from "@/components/Notification.vue";
import CrudTareas from "@/components/CrudTareas.vue";
import TitleBar from "@/components/TitleBar.vue";
import SecurityComponent from "@/components/SecurityComponent.vue"
export default {
  name: "Tables",
  components: {
    TitleBar,
    Notification,
    CrudTareas,
    SecurityComponent
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
