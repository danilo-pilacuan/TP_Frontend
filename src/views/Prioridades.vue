<template>
  <div>
    <SecurityComponent/>
    <title-bar :title-stack="titleStack" />
    <section class="section is-main-section">
      <CrudPrioridades />
    </section>
  </div>
</template>

<script>
import Notification from "@/components/Notification.vue";
import CrudPrioridades from "@/components/CrudPrioridades.vue";
import TitleBar from "@/components/TitleBar.vue";
import SecurityComponent from "@/components/SecurityComponent.vue"

export default {
  name: "Tables",
  components: {
    TitleBar,
    Notification,
    CrudPrioridades,
    SecurityComponent
  },
  data() {
    return {
        titleStack : ['Administración','Prioridades']
    };
  },
  methods:{

  }
};
</script>
