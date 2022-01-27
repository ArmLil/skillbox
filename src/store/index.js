import Vue from "vue";
import Vuex from "vuex";
import products from "@/data/product";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: []
  },
  mutations: {
    addProductToCart(state, { productId, amount }) {
      const item = state.cartProducts.find(el => el.productId === productId);
      if (item) {
        item.amount += amount;
      } else {
        state.cartProducts.push({
          productId,
          amount
        });
      }
    },
    updateCartProductAmount(state, { productId, amount }) {
      const item = state.cartProducts.find(el => el.productId === productId);
      if (item) {
        item.amount = amount;
      }
    },
    deleteCartProduct(state, productId) {
      state.cartProducts = state.cartProducts.filter(el => el.productId !== productId);
    }
  },
  getters: {
    cartDetailProducts(state) {
      return state.cartProducts.map(item => {
        return {
          ...item,
          product: products.find(product => product.id === item.productId)
        };
      });
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts.reduce((val, item) => {
        return item.product.price * item.amount + val;
      }, 0);
    }
  }
});
