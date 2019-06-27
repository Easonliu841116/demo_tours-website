<template>
  <div>
    <div class="container-fluid">
      <Navbar/>
      <Sidebar/>
      <div class="row">
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
          <router-view/>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default {
  components: {
    Navbar,
    Sidebar,
  },
};
</script>

<style lang="scss">
@import '../../assets/scss/BackEnd/Dashboard';

</style>
