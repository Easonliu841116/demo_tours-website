<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>購買時間</th>
          <th>Email</th>
          <th>購買款項</th>
          <th>應付金額</th>
          <th>
            <span>是否付款</span>
            <a href="#" @click.prevent="sortOrderByPaid">
              <i class="fas fa-caret-down text-dark" :class="{'isSort': isSort}"></i>
            </a>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in orders" :key="key">
          <td>{{item.create_at | DateFilter}}</td>
          <td>{{item.user.email}}</td>
          <td>
            <ul class="list-unstyled" v-for="(el, key) in item.products" :key="key">
              <li>
                <span>{{el.product.title}}</span>：
                <span>{{el.qty}}</span>
                <span>{{el.product.unit}}</span>
              </li>
            </ul>
          </td>
          <td>{{item.total | currencyFilter}}</td>
          <td>
            <strong v-if="item.is_paid" class="text-success">已付款</strong>
            <span v-else class="text-muted">尚未起用</span>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :pageData="pages" @emitGetProduct="getOrders"></Pagination>
  </div>
</template>

<script>
import Pagination from './Pagination';

export default {
  data() {
    return {
      orders: [],
      isLoading: false,
      pages: {},
      isSort: false,
    };
  },
  methods: {
    getOrders(page = 1) {
      const vm = this;
      vm.isLoading = true;
      const url = `${process.env.APIPATH}/api/${
        process.env.CUSTOMPATH
      }/admin/orders?page=${page}`;
      vm.$http.get(url).then((response) => {
        vm.isLoading = false;
        vm.orders = response.data.orders;
        vm.pages = response.data.pagination;
        // eslint-disable-next-line
        console.log(response.data);
      });
    },
    sortOrderByPaid() {
      const vm = this;
      vm.isSort = !vm.isSort;
      if (vm.orders.length) {
        if (vm.isSort) {
          vm.orders.sort((a, b) => {
            const aIsPaid = a.is_paid ? 1 : -1;
            const bIsPaid = b.is_paid ? 1 : -1;
            return aIsPaid - bIsPaid;
          });
        } else {
          vm.orders.sort((a, b) => {
            const aIsPaid = a.is_paid ? 1 : -1;
            const bIsPaid = b.is_paid ? 1 : -1;
            return bIsPaid - aIsPaid;
          });
        }
      }
    },
  },
  created() {
    this.getOrders();
  },
  components: {
    Pagination,
  },
};
</script>

<style scoped>
.isSort {
  transform: rotate(180deg);
}
</style>
