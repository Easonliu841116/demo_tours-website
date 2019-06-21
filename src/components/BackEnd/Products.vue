<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="text-right mt-4">
      <button class="btn btn-primary" @click.prevent="showEditModal(true)"
      >建立商品</button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="15%">分類</th>
          <th>商品名稱</th>
          <th width="12.5%">原價</th>
          <th width="12.5%">售價</th>
          <th width="10%">是否啟用</th>
          <th width="10%">編輯</th>
          <th width="10%">刪除</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-right">{{ item.origin_price | CurrencyFilter}}</td>
          <td class="text-right">{{ item.price | CurrencyFilter}}</td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <button class="btn btn-outline-primary btn-sm"
            @click="showEditModal(false, item)">編輯</button>
          </td>
          <td>
            <button class="btn btn-outline-primary btn-sm" @click="showDelModal(item)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- EditModal -->
    <EditProductModal
    @emitGetProducts="getProducts"
    :tempProductData="tempProducts"
    :isNewData="isNew"/>
    <!-- DelModal -->
    <DelProductModal
    :tempProductData="tempProducts"
    @emitGetProducts="getProducts"/>
    <!-- Pagination -->
    <Pagination
    @emitGetPage="getProducts"
    :pageData="pages"/>
  </div>
</template>

<script>
import $ from 'jquery';
import EditProductModal from './EditProductModal';
import DelProductModal from './DelProductModal';
import Pagination from './Pagination';

export default {
  data() {
    return {
      products: {},
      tempProducts: {},
      isNew: false,
      isLoading: false,
      pages: {},
    };
  },
  methods: {
    showEditModal(isNew, item) {
      const vm = this;
      if (isNew) {
        vm.tempProducts = {};
        vm.isNew = true;
        $('#EditProductModal').modal('show');
      } else {
        /* 若是要編輯商品，則將該商品的資訊以assign的方式加入至tempProducts中，
        避免物件傳參考特的特性 */
        vm.tempProducts = { ...item };
        vm.isNew = false;
        $('#EditProductModal').modal('show');
      }
    },
    showDelModal(item) {
      const vm = this;
      vm.tempProducts = { ...item };
      $('#delProductModal').modal('show');
    },
    getProducts(page = 1) {
      const vm = this;
      vm.isLoading = true;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/products?page=${page}`;
      vm.$http.get(url).then((response) => {
        vm.isLoading = false;
        vm.products = response.data.products;
        vm.pages = response.data.pagination;
      });
    },
  },
  created() {
    this.getProducts();
  },
  components: {
    EditProductModal,
    DelProductModal,
    Pagination,
  },
};
</script>
