/*
 *  As actions abaixo são requisições feitas para o servidor portal-backend-v2
 *  Ex.Obtendo dados dos usuario atualizando excluindo imagem e criando redefinindo senha.
 */
import Vue from "vue";

const getAllProducts = ({ commit }) => {
  return new Promise((resolve, reject) => {
    window.axios
      .get(`/products`)
      .then((resp) => {
        commit("SET_PRODUCTS", resp.data.data);
        resolve(resp.data);
      })
      .catch((error) => {
        reject(error.data.errors);
      });
  });
};

const getSpecifiedProduct = ({ commit }, product_id) => {
  return new Promise((resolve, reject) => {
    window.axios
      .get(`/products/${product_id}`)
      .then((resp) => {
        commit("SET_SPECIFIED_PRODUCT", resp.data.data);
        resolve(resp.data);
      })
      .catch((error) => {
        reject(error.data.errors);
      });
  });
};

const updateProduct = (context, payload) => {
  const formData = new FormData();
  formData.append("id", payload.id);
  formData.append("name", payload.name);
  formData.append("description", payload.description);
  payload.tags.forEach((item) => formData.append("tags[]", item));

  return new Promise((resolve, reject) => {
    window.axios
      .post(`/products/${payload.id}?_method=PUT`, formData)
      .then((resp) => {
        Vue.$toast.success("Produto atualizado com sucesso!");
        resolve(resp.data);
      })
      .catch((error) => {
        let objectError = error.response.data.errors;
        if (objectError) {
          Object.values(objectError).forEach((error, key) => {
            Vue.$toast.error(error[key]);
          });
        }
        reject(error.response);
      });
  });
};

const deleteProduct = (context, product_id) => {
  return new Promise((resolve, reject) => {
    window.axios
      .delete(`/products/${product_id}`)
      .then((resp) => {
        Vue.$toast.success("Produto excluído com sucesso!");
        resolve(resp.data.data);
      })
      .catch((error) => {
        let objectError = error.response.data.errors;
        if (objectError) {
          Object.values(objectError).forEach((error, key) => {
            Vue.$toast.error(error[key]);
          });
        }
        reject(error.response);
      })
      .finally(() => {});
  });
};

const createProduct = (context, payload) => {
  const formData = new FormData();
  formData.append("name", payload.name);
  formData.append("description", payload.description);
  payload.tags.forEach((item) => formData.append("tags[]", item));

  return new Promise((resolve, reject) => {
    window.axios
      .post(`/products`, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((resp) => {
        Vue.$toast.success("Produto criado com sucesso!");
        resolve(resp.data);
      })
      .catch((error) => {
        let objectError = error.response.data.errors;
        if (objectError) {
          Object.values(objectError).forEach((error, key) => {
            Vue.$toast.error(error[key]);
          });
        }
        reject(error.response);
      });
  });
};

export {
  getAllProducts,
  getSpecifiedProduct,
  updateProduct,
  deleteProduct,
  createProduct,
};
