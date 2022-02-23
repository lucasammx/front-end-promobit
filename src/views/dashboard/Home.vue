<template>
  <v-container tag="section" class="mt-7">
    <div class="cards">
      <div>
        <span class="name">Produtos</span>
        <span class="value">{{ products.length }}</span>
      </div>

      <div>
        <span class="name">Tags</span>
        <span class="value">{{ tags.length }}</span>
      </div>
    </div>

    <div
      class="chart-card mt-5"
      :class="{ 'default-chart': !isChatDataAvailable }"
    >
      <v-sparkline
        v-if="isChatDataAvailable"
        :labels="chatData.labels"
        :value="chatData.values"
        color="blue"
        line-width="2"
        padding="16"
      ></v-sparkline>
      <p v-else>Nenhuma Produto cadastrado com Tag!</p>
    </div>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data: () => ({
    chatData: {
      labels: [],
      values: [],
    },
  }),
  methods: {
    ...mapActions({
      getDashboardData: "dashboard/getDashboardData",
    }),
  },
  computed: {
    ...mapState("products", ["products"]),
    ...mapState("tags", ["tags"]),
    isChatDataAvailable() {
      return this.chatData.labels.length > 0 && this.chatData.values.length > 0;
    },
  },
  created() {
    this.getDashboardData().then((response) => {
      this.chatData.labels = response.labels;
      this.chatData.values = response.values;
    });
  },
};
</script>

<style scoped>
.default-chart {
  height: 327px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9c9c9c;
}
.cards {
  display: flex;
  justify-content: space-between;
}

.chart-card {
  border: 1px solid #f2f2f2;
  border-radius: 10px;
  padding: 10px 20px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}

.cards div {
  width: 40%;
  display: flex;
  flex-direction: column;
  border: 1px solid #f2f2f2;
  border-radius: 10px;
  padding: 10px 20px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}

.cards .name {
  font-size: 16px;
}

.cards .value {
  font-weight: 600;
  font-size: 20px;
}
@media (min-width: 992px) {
  section.container {
    max-width: 960px;
  }
}
</style>
