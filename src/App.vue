<template>
  <div>
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: { Header, Footer },
  created() {
    const userAccessKey = localStorage.getItem("userAccessKey");
    if (userAccessKey) {
      this.apdateAccessKey(userAccessKey);
    }
    // this.$store.dispatch("loadCart");
    this.loadCart();
  },
  methods: {
    ...mapActions(["loadCart", "apdateAccessKey"]),
    ...mapMutations(["apdateAccessKey"])
  }
};
</script>
