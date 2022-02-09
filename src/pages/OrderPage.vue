<template lang="html">
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'cart' }">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info"> {{ totalAmount }} товара </span>
      <div class="loader" v-if="requestSending">
        <span class="loader">Отправка данных...</span>
        <Loader />
      </div>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order()">
        <div class="cart__field">
          <div class="cart__data">
            <BaseFormText
              title="ФИО"
              :error="formError.name"
              placeholder="Введите ваше полное имя"
              v-model="formData.name"
            ></BaseFormText>

            <BaseFormText
              title="Адрес доставки"
              :error="formError.address"
              placeholder="Введите ваш адре"
              v-model="formData.address"
            ></BaseFormText>

            <BaseFormText
              title="Телефон"
              :error="formError.phone"
              type="tel"
              placeholder="Введите ваш телефон"
              v-model="formData.phone"
            ></BaseFormText>

            <BaseFormText
              title="Email"
              :error="formError.email"
              type="email"
              placeholder="Введи ваш Email"
              v-model="formData.email"
            ></BaseFormText>

            <BaseFormTextarea
              title="Комментарий к заказу"
              :error="formError.comment"
              v-model="formData.comment"
              placeholder="Ваши пожелания"
            />
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="delivery"
                    value="0"
                    checked=""
                  />
                  <span class="options__value"> Самовывоз <b>бесплатно</b> </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="500" />
                  <span class="options__value"> Курьером <b>500 ₽</b> </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="card" />
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="cash" />
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li class="cart__order" v-for="item in products" :key="item.product.id">
              <h3>{{ item.product.title }}</h3>
              <b>{{ item.product.price | numberFormat }} ₽</b>
              <span>Количество: {{ item.amount }}</span>
              <span>Артикул: {{ item.product.id }}</span>
            </li>
          </ul>

          <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>
              Итого: <b>{{ totalAmount }}</b> товара на сумму
              <b>{{ totalPrice | NumberFormat }} ₽</b>
            </p>
          </div>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
        <div v-if="formErrorMessage" class="cart__error form__error-block">
          <p>
            {{ formErrorMessage }}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
import BaseFormText from "@/components/BaseFormText.vue";
import BaseFormTextarea from "@/components/BaseFormTextarea.vue";
import Loader from "@/components/Loader.vue";
import NumberFormat from "@/helpers/numberFormat";
import { API_BASE_URL } from "@/config";

export default {
  components: { BaseFormText, BaseFormTextarea, Loader },

  data() {
    return {
      formData: {},
      formError: {},
      formErrorMessage: "",
      requestSending: ""
    };
  },
  methods: {
    order() {
      this.formError = {};
      this.formErrorMessage = "";
      this.requestSending = true;
      new Promise(resolve => setTimeout(resolve, 2000)).then(() => {
        axios
          .post(
            API_BASE_URL + "api/orders",
            {
              ...this.formData
            },
            {
              params: {
                userAccessKey: this.$store.state.userAccessKey
              }
            }
          )
          .then(response => {
            this.$store.commit("resetCart");
            this.$store.commit("updateOrderInfo", response.data);
            this.$router.push({ name: "orderInfo", params: { id: response.data.id } });
          })
          .catch(error => {
            this.formError = error.response.data.error.request || {};
            if (error.response.data.error.message) {
              this.formErrorMessage = error.response.data.error.message;
            }
          })
          .then(() => {
            this.requestSending = false;
          });
      });
    }
  },
  computed: {
    ...mapGetters({
      products: "cartDetailProducts",
      totalPrice: "cartTotalPrice",
      totalAmount: "cartTotalAmount"
    })
  },
  filters: { NumberFormat }
};
</script>

<style scoped>
.loader {
  position: absolute;
  top: 15%;
  right: 18%;
}
</style>
