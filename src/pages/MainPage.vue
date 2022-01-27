<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        152 товара
      </span>
    </div>

    <div class="content__catalog">
      <ProductFilter
        :price-from.sync="filterPriceFrom"
        :price-to.sync="filterPriceTo"
        :category-id.sync="filterCategoryId"
        :filter-colors.sync="filterColors"
        :filter-color.sync="filterColor"
        :current-page.sync="page"
      />
      <section class="catalog">
        <ProductList :products="products" />
        <BasePagination :count="countProducts" v-model="page" :per-page="productsPerPage" />
      </section>
    </div>
  </main>
</template>

<script>
import axios from "axios";
import products from "@/data/product";
import ProductList from "@/components/ProductList.vue";
import BasePagination from "@/components/BasePagination.vue";
import ProductFilter from "@/components/ProductFilter.vue";

export default {
  components: { ProductList, BasePagination, ProductFilter },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      page: 1,
      productsPerPage: 3,
      filterColor: "",

      productsData: null
    };
  },
  computed: {
    filteredProducts() {
      let filteredProducts = products;
      if (this.filterPriceFrom > 0) {
        filteredProducts = filteredProducts.filter(product => product.price > this.filterPriceFrom);
      }
      if (this.filterPriceTo > 0) {
        filteredProducts = filteredProducts.filter(product => product.price < this.filterPriceTo);
      }
      if (this.filterCategoryId > 0) {
        filteredProducts = filteredProducts.filter(
          product => product.categoryId === this.filterCategoryId
        );
      }
      if (this.filterColor !== "") {
        filteredProducts = filteredProducts.filter(product => {
          return product.colors.includes(this.filterColor);
        });
      }
      return filteredProducts;
    },
    filterColors() {
      const filterColors = [];
      products.forEach(product => {
        product.colors.forEach(color => {
          if (!filterColors.includes(color)) {
            filterColors.push(color);
          }
        });
      });
      return filterColors;
    },
    products() {
      return this.productsData
        ? this.productsData.items.map(product => {
            return {
              ...product,
              image: product.image.file.url
            };
          })
        : [];
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    }
  },
  methods: {
    loadProducts() {
      axios
        .get(
          `https://vue-study.skillbox.cc/api/products?page=${this.page}&limit=${this.productsPerPage}`
        )
        .then(response => {
          this.productsData = response.data;
        });
    }
  },
  watch: {
    page() {
      this.loadProducts();
    }
  },
  created() {
    this.loadProducts();
  }
};
</script>
