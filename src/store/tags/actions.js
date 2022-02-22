/*
 *  As actions abaixo são requisições feitas para o servidor portal-backend-v2
 *  Ex.Obtendo dados dos usuario atualizando excluindo imagem e criando redefinindo senha.
 */
import Vue from "vue";

const getAllTags = ({ commit }) => {
  return new Promise((resolve, reject) => {
    window.axios
      .get(`/tags`)
      .then((resp) => {
        commit("SET_TAGS", resp.data.data);
        resolve(resp.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getSpecifiedTag = ({ commit }, tag_id) => {
  return new Promise((resolve, reject) => {
    window.axios
      .get(`/tags/${tag_id}`)
      .then((resp) => {
        commit("SET_SPECIFIED_TAG", resp.data.data);
        resolve(resp.data);
      })
      .catch((error) => {
        reject(error.data.errors);
      });
  });
};

const updateTag = (context, payload) => {
  const formData = new FormData();
  formData.append("id", payload.id);
  formData.append("name", payload.name);
  formData.append("color", payload.color);

  return new Promise((resolve, reject) => {
    window.axios
      .post(`/tags/${payload.id}?_method=PUT`, formData)
      .then((resp) => {
        resolve(resp.data);
        Vue.$toast.success("Tag atualizada com sucesso!");
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

const deleteTag = (context, tag_id) => {
  return new Promise((resolve, reject) => {
    window.axios
      .delete(`/tags/${tag_id}`)
      .then((resp) => {
        Vue.$toast.success("Tag excluída com sucesso!");
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

const createTag = (context, payload) => {
  const formData = new FormData();
  formData.append("name", payload.name);
  formData.append("color", payload.color);

  return new Promise((resolve, reject) => {
    window.axios
      .post(`/tags`, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((resp) => {
        Vue.$toast.success("Tag criada com sucesso!");
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
      })
      .finally(() => {});
  });
};

export { getAllTags, getSpecifiedTag, updateTag, deleteTag, createTag };
