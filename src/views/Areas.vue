<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <section class="section is-main-section">
      <CrudAreas />
    </section>
  </div>
</template>

<script>
import Notification from "@/components/Notification.vue";
import CrudAreas from "@/components/CrudAreas.vue";
import TitleBar from "@/components/TitleBar.vue";

export default {
  name: "Tables",
  components: {
    TitleBar,
    Notification,
    CrudAreas,
  },
  data() {
    return {
        titleStack : ['Administración','Areas']
    };
  },
  methods:{

  }
};
</script>
