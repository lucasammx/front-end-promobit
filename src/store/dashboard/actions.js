/*
 *  As actions abaixo são requisições feitas para o servidor portal-backend-v2
 *  Ex.Obtendo dados dos usuario atualizando excluindo imagem e criando redefinindo senha.
 */

const getDashboardData = () => {
  return new Promise((resolve, reject) => {
    window.axios
      .get(`/products/dashboard`)
      .then((resp) => {
        resolve(resp.data.data);
      })
      .catch((error) => {
        reject(error.data.errors);
      });
  });
};

export { getDashboardData };
