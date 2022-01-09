<template>
  <div>
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

export default {
  name: "Tables",
  components: {
    TitleBar,
    Notification,
    CrudCategorias,
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
