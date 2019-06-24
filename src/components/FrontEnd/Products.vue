<template>
  <div>
    <div class="bg-light">
      <loading :active.sync="isLoading"></loading>
      <!-- Navbar -->
      <Navbar/>
      <!-- Carosel -->
      <Carosel/>
      <div class="container my-4">
        <form class="my-4 w-75 mx-auto">
          <div class="input-group">
            <input class="form-control" type="text" placeholder="想去哪裡？" aria-label="Search">
            <div class="input-group-append">
              <button class="btn btn-outline-primary" type="submit">
                <i class="fa fa-search" aria-hidden="true"></i>搜尋</button>
            </div>
          </div>
          <small>
            熱門搜尋：            
            <a href="#" v-for="(product, key) in products" :key="key">
              {{product.title}}、
            </a>
          </small>
        </form>
        <div>
          <div class="card-columns">
            <div
              class="mb-4 c-card-bg"
              :class="{'card':product.is_enabled}"
              v-for="(product, key) in products"
              :key="key"
            >
              <img
                :src="product.imageUrl"
                class="card-img-top"
                v-if="product.is_enabled"
                :alt="product.title"
              >
              <div class="card-body c-card-bg rounded-bottom" v-if="product.is_enabled">
                <h5 class="card-title font-weight-bold h4">{{product.title}}</h5>
                <p class="card-text">{{product.description}}</p>
                <p class="card-text">
                  <small class="text-muted">{{product.content}}</small>
                </p>
                <br>
                <div class="w-100 d-inline-flex justify-content-between align-items-center">
                  <!-- price -->
                  <div class="ml-3">
                    <p class="c-m-0">
                      <small class="text-muted">
                        原價：
                        <span class="c-text-through">
                          {{product.origin_price | CurrencyFilter}}
                        </span>
                      </small>
                    </p>
                    <p class="text-danger">
                      特價：
                      <span class="h4 text-danger">
                        {{product.price | CurrencyFilter}}
                      </span>
                    </p>
                  </div>
                  <!-- buy -->
                  <div class="mr-3">
                    <button class="btn btn-outline-primary">立即購買</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- footer -->
      <footer>
        <p class="text-center text-white m-0 py-3 d-block bg-dark">本網站資料所有資料皆來自網路，僅供學術用途。</p>
      </footer>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar';
import Carosel from './Carosel';

export default {
  data() {
    return {
      products: {},
      isLoading: false,
    };
  },
  methods: {
    getProducts(page = 1) {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${
        process.env.CUSTOMPATH
      }/products?page=${page}`;
      vm.isLoading = true;
      vm.$http.get(api).then((response) => {
        vm.products = response.data.products;
        vm.isLoading = false;
        // eslint-disable-next-line
        console.log(response.data);
      });
    },
  },
  created() {
    this.getProducts();
  },
  components: {
    Navbar,
    Carosel,
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/FrontEnd/Products";
</style>
