<template>
  <div>
    <SecurityComponent/>
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
import SecurityComponent from "@/components/SecurityComponent.vue"

export default {
  name: "Tables",
  components: {
    TitleBar,
    Notification,
    CrudAreas,
    SecurityComponent
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
