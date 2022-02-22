<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="products"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Produtos</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="showDialogForm" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Novo produto
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-text-field
                      v-model="editedItem.name"
                      label="Nome"
                    ></v-text-field>
                  </v-row>
                  <v-row>
                    <div>
                      <span class="subheading">Selecione as tags:</span>
                      <v-chip-group
                        v-model="editedItem.tags"
                        column
                        multiple
                        active-class="primary--text text--accent-4"
                      >
                        <v-chip
                          v-for="tag in tags"
                          :key="'tags-form-' + tag.id"
                          :value="tag.id"
                          filter
                          outlined
                        >
                          {{ tag.name }}
                        </v-chip>
                      </v-chip-group>
                    </div>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDialogForm">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDeleteDialog"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.tags`]="{ item }">
        <div>
          <v-chip
            v-for="tag in item.tags"
            :key="'tags-' + tag.id"
            class="ma-2"
            :color="tag.color"
            style="border: 1px solid #afafaf"
          >
            <span :style="{ color: getContrastColor(tag.color) }">{{
              tag.name
            }}</span>
          </v-chip>
        </div>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>

      <template v-slot:no-data>
        <p>Nenhum produto cadastrado</p>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data: () => ({
    showDialogForm: false,
    dialogDelete: false,
    headers: [
      {
        text: "ID",
        align: "start",
        value: "id",
      },
      { text: "Nome", value: "name" },
      { text: "Tags", value: "tags" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      id: 0,
      name: "",
      tags: [],
    },
    defaultItem: {
      id: 0,
      name: "",
      tags: [],
    },
  }),

  computed: {
    ...mapState("products", ["products"]),
    ...mapState("tags", ["tags"]),
    formTitle() {
      return this.editedIndex === -1 ? "Novo Produto" : "Atualizar Produto";
    },
    updatingProduct() {
      return this.editedIndex > -1;
    },
    currentProductIndex() {
      return this.products.findIndex((element) => {
        return element.id == this.editedIndex;
      });
    },
  },

  watch: {
    showDialogForm(val) {
      val || this.closeDialogForm();
    },
    dialogDelete(val) {
      val || this.closeDeleteDialog();
    },
  },

  methods: {
    ...mapActions({
      getAllProducts: "products/getAllProducts",
      updateProduct: "products/updateProduct",
      createProduct: "products/createProduct",
      deleteProduct: "products/deleteProduct",
    }),
    editItem(item) {
      this.editedItem = Object.assign({}, item);

      this.editedIndex = item.id;

      let tagsIds = [];
      this.editedItem.tags.forEach((tag) => tagsIds.push(tag.id));
      this.editedItem.tags = tagsIds;

      this.showDialogForm = true;
    },

    deleteItem(item) {
      this.editedItem = Object.assign({}, item);
      this.editedIndex = item.id;
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.deleteProduct(this.editedIndex).then((response) => {
        if (response.deleted) {
          this.products.splice(this.currentProductIndex, 1);
        }
      });
      this.closeDeleteDialog();
    },

    closeDialogForm() {
      this.showDialogForm = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDeleteDialog() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (!this.updatingProduct) {
        this.createProduct(this.editedItem).then((response) => {
          this.products.push(response.data);
        });
      } else {
        this.updateProduct(this.editedItem).then(() => {
          this.getAllProducts();
        });
      }
      this.closeDialogForm();
    },
    getContrastColor(hexcolor) {
      hexcolor = hexcolor.replace("#", "");
      var r = parseInt(hexcolor.substr(0, 2), 16);
      var g = parseInt(hexcolor.substr(2, 2), 16);
      var b = parseInt(hexcolor.substr(4, 2), 16);
      var yiq = (r * 299 + g * 587 + b * 114) / 1000;
      return yiq >= 128 ? "black" : "white";
    },
  },
};
</script>

<style></style>
