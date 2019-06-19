<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="d-flex justify-content-center align-items-center custom-vh-100 custom-vw-100">
      <form class="form-signin" @submit.prevent="signIn">
        <h1 class="h3 mb-3 font-weight-normal">登入</h1>
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
        <p class="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../.././assets/sass/BackEnd/Sign";

.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}
</style>
<script>
export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
      isLoading: false,
    };
  },
  methods: {
    signIn() {
      const vm = this;
      const url = `${process.env.APIPATH}/admin/signin`;
      vm.isLoading = true;
      vm.$http.post(url, vm.user).then((response) => {
        // eslint-disable-next-line
        console.log(response);
        if (response.data.success) {
          setTimeout(() => {
            vm.$router.push('/admin/products');
          }, 500);
        } else {
          vm.$bus.$emit('alert', response.data.message, 'danger');
        }
      });
    },
  },
};
</script>
<style>
.custom-vh-100{
  height: 100vh;
}
.custom-vw-100{
  width: 100vw;
}
</style>
