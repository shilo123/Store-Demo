import { createStore } from "vuex";

export default createStore({
  state: {
    products: [],
    sof: [],
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      let { ComputedSof, prod } = products;
      state.products = prod;
      state.sof = ComputedSof;
    },
  },
  getters: {},
  actions: {},
  modules: {},
});
