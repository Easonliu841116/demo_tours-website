<template>
  <div>
    <div class="bg-light">
      <loading :active.sync="isLoading"></loading>
      <!-- Navbar -->
      <Navbar/>
      <!-- Carosel -->
      <Carosel/>
      <!-- Main -->
      <div class="container my-2">
        <!-- Searchbar -->
        <form class="py-3 c-width mx-auto c-sticky-top" @submit.prevent>
           <div class="input-group">
            <div class="input-group-prepend">
            <select name="CategorySelector" id="CategorySelector"
            class="form-control rounded-left" v-model="searchData.productCategory">
              <option value="all" selected>所有</option>
              <option
              v-for="(item, key) in stateFilter" :key="key"
              :value="item">{{item}}</option>
            </select>
            </div>
            <input type="text" class="form-control" placeholder="想去哪裡?"
            aria-label="Text input with dropdown button" v-model="searchData.productContent"
            id="searchInput">
            <div class="input-group-append">
            <a href="#" class="input-group-text c-text-decoration-none"
            @click.prevent="clearSearchInput">&times;</a>
            </div>
          </div>
          <small class="c-hide">
            熱門搜尋：
            <a href="#" v-for="(product, key) in products.slice(0,4)"
            :key="key" @click.prevent="recommend(product)">
              {{product.title}}&nbsp;
            </a>
          </small>
        </form>
        <!-- ProductCard -->
        <keep-alive>
          <div>
            <div class="card-columns">
              <div
                class="mb-4 c-card-bg"
                :class="{'card':product.is_enabled}"
                v-for="(product, key) in productContentFilter"
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
                  <br>
                  <div class="w-100 d-inline-flex justify-content-between align-items-center">
                    <div class="ml-3">
                      <p class="c-m-0" :class="{'text-muted':product.price}">
                        售價：
                        <span
                          :class="{'c-text-through':product.price,
                          'c-text-small':product.price, 'h4':!product.price}"
                        >{{product.origin_price | CurrencyFilter}}</span>
                      </p>
                      <p class="text-danger" v-if="product.price">
                        特價：
                        <span class="h4 text-danger">{{product.price | CurrencyFilter}}</span>
                      </p>
                    </div>
                    <div class="mr-3">
                      <button class="btn btn-outline-primary"
                      @click="getSingleProduct(product.id)">詳細資訊</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </keep-alive>
      </div>
      <!-- proudct-modal -->
      <SingleProductModal
      :productData="product"
      :statusData="status"/>
      <!-- footer -->
      <footer>
        <p class="text-center text-white m-0 py-3 d-block bg-dark">本網站資料所有資料皆來自網路，僅供學術用途。</p>
      </footer>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import Navbar from './Navbar';
import Carosel from './Carosel';
import SingleProductModal from './SingleProductModal';

export default {
  data() {
    return {
      products: [],
      product: {},
      isLoading: false,
      search: '',
      status: {
        loadingItem: '',
      },
      searchData: {
        productCategory: 'all',
        productContent: '',
      },
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
      });
    },
    getSingleProduct(id) {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${
        process.env.CUSTOMPATH
      }/product/${id}`;
      vm.status.loadingItem = id;
      vm.$http.get(api).then((response) => {
        vm.product = response.data.product;
        $('#productModal').modal('show');
        vm.status.loadingItem = '';
      });
    },
    recommend(keyword) {
      const vm = this;
      vm.searchData.productContent = keyword.title;
      vm.searchData.productCategory = keyword.category;
    },
    clearSearchInput() {
      const vm = this;
      vm.searchData.productContent = '';
      vm.searchData.productCategory = 'all';
    },
  },
  created() {
    this.getProducts();
  },
  components: {
    Navbar,
    Carosel,
    SingleProductModal,
  },
  computed: {
    stateFilter() {
      const vm = this;
      const cacheCategory = [];
      let filteredCategory = [];
      vm.products.forEach(el => cacheCategory.push(el.category));
      filteredCategory = cacheCategory.filter((el, id, ary) => ary.indexOf(el) === id);
      return filteredCategory;
    },
    productCategoryFilter() {
      const vm = this;
      if (vm.searchData.productCategory === 'all') {
        return vm.products;
      }
      return vm.products.filter(item => item.category === vm.searchData.productCategory);
    },
    productContentFilter() {
      const vm = this;
      if (vm.searchData.productContent) {
        return vm.productCategoryFilter.filter((el) => {
          const title = el.title.toLowerCase().trim();
          const content = el.description.toLowerCase().trim();
          const keyword = vm.searchData.productContent;
          return title.indexOf(keyword) !== -1 || content.indexOf(keyword) !== -1;
        });
      }
      return vm.productCategoryFilter;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/FrontEnd/Products";

</style>
