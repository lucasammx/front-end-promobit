<template>
  <header>
    <v-app-bar app color="white" elevation="1">
      <div class="d-flex align-center">
        <v-img
          class="shrink mt-1 hidden-sm-and-down"
          :src="require('../assets/promobit-15686966.png')"
          width="180"
        />
      </div>

      <v-spacer></v-spacer>

      <div>
        <router-link class="views_link" :to="{ name: 'product@home' }">
          Produtos
        </router-link>
        <span class="divider"></span>
        <router-link class="views_link" :to="{ name: 'tag@home' }">
          Tag
        </router-link>
      </div>

      <v-spacer></v-spacer>
      <v-btn @click="logout()" text>
        <span class="mr-2">Logout</span>
      </v-btn>
    </v-app-bar>
  </header>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "header",
  methods: {
    ...mapActions({
      loginLogout: "auth/logout",
    }),
    logout() {
      this.loginLogout().then(() => {
        this.$router.push({ name: "auth@login" });
      });
    },
  },
};
</script>

<style scoped>
.views_link {
  background-color: #f2f2f2;
  padding: 8px 21px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 500;
  color: #0072ed;
}

.views_link.router-link-exact-active {
  background-color: #238cff;
  color: #ffffff;
}

.divider {
  border-right: 2px solid #f2f2f2;
  margin: 0 6px;
  padding: 2px 0;
}
</style>
