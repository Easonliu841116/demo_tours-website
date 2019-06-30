<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <nav id="navbar" class="navbar navbar-expand-lg transparent fixed-top">
      <div class="nav-item">
        <a class="nav-link c-nav-link text-white h3 font-weight-bolder rounded ml-2 mb-0" href="#"
        @click.prevent="toIndex">伊森旅遊</a>
      </div>
      <button
        class="navbar-toggler h3"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i class="fas fa-bars text-white"></i>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto ml-3">
          <li class="nav-item ml-2 py-2">
            <a class="nav-link c-nav-link text-white h6 rounded mb-0" href="#"
            @click.prevent="toTours">
              <i class="fas fa-plane"></i>
              <span class="font-weight-bold">&nbsp;行程一覽</span>
            </a>
          </li>
          <li class="nav-item ml-2 py-2" v-if="navItemShowJudge === 'tours'">
            <a class="nav-link c-nav-link text-white h6 rounded mb-0"
            href="#" @click.prevent="toCheckout">
              <div>
                <i class="fas fa-shopping-cart"></i>&nbsp;購物車
                <small class="bg-danger rounded-circle text-white
                c-cart-qty d-inline-block text-center" v-if="cartLength >= 1">
                  {{cartLength}}
                </small>
              </div>
            </a>
          </li>
        </ul>
        <div class="nav-item ml-2 py-2" v-if="navItemShowJudge !== 'register'">
          <a
            class="nav-link c-nav-link text-white h6 rounded mb-0"
            href="#"
            tabindex="-1"
            aria-disabled="true"
            @click.prevent="toRegister"
          >
            <i class="fas fa-cog"></i>
            <span class="font-weight-bold">&nbsp;登入後台</span>
          </a>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  props: {
    navItemShowJudge: {
      type: String,
      default() {
        return '';
      },
    },
  },
  data() {
    return {
      carts: {},
      cartLength: 0,
      isLoading: false,
    };
  },
  methods: {
    toIndex() {
      const vm = this;
      vm.isLoading = true;
      setTimeout(() => {
        window.location.href = './#/';
        vm.isLoading = false;
      }, 750);
    },
    toRegister() {
      const vm = this;
      vm.isLoading = true;
      setTimeout(() => {
        window.location.href = './#/register';
        vm.isLoading = false;
      }, 750);
    },
    toTours() {
      const vm = this;
      vm.isLoading = true;
      setTimeout(() => {
        window.location.href = './#/tours';
        vm.isLoading = false;
      }, 750);
    },
    toCheckout() {
      const vm = this;
      vm.isLoading = true;
      setTimeout(() => {
        window.location.href = './#/checkout';
        vm.isLoading = false;
      }, 750);
    },
    getCart() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      vm.$http.get(api).then((response) => {
        vm.carts = response.data.data;
        vm.cartLength = response.data.data.carts.length;
      });
    },
  },
  created() {
    this.getCart();
    $(window).scroll(() => {
      if ($(document).scrollTop() > 50) {
        $('#navbar').removeClass('transparent');
        $('#navbar').addClass('bg-dark');
      } else {
        $('#navbar').addClass('transparent');
        $('#navbar').removeClass('bg-dark');
      }
    });
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/FrontEnd/Navbar";

</style>
