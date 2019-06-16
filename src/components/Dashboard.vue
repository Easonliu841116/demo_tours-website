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

<style lang="scss">
@import '.././assets/sass/BackEnd/Dashboard';
</style>

<script>
import Navbar from './pages/BackEnd/Navbar';
import Sidebar from './pages/BackEnd/Sidebar';

export default {
  components: {
    Navbar,
    Sidebar,
  },
};
</script>
