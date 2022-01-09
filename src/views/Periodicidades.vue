<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <section class="section is-main-section">
      <CrudPeriodicidades />
    </section>
  </div>
</template>

<script>
import Notification from "@/components/Notification.vue";
import CrudPeriodicidades from "@/components/CrudPeriodicidades.vue";
import TitleBar from "@/components/TitleBar.vue";

export default {
  name: "Tables",
  components: {
    TitleBar,
    Notification,
    CrudPeriodicidades,
  },
  data() {
    return {
        titleStack : ['Administración','Periodicidades']
    };
  },
  methods:{

  }
};
</script>
