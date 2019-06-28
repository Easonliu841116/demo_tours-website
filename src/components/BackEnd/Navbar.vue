<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="container">
      <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a class="navbar-brand col-sm-3 col-md-2 mr-0
        text-white font-weight-bold" href="#" @click.prevent>後臺管理介面</a>
        <ul class="navbar-nav px-3">
          <li class="nav-item text-nowrap">
            <a class="nav-link" href="#" @click.prevent="signOut">登出</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    signOut() {
      const vm = this;
      const url = `${process.env.APIPATH}/logout`;
      vm.isLoading = true;
      vm.$http.post(url).then(() => {
        vm.$bus.$emit('alert', '登出成功！', 'success');
        setTimeout(() => {
          vm.$router.push('/register');
          vm.isLoading = false;
        }, 750);
      });
    },
  },
};
</script>
