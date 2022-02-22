<template>
  <div>
    <Header></Header>
    <main id="content" role="main" class="main">
      <transition mode="out-in">
        <router-view />
      </transition>
    </main>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import { mapActions } from "vuex";

export default {
  components: { Header },
  methods: {
    ...mapActions({
      getAllProducts: "products/getAllProducts",
      getAllTags: "tags/getAllTags",
      loginLogout: "auth/logout",
      checkAuth: "auth/checkAuth",
    }),

    isAuthenticated() {
      this.checkAuth().catch(() => this.redirectLogin());
    },
    redirectLogin() {
      this.loginLogout().then(() => this.$router.push({ name: "auth@login" }));
    },
  },
  created() {
    this.isAuthenticated();
    Promise.all([this.getAllTags(), this.getAllProducts()]);
  },
};
</script>

<style scoped>
.v-enter,
.v-leave-to {
  transform: translate3d(-20px, 0, 0);
  opacity: 0;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.1s;
}
</style>
