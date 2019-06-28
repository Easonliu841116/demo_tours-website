<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <a class="go-back transparent d-block nav-link transparent c-fixed-top rounded
      text-white font-weight-bolder h6 " @click.prevent="goBack" href="#">
      <i class="fas fa-arrow-left"></i>
      <span>回上一頁</span>
    </a>
    <div class="d-flex justify-content-center align-items-center
    c-vh-100 c-vw-100 bg-image">
      <form class="form-signin bg-light shadow rounded py-4"
        v-if="!isDeviceError" @submit.prevent="signIn">
          <h1 class="h5 mb-3 font-weight-bold">請先登入</h1>
          <label for="inputEmail" class="sr-only">請輸入Email</label>
          <input
            type="email"
            id="inputEmail"
            class="form-control"
            placeholder="請輸入Email"
            v-model="user.username"
            required
            autofocus
          >
          <label for="inputPassword" class="sr-only">請輸入密碼</label>
          <input
            type="password"
            id="inputPassword"
            class="form-control"
            placeholder="請輸入密碼"
            v-model="user.password"
            required
          >
          <div class="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me"> 記住我
            </label>
          </div>
          <button class="btn btn-lg btn-primary btn-block" type="submit">登入</button>
          <p class=" my-3 text-muted text-center">伊森旅遊&copy; 2019</p>
      </form>
    </div>
    <div v-if="isDeviceError"
    class="h3 text-center text-white text-bolder c-device-error p-3 rounded">
      <span>
        請使用電腦
        <br>
        操作後台!
      </span>
      <br>
      <button class="btn text-dark bg-light mt-2 font-weight-bolder" @click="goBack">確定</button>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
      isLoading: false,
      isDeviceError: false,
    };
  },
  methods: {
    signIn() {
      const vm = this;
      const url = `${process.env.APIPATH}/admin/signin`;
      vm.isLoading = true;
      vm.$http.post(url, vm.user).then((response) => {
        if (window.screen.width < 992) {
          vm.isDeviceError = true;
          vm.isLoading = false;
          return;
        }
        if (response.data.success) {
          vm.$router.push('/admin/products');
        } else {
          vm.$bus.$emit('alert', response.data.message, 'danger');
          vm.isLoading = false;
        }
      });
    },
    goBack() {
      const vm = this;
      vm.isLoading = true;
      setTimeout(() => {
        window.location.href = './#/';
      }, 750);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/FrontEnd/Register";
</style>
