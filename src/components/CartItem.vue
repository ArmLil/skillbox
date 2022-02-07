<template lang="html">
  <li class="cart__item product">
    <div class="product__pic">
      <img
        :src="item.product.image"
        width="120"
        height="120"
        srcset="img/phone-square-3@2x.jpg 2x"
        alt="item.product.title"
      />
    </div>
    <h3 class="product__title">
      {{ item.product.title }}
    </h3>
    <span class="product__code"> Артикул: {{ item.product.id }} </span>

    <div class="product__counter form__counter">
      <button type="button" aria-label="Убрать один товар" @click.prevent="decAmount">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-minus"></use>
        </svg>
      </button>

      <input type="text" v-model="amount" name="count" />

      <button type="button" aria-label="Добавить один товар" @click.prevent="accAmount">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-plus"></use>
        </svg>
      </button>
    </div>

    <b class="product__price"> {{ (item.amount * item.product.price) | numberFormat }} ₽ </b>

    <button
      class="product__del button-del"
      type="button"
      aria-label="Удалить товар из корзины"
      @click.prevent="deleteProduct(item.productId)"
    >
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import { mapMutations } from "vuex";
import numberFormat from "@/helpers/numberFormat";
import isNaturalNumber from "@/helpers/isNumber";

export default {
  filters: {
    numberFormat
  },
  props: ["item"],
  data() {
    return {
      currentAmount: this.item.amount
    };
  },
  computed: {
    amount: {
      get() {
        return this.item.amount;
      },
      set(value) {
        this.updateCartProductAmount({ productId: this.item.productId, amount: value });
      }
    }
  },
  watch: {
    amount(newData, oldData) {
      if (!isNaturalNumber(newData) && newData !== "") {
        this.updateCartProductAmount({ productId: this.item.productId, amount: oldData });
      } else if (isNaturalNumber(newData) && newData !== this.currentAmount) {
        this.$store
          .dispatch("updateCartProductAmount", {
            productId: this.item.productId,
            amount: newData
          })
          .then(() => {
            this.currentAmount = newData;
          });
      } else {
        this.updateCartProductAmount({ productId: this.item.productId, amount: newData });
      }
    }
  },
  methods: {
    ...mapMutations(["deleteCartProduct", "updateCartProductAmount"]),
    decAmount() {
      this.amount -= 1;
    },
    accAmount() {
      this.amount += 1;
    },
    deleteProduct() {
      this.$store.dispatch("deleteCartProduct", {
        productId: this.item.productId
      });
    }
  }
};
</script>

<style lang="css" scoped></style>
