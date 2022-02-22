const SET_PRODUCTS = (state, data) => {
  state.products = data;
};

const SET_SPECIFIED_PRODUCT = (state, data) => {
  state.product = data;
};

export { SET_PRODUCTS, SET_SPECIFIED_PRODUCT };
