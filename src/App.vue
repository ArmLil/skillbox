<template>
  <div id="app">
    <section class="catalog">
      <ProductList :products="products" />
      <BasePagination :count="countProducts" v-model="page" :per-page="productsPerPage" />
    </section>
  </div>
</template>

<script>
import products from "./data/product";
import ProductList from "./components/ProductList.vue";
import BasePagination from "./components/BasePagination.vue";

export default {
  name: "App",
  components: { ProductList, BasePagination },
  data() {
    return {
      page: 1,
      productsPerPage: 3
    };
  },
  computed: {
    products() {
      const offset = (this.page - 1) * this.productsPerPage;
      return products.slice(offset, offset + this.productsPerPage);
    },
    countProducts() {
      return products.length;
    }
  }
};
</script>
