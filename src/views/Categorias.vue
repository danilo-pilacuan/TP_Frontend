<template>
  <div>
    <SecurityComponent/>
    <title-bar :title-stack="titleStack" />
    <section class="section is-main-section">
      <CrudCategorias />
    </section>
  </div>
</template>

<script>
import Notification from "@/components/Notification.vue";
import CrudCategorias from "@/components/CrudCategorias.vue";
import TitleBar from "@/components/TitleBar.vue";
import SecurityComponent from "@/components/SecurityComponent.vue"

export default {
  name: "Tables",
  components: {
    TitleBar,
    Notification,
    CrudCategorias,
    SecurityComponent
  },
  data() {
    return {
        titleStack : ['Administración','Categorías']
    };
  },
  methods:{

  }
};
</script>
