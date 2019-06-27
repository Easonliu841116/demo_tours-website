<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <Navbar/>
    <div class="c-fullscreen-bg">
      <h2 class="c-slogan c-font-weight-bolder">
          享受，
        <br>
          每個精彩時刻。
      </h2>
      <video loop muted autoplay class="c-fullscreen-bg__video">
        <source src="../../assets/images/index/bg-index.mp4" type="video/mp4">
      </video>
      <button class="btn btn-lg btn-outline-light transparent font-weight-bold
      c-btn-enter" @click="toTours">進入網站</button>
    </div>
  </div>
</template>
<script>
import Navbar from './Navbar';

export default {
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    toTours() {
      const vm = this;
      vm.isLoading = true;
      setTimeout(() => {
        window.location.href = '/#/tours';
        vm.isLoading = false;
      }, 750);
    },
  },
  components: {
    Navbar,
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/FrontEnd/Index';

</style>
