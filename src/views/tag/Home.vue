<template>
  <v-container tag="section">
    <tag-table></tag-table>
  </v-container>
</template>

<script>
import table from "@/views/tag/components/TagTable.vue";
export default {
  name: "tagHome",
  components: { "tag-table": table },
};
</script>

<style></style>
