import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { API_BASE_URL } from "@/config";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [],
    userAccessKey: null,
    cartProductsData: [],
    orderInfo: null
  },
  mutations: {
    updateOrderInfo(state, orderInfo) {
      state.orderInfo = orderInfo;
    },
    resetCart(state) {
      state.cartProducts = [];
      state.cartProductsData = [];
    },
    updateCartProductAmount(state, { productId, amount }) {
      const item = state.cartProducts.find(el => el.productId === productId);
      if (item) {
        item.amount = amount;
      }
    },
    deleteCartProduct(state, { productId }) {
      state.cartProducts = state.cartProducts.filter(el => el.productId !== productId);
    },
    apdateAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },
    updateCartProductsData(state, items) {
      state.cartProductsData = items;
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map(item => {
        return {
          productId: item.product.id,
          amount: item.quantity
        };
      });
    }
  },
  getters: {
    cartDetailProducts(state) {
      return state.cartProducts.map(item => {
        const product = state.cartProductsData.find(el => el.product.id === item.productId).product;
        return {
          ...item,
          product: {
            ...product,
            image: product.image.file.url
          }
        };
      });
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts.reduce((val, item) => {
        return item.product.price * item.amount + val;
      }, 0);
    },
    cartTotalAmount(state, getters) {
      return getters.cartDetailProducts.reduce((val, item) => {
        return item.amount + val;
      }, 0);
    }
  },
  actions: {
    loadOrderInfo(context, orderId) {
      return axios
        .get(API_BASE_URL + "api/orders/" + orderId, {
          params: {
            userAccessKey: context.state.userAccessKey
          }
        })
        .then(response => {
          context.commit("updateOrderInfo", response.data);
        });
    },
    loadCart(context) {
      return axios
        .get(API_BASE_URL + "api/baskets", {
          params: {
            userAccessKey: context.state.userAccessKey
          }
        })
        .then(response => {
          if (!context.state.userAccessKey) {
            localStorage.setItem("userAccessKey", response.data.user.accessKey);
            context.commit("apdateAccessKey", response.data.user.accessKey);
          }
          context.commit("updateCartProductsData", response.data.items);
          context.commit("syncCartProducts");
        });
    },
    addProductToCart(context, { productId, amount }) {
      return new Promise(resolve => setTimeout(resolve, 1000)).then(() => {
        return axios
          .post(
            API_BASE_URL + "api/baskets/products",
            {
              productId,
              quantity: amount
            },
            {
              params: {
                userAccessKey: context.state.userAccessKey
              }
            }
          )
          .then(response => {
            context.commit("updateCartProductsData", response.data.items);
            context.commit("syncCartProducts");
          });
      });
    },
    updateCartProductAmount(context, { productId, amount }) {
      return axios
        .put(
          API_BASE_URL + "api/baskets/products",
          {
            productId,
            quantity: amount
          },
          {
            params: {
              userAccessKey: context.state.userAccessKey
            }
          }
        )
        .then(response => {
          context.commit("updateCartProductsData", response.data.items);
        })
        .catch(() => {
          context.commit("syncCartProducts");
        });
    },
    deleteCartProduct(context, { productId }) {
      context.commit("deleteCartProduct", { productId });

      return axios
        .delete(API_BASE_URL + "api/baskets/products", {
          data: { productId },
          params: {
            userAccessKey: context.state.userAccessKey
          }
        })
        .then(response => {
          context.commit("updateCartProductsData", response.data.items);
        })
        .catch(() => {
          context.commit("syncCartProducts");
        });
    }
  }
});
