<template>
  <v-container tag="section">
    <data-table></data-table>
  </v-container>
</template>

<script>
import table from "@/components/table.vue";
export default {
  name: "productHome",
  components: { "data-table": table },
};
</script>

<style></style>
