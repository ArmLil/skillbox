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
import ProductList from "@/components/ProductList.vue";
import BasePagination from "@/components/BasePagination.vue";
import ProductFilter from "@/components/ProductFilter.vue";
import { API_BASE_URL } from "@/config";

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
      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        axios
          .get(API_BASE_URL + "products", {
            params: {
              page: this.page,
              limit: this.productsPerPage,
              categoryId: this.filterCategoryId,
              minPrice: this.filterPriceFrom,
              maxPrice: this.filterPriceTo,
              colorId: this.filterColor.id
            }
          })
          .then(response => {
            this.productsData = response.data;
          });
      }, 0);
    }
  },
  watch: {
    page() {
      this.loadProducts();
    },
    filterPriceFrom() {
      this.loadProducts();
    },
    filterPriceTo() {
      this.loadProducts();
    },
    filterCategoryId() {
      this.loadProducts();
    },
    filterColor() {
      this.loadProducts();
    }
  },
  created() {
    this.loadProducts();
  }
};
</script>
