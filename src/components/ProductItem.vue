<template>
  <li class="catalog__item">
    <router-link class="catalog__pic" :to="{ name: 'product', params: { id: product.id } }">
      <img :src="product.image" :alt="product.title" />
    </router-link>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price"> {{ product.price | numberFormat }} ₽ </span>

    <ul class="colors colors--black">
      <li class="colors__item" v-for="_color in product.colors" :key="_color.id">
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio" :value="_color" v-model="color" />
          <span class="colors__value" v-bind:style="{ 'background-color': _color.code }"> </span>
        </label>
      </li>
    </ul>
  </li>
</template>

<script>
import gotoPage from "@/helpers/gotoPage";
import numberFormat from "@/helpers/numberFormat";

export default {
  data() {
    return {
      color: this.product.colors[0]
    };
  },
  filters: {
    numberFormat
  },
  methods: {
    gotoPage
  },
  props: ["product"]
};
</script>
