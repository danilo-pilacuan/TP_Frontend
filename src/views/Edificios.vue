<template>
  <div>
    <SecurityComponent/>
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
import SecurityComponent from "@/components/SecurityComponent.vue"
export default {
  name: "Tables",
  components: {
    TitleBar,
    Notification,
    CrudEdificios,
    SecurityComponent
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
