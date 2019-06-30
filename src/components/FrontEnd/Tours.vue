<template>
  <div>
    <div class="bg-light">
      <loading :active.sync="isLoading"></loading>
      <!-- Navbar -->
      <Navbar ref="getCart" :navItemShowJudge = "'tours'" />
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
              v-for="(item, key) in categoryFilter" :key="key"
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
                      <p class="c-m-0 text-muted"
                        v-if="product.price !== product.origin_price">
                        原價：
                        <span
                          :class="{'c-text-through':product.price,
                          'c-text-small':product.price, 'h4':!product.price}"
                        >{{product.origin_price | CurrencyFilter}}</span>
                      </p>
                      <p :class="{'text-danger':product.price !== product.origin_price}">
                        售價：
                        <span class="h4">{{product.price | CurrencyFilter}}</span>
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
        <!-- Pagination -->
        <Pagination :pageData="pages" @emitGetPage="getTours"/>
      </div>
      <!-- proudct-modal -->
      <SingleProductModal
      :productData="product"
      @emitAddToCart="addToCart"
      :cartData="carts"/>
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
import Pagination from '../Pagination';

export default {
  data() {
    return {
      products: [],
      product: {},
      isLoading: false,
      search: '',
      pages: {},
      searchData: {
        productCategory: 'all',
        productContent: '',
      },
      carts: {},
    };
  },
  methods: {
    getTours(page = 1) {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${
        process.env.CUSTOMPATH
      }/products?page=${page}`;
      vm.isLoading = true;
      vm.$http.get(api).then((response) => {
        vm.products = response.data.products;
        vm.isLoading = false;
        vm.pages = response.data.pagination;
      });
    },
    getSingleProduct(id) {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${
        process.env.CUSTOMPATH
      }/product/${id}`;
      vm.$http.get(api).then((response) => {
        vm.product = response.data.product;
        $('#productModal').modal('show');
      });
    },
    addToCart(id, qty = 1) {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const cart = {
        product_id: id,
        qty,
      };
      vm.$http.post(url, { data: cart }).then((response) => {
        if (response.data.success) {
          vm.getCart();
          $('#productModal').modal('hide');
          vm.$bus.$emit('alert', response.data.message, 'success');
        } else {
          vm.getCart();
          $('#productModal').modal('hide');
          vm.$bus.$emit('alert', response.data.message, 'danger');
        }
        vm.$refs.getCart.getCart();
      });
    },
    getCart() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      vm.isLoading = true;
      vm.$http.get(api).then((response) => {
        vm.carts = response.data.data;
        vm.isLoading = false;
      });
    },
    recommend(keyword) {
      // 自動填入搜尋欄
      const vm = this;
      vm.searchData.productContent = keyword.title;
      vm.searchData.productCategory = keyword.category;
    },
    clearSearchInput() {
      const vm = this;
      // 清空搜尋欄
      vm.searchData.productContent = '';
      vm.searchData.productCategory = 'all';
    },
  },
  created() {
    this.getTours();
    this.getCart();
  },
  components: {
    Navbar,
    Carosel,
    SingleProductModal,
    Pagination,
  },
  computed: {
    // 篩選分類
    categoryFilter() {
      const vm = this;
      const cacheCategory = [];
      let filteredCategory = [];
      // 過濾重複出現的類別
      vm.products.forEach(el => cacheCategory.push(el.category));
      filteredCategory = cacheCategory.filter((el, id, ary) => ary.indexOf(el) === id);
      return filteredCategory;
    },
    // 篩選與select相同分類的產品
    productCategoryFilter() {
      const vm = this;
      // 如果分類為所有，返回原來的值
      if (vm.searchData.productCategory === 'all') {
        return vm.products;
      }
      // 返回與option相同的分類
      return vm.products.filter(item => item.category === vm.searchData.productCategory);
    },
    // 篩選與input/text內部分符合關鍵字的產品
    productContentFilter() {
      const vm = this;
      // 如果input/text內有字，即過濾產品
      if (vm.searchData.productContent) {
        return vm.productCategoryFilter.filter((el) => {
          const title = el.title.toLowerCase().trim();
          const content = el.description.toLowerCase().trim();
          const keyword = vm.searchData.productContent;
          // 同時搜尋title與content內的文字
          return title.indexOf(keyword) !== -1 || content.indexOf(keyword) !== -1;
        });
      }
      // 若input/text內沒有字，就用select再判斷一次
      return vm.productCategoryFilter;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/FrontEnd/Tours";

</style>
