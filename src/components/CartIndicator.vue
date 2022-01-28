<template lang="html">
  <router-link
    class="header__cart"
    :to="{ name: 'cart', params: 1 }"
    aria-label="Корзина с товарами"
  >
    <svg width="30" height="21" fill="currentColor">
      <use xlink:href="#icon-cart"></use>
    </svg>
    <span class="header__count" aria-label="Количество товаров">{{
      $store.getters.cartTotalAmount
    }}</span>
  </router-link>
</template>

<script>
export default {};
</script>

<style lang="css" scoped></style>
