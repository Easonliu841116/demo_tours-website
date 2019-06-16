<template>
  <div>
    <!-- Loading -->
    <loading :active.sync="isLoading"></loading>
    <div class="text-right mt-4">
      <button class="btn btn-primary" @click.prevent="showEditModal(true)"
      >建立新的產品</button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="15%">分類</th>
          <th>產品名稱</th>
          <th width="10%">原價</th>
          <th width="10%">售價</th>
          <th width="10%">是否啟用</th>
          <th width="10%">編輯</th>
          <th width="10%">刪除</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-right">{{ item.origin_price}}</td>
          <td class="text-right">{{ item.price}}</td>
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
    <EditModal
    @emitGetProducts="getProducts"
    :tempProductData="tempProducts"
    :isNewData="isNew"/>
    <!-- DelModal -->
    <DelModal
    :tempProductData="tempProducts"
    @emitGetProducts="getProducts"/>
  </div>
</template>
<script>
import $ from 'jquery';
import EditModal from './EditModal';
import DelModal from './DelModal';

export default {
  data() {
    return {
      products: {},
      tempProducts: {},
      isNew: false,
      isLoading: false,
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
        /使能加以修改並不影響原資料 */
        vm.tempProducts = Object.assign({}, item);
        vm.isNew = false;
        $('#EditProductModal').modal('show');
      }
    },
    showDelModal(item) {
      const vm = this;
      vm.tempProducts = Object.assign({}, item);
      $('#delProductModal').modal('show');
    },
    getProducts(page = 1) {
      const vm = this;
      vm.isLoading = true;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/products?page=${page}`;
      vm.$http.get(url).then((response) => {
        vm.isLoading = false;
        vm.products = response.data.products;
      });
    },
  },
  created() {
    this.getProducts();
  },
  components: {
    EditModal,
    DelModal,
  },
};
</script>
