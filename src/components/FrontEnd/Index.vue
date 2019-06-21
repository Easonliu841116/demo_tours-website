<template>
  <div>
    <Navbar/>
    <div class="c-fullscreen-bg">
      <h2 class="c-slogan c-font-weight-bold">
          Beautiful
        <br>
          Everywhere
      </h2>
      <video loop muted autoplay class="c-fullscreen-bg__video">
        <source src="../../assets/images/video01.mp4" type="video/mp4">
      </video>
      <button class="btn btn-lg btn-outline-light transparent font-weight-bold
      c-btn-enter">立即預定</button>
    </div>
  </div>
</template>
<script>
import Navbar from './Navbar';

export default {
  components: {
    Navbar,
  },
};
</script>
<style lang="scss" scoped>
@import '../../assets/scss/FrontEnd/Index';
</style>
