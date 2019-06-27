<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <nav id="navbar" class="navbar navbar-expand-lg transparent fixed-top">
      <div class="nav-item">
        <a class="nav-link text-white h3 font-weight-bolder rounded ml-2" href="#"
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
          <li class="nav-item py-2 ml-2">
            <a class="nav-link text-white ml-2 h6 rounded" href="#"
            @click.prevent="toTours">
              <i class="fas fa-plane"></i>
              <span class="font-weight-bolder">&nbsp;行程一覽</span>
            </a>
          </li>
          <li class="nav-item py-2 ml-2">
            <a class="nav-link text-white ml-2 h6 rounded" href="/#/customorder">
              <i class="fas fa-shopping-cart"></i>
              <span class="font-weight-bolder">&nbsp; 購物車</span>
            </a>
          </li>
        </ul>
        <div class="nav-item py-2 ml-2 my-lg-0">
          <a
            class="nav-link text-white font-weight-bolder h6 rounded ml-2"
            href="#"
            tabindex="-1"
            aria-disabled="true"
            @click.prevent="toRegister"
          >
            <i class="fas fa-cog"></i>
            <span class="font-weight-bolder">&nbsp;登入後台</span>
          </a>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    toIndex() {
      const vm = this;
      vm.isLoading = true;
      setTimeout(() => {
        window.location.href = '/#/';
        vm.isLoading = false;
      }, 750);
    },
    toRegister() {
      const vm = this;
      vm.isLoading = true;
      setTimeout(() => {
        window.location.href = '/#/register';
        vm.isLoading = false;
      }, 750);
    },
    toTours() {
      const vm = this;
      vm.isLoading = true;
      setTimeout(() => {
        window.location.href = '/#/tours';
        vm.isLoading = false;
      }, 750);
    },
  },
  created() {
    $(window).scroll(() => {
      if ($(document).scrollTop() > 1) {
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
