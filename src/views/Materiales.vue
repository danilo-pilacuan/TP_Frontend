<template>
  <div>
    <SecurityComponent/>
    <title-bar :title-stack="titleStack" />
    <section class="section is-main-section">
      <CrudMateriales />
    </section>
  </div>
</template>

<script>
import Notification from "@/components/Notification.vue";
import CrudMateriales from "@/components/CrudMateriales.vue";
import TitleBar from "@/components/TitleBar.vue";
import SecurityComponent from "@/components/SecurityComponent.vue"
export default {
  name: "Tables",
  components: {
    TitleBar,
    Notification,
    CrudMateriales,
    SecurityComponent
  },
  data() {
    return {
        titleStack : ['Administración','Materiales']
    };
  },
  methods:{

  }
};
</script>
