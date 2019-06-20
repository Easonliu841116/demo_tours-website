<template>
  <div>
    <Navbar/>
    <div class="fullscreen-bg">
      <h2 class="slogan font-weight-bold">Beautiful<br> Everywhere</h2>
      <video loop muted autoplay class="fullscreen-bg__video">
        <source src="../assets/images/video01.mp4" type="video/mp4">
      </video>
      <button class="btn btn-lg btn-outline-light transparent font-weight-bold
      btn-enter">立即預定</button>
    </div>
  </div>
</template>
<script>
import Navbar from './pages/FrontEnd/Navbar';

export default {
  components: {
    Navbar,
  },
};
</script>
<style lang="scss" scoped>
.fullscreen-bg {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  z-index: -100;
}

.fullscreen-bg__video {
  position: absolute;
  top: 50%;
  left: 50%;
  width: auto;
  height: auto;
  min-width: 100%;
  min-height: 100%;
  transform: translate(-50%, -50%);
}

.slogan{
  color: #fff;
  font-size: 6rem;
  position: fixed;
  z-index: 100;
  top: 50%;
  left: 15%;
  transform: translate(-15%, -50%);
}

.btn-enter{
  font-size: 2rem;
  position: fixed;
  z-index: 100;
  top: 50%;
  left: 75%;
  transform: translate(-75%, -50%);
}

@media (max-width: 992px) {
  .fullscreen-bg {
        background: url('../assets/images/image01.jpg') center center / cover no-repeat;
    }

  .fullscreen-bg__video {
    display: none;
  }

  .slogan{
    font-size: 3.75rem;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -35%);
  }

  .btn-enter{
    font-size: 1.75rem;
    top: 75%;
    left: 50%;
    transform: translate(-50%, -75%);
  }
}
</style>
