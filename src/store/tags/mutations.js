const SET_TAGS = (state, data) => {
  state.tags = data;
};

const SET_SPECIFIED_TAG = (state, data) => {
  state.tag = data;
};

export { SET_TAGS, SET_SPECIFIED_TAG };
