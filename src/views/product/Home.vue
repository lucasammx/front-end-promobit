<template>
  <v-container tag="section">
    <product-table></product-table>
  </v-container>
</template>

<script>
import table from "@/views/product/components/ProductTable.vue";
export default {
  name: "productHome",
  components: { "product-table": table },
};
</script>

<style></style>
