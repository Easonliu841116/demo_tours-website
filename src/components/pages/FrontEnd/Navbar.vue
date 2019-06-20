<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light transparent">
      <div class="nav-item">
        <a class="nav-link text-white h2 font-weight-bold" href="#">伊森旅遊</a>
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
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto font-weight-bold">
          <li class="nav-item py-2 ml-2">
            <a class="nav-link text-white ml-2 h5" href="#">選購</a>
          </li>
          <li class="nav-item py-2 ml-2">
            <a class="nav-link text-white ml-2 h5" href="#">行程</a>
          </li>
          <li class="nav-item py-2 ml-2">
            <a class="nav-link text-white ml-2 h5" href="#">購物車</a>
          </li>
        </ul>
        <div class="nav-item py-2 ml-2 my-lg-0 h5">
          <a class="nav-link text-white font-weight-bold
          " href="#" tabindex="-1" aria-disabled="true">登入</a>
        </div>
      </div>
    </nav>
  </div>
</template>
<style lang="scss" scoped>
.h5{
  line-height: 2.25rem;
}

@media (max-width: 992px) {
  .navbar{
    background: rgba(0, 0, 0, 0.3);
  }

  .h2{
    transform: translateY(5%);
  }

  .h5{
    font-size: 1.5rem;
    // line-height: 2.25rem;
  }
}
</style>
