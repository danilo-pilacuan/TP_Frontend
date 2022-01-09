<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <section class="section is-main-section">
      <CrudEdificios />
    </section>
  </div>
</template>

<script>
import Notification from "@/components/Notification.vue";
import CrudEdificios from "@/components/CrudEdificios.vue";
import TitleBar from "@/components/TitleBar.vue";

export default {
  name: "Tables",
  components: {
    TitleBar,
    Notification,
    CrudEdificios,
  },
  data() {
    return {
        titleStack : ['Administración','Edificios']
    };
  },
  methods:{

  }
};
</script>
