<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <nav id="navbar" class="navbar navbar-expand-lg navbar-light transparent fixed-top">
      <div class="nav-item">
        <a class="nav-link text-white h1 font-weight-bolder rounded ml-2" href="/#/">伊森旅遊</a>
      </div>
      <button
        class="navbar-toggler"
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
            <a class="nav-link text-white ml-2 h5 rounded" href="/#/productlist">
              <i class="fas fa-plane"></i>
              <span class="font-weight-bolder">&nbsp;行程一覽</span>
            </a>
          </li>
          <li class="nav-item py-2 ml-2">
            <a class="nav-link text-white ml-2 h5 rounded" href="/#/customorder">
              <i class="fas fa-shopping-cart"></i>
              <span class="font-weight-bolder">&nbsp; 購物車</span>
            </a>
          </li>
        </ul>
        <div class="nav-item py-2 ml-2 my-lg-0">
          <a
            class="nav-link text-white font-weight-bolder h5 rounded ml-2"
            href="#"
            tabindex="-1"
            aria-disabled="true"
            @click.prevent="register"
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
    register() {
      const vm = this;
      vm.isLoading = true;
      setTimeout(() => {
        window.location.href = '/#/register';
      }, 750);
    },
  },
  created() {
    $(window).scroll(() => {
      if ($(document).scrollTop() > 650) {
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
