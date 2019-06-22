<template>
  <div>
    <div class="container-fluid d-flex justify-content-center my-5">
      <div class="list-group list-group-horizontal-lg w-75 d-flex justify-content-center">
         <a href="/#/productlist/europe" class="d-flex h1 nav-link text-white font-weight-bolder
         list-group-item border-0 mx-3 my-2 rounded c-category c-category-01
         justify-content-center align-items-center shadow-sm"
         >歐洲</a>
         <a href="#" class="d-flex h1 nav-link text-white font-weight-bolder
         list-group-item border-0 mx-3 my-2 rounded c-category c-category-02
         justify-content-center align-items-center shadow-sm"
         >澳洲</a>
         <a href="#" class="d-flex h1 nav-link text-white font-weight-bolder
         list-group-item border-0 mx-3 my-2 rounded c-category c-category-03
         justify-content-center align-items-center shadow-sm"
         >日本</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  method: {
    europeLink() {
      this.$router.push('/productlist/europe');
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/FrontEnd/Category";
</style>
