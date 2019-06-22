<template>
  <div>
    <div id="banner-carosel" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#banner-carosel" data-slide-to="0" class="active"></li>
        <li data-target="#banner-carosel" data-slide-to="1"></li>
        <li data-target="#banner-carosel" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active c-carosel-01 c-carosel position-relative">
          <h4 class="font-weight-bolder c-carosel-slogan">京都5天4夜</h4>
          <p class="py-1 c-carosel-description">細細探索這座古都，NT$ 14,999元起!</p>
        </div>
        <div class="carousel-item c-carosel-02 c-carosel position-relative">
          <h4 class="font-weight-bolder c-carosel-slogan">東京8天7夜</h4>
          <p class="py-1 c-carosel-description">一探屬於你的東京之旅，NT$ 24,999元起!</p>
        </div>
        <div class="carousel-item c-carosel-03 c-carosel position-relative">
          <h4 class="font-weight-bolder c-carosel-slogan">大阪10天9夜</h4>
          <p class="py-1 c-carosel-description">慶祝伊森旅遊滿3周年，NT$ 19,999元起</p>
        </div>
      </div>
      <a
        class="carousel-control-prev"
        href="#banner-carosel"
        role="button"
        data-slide="prev"
      >
        <span class="sr-only">Previous</span>
      </a>
      <a
        class="carousel-control-next"
        href="#banner-carosel"
        role="button"
        data-slide="next"
      >
        <span class="sr-only">Next</span>
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../../assets/scss/FrontEnd/Carosel";
</style>
