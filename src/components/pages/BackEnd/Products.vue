<template>
  <div>
    <div class="text-right mt-4">
      <button class="btn btn-primary" @click.prevent="showEditModal"
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
            <button class="btn btn-outline-primary btn-sm" @click="showEditModal">編輯</button>
          </td>
          <td>
            <button class="btn btn-outline-primary btn-sm" @click="showDelModal">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- EditModal -->
    <EditModal/>
    <!-- DelModal -->
    <DelModal/>
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
    };
  },
  methods: {
    showEditModal() {
      $('#productModal').modal('show');
    },
    showDelModal() {
      $('#delProductModal').modal('show');
    },
    getProducts(page = 1) {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/products?page=${page}`;
      vm.$http.get(url).then((response) => {
        // eslint-disable-next-line
        console.log(response);
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
