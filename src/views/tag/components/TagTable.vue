<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="tags"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Tags</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="showDialogForm" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Nova tag
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
                    <v-textarea
                      label="Descrição"
                      v-model="editedItem.description"
                      rows="1"
                      row-height="15"
                    ></v-textarea>
                  </v-row>
                  <v-row justify="center">
                    <div>
                      <span class="subheading">Escolha uma cor:</span>
                      <v-color-picker
                        v-model="editedItem.color"
                        elevation="1"
                      ></v-color-picker>
                    </div>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDialogForm">
                  Cancelar
                </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Salvar </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Tem certeza que deseja apagar?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDeleteDialog"
                  >Cancelar</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >Confirmar</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:[`item.description`]="{ value }">
        <div
          style="
            max-width: 17vw;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          "
        >
          {{ value }}
        </div>
      </template>
      <template v-slot:[`item.color`]="{ item }">
        <v-chip style="border: 1px solid #afafaf" :color="item.color"></v-chip>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>

      <template v-slot:no-data>
        <p>Nenhuma tag cadastrada</p>
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
      { text: "Descrição", value: "description" },
      { text: "Cor", value: "color" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      id: 0,
      name: "",
      description: "",
      color: "#e0e0e0",
    },
    defaultItem: {
      id: 0,
      name: "",
      description: "",
      color: "#e0e0e0",
    },
  }),

  computed: {
    ...mapState("tags", ["tags"]),
    formTitle() {
      return this.editedIndex === -1 ? "Nova Tag" : "Atualizar Tag";
    },
    updatingTag() {
      return this.editedIndex > -1;
    },
    currentTagIndex() {
      return this.tags.findIndex((element) => {
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
      getAllTags: "tags/getAllTags",
      updateTag: "tags/updateTag",
      createTag: "tags/createTag",
      deleteTag: "tags/deleteTag",
    }),
    editItem(item) {
      this.editedItem = Object.assign({}, item);

      this.editedIndex = item.id;

      this.showDialogForm = true;
    },

    deleteItem(item) {
      this.editedIndex = item.id;
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.deleteTag(this.editedIndex).then((response) => {
        if (response.deleted) {
          this.tags.splice(this.currentTagIndex, 1);
        }

        this.getAllProducts();
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
      if (!this.updatingTag) {
        this.createTag(this.editedItem).then((response) => {
          this.tags.push(response.data);
        });
      } else {
        this.updateTag(this.editedItem).then(() => {
          this.getAllTags();
          this.getAllProducts();
        });
      }
      this.closeDialogForm();
    },
  },
};
</script>

<style></style>
