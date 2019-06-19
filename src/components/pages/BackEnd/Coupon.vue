<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="text-right">
      <button class="btn btn-primary mt-4" @click="openEditCouponModal(true)">
        建立優惠券
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>名稱</th>
          <th>折扣百分比</th>
          <th>到期日</th>
          <th>是否啟用</th>
          <th>編輯</th>
          <th>刪除</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in coupons" :key="key">
          <td>{{ item.title }}</td>
          <td>{{ item.percent }}%</td>
          <td>{{ item.due_date | DateFilter }}</td>
          <td>
            <span v-if="item.is_enabled === 1" class="text-success">啟用</span>
            <span v-else class="text-muted">未起用</span>
          </td>
          <td>
            <button class="btn btn-outline-primary btn-sm"
              @click="openEditCouponModal(false, item)"
            >編輯</button>
          </td>
          <td>
            <button class="btn btn-outline-primary btn-sm"
              @click="openDelCouponModal(item)"
            >刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- EditCouponModal -->
      <div class="modal fade" id="couponModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark">
            <h5 class="modal-title text-white" id="exampleModalLabel">新增 / 修改優惠券</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true" class="text-white">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="title">標題</label>
              <input type="text" class="form-control" id="title" v-model="tempCoupon.title"
                placeholder="請輸入標題">
            </div>
            <div class="form-group">
              <label for="coupon_code">優惠碼</label>
              <input type="text" class="form-control" id="coupon_code" v-model="tempCoupon.code"
                placeholder="請輸入優惠碼">
            </div>
            <div class="form-group">
              <label for="due_date">到期日</label>
              <input type="date" class="form-control" id="due_date"
                v-model="due_date">
            </div>
            <div class="form-group">
              <label for="price">折扣百分比</label>
              <input type="number" class="form-control" id="price"
                v-model="tempCoupon.percent" placeholder="請輸入折扣百分比">
            </div>
            <div class="form-group">
              <div class="form-check">
                <input class="form-check-input" type="checkbox"
                  :true-value="1"
                  :false-value="0"
                  v-model="tempCoupon.is_enabled" id="is_enabled">
                <label class="form-check-label" for="is_enabled">
                  是否啟用
                </label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary"
              @click="updateCoupon">完成</button>
          </div>
        </div>
      </div>
    </div>
    <!-- DelCouponModal -->
    <div
      class="modal fade"
      id="delCouponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="DelModalLable"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger">
            <h5 class="modal-title text-white" id="DelModalLable">
              <span>刪除優惠券</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true" class="text-white">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempCoupon.title }}</strong> 優惠券(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger"
            @click.prevent="removeCoupon">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Pagination -->
    <Pagination
    :pageData="pages"
    @emitGetPage="getCoupons"/>
  </div>
</template>
<script>
import $ from 'jquery';
import Pagination from './Pagination';

export default {
  data() {
    return {
      coupons: {},
      tempCoupon: {
        title: '',
        is_enabled: 0,
        percent: 100,
        due_date: 0,
        code: '',
      },
      due_date: new Date(),
      isNew: false,
      pages: {},
      isLoading: false,
    };
  },
  watch: {
    due_date() {
      const vm = this;
      const timestamp = Math.floor(new Date(vm.due_date) / 1000);
      vm.tempCoupon.due_date = timestamp;
    },
  },
  methods: {
    openEditCouponModal(judge, item) {
      const vm = this;
      $('#couponModal').modal('show');
      vm.isNew = judge;
      if (vm.isNew) {
        vm.tempCoupon = {};
      } else {
        vm.tempCoupon = { ...item };
        const dateAndTime = new Date(vm.tempCoupon.due_date * 1000).toISOString().split('T');
        vm.due_date = dateAndTime[0];
      }
    },
    getCoupons() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupons`;
      vm.isLoading = true;
      this.$http.get(url, vm.tempProduct).then((response) => {
        vm.pages = response.data.pagination;
        vm.coupons = response.data.coupons;
        vm.isLoading = false;
      });
    },
    updateCoupon() {
      const vm = this;
      if (vm.isNew) {
        const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon`;
        this.$http.post(url, { data: vm.tempCoupon }).then(() => {
          $('#couponModal').modal('hide');
          this.getCoupons();
        });
      } else {
        const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
        vm.due_date = new Date(vm.tempCoupon.due_date * 1000);
        this.$http.put(url, { data: vm.tempCoupon }).then(() => {
          $('#couponModal').modal('hide');
          this.getCoupons();
        });
      }
    },
    openDelCouponModal(item) {
      const vm = this;
      vm.tempCoupon = { ...item };
      $('#delCouponModal').modal('show');
    },
    removeCoupon() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
      vm.$http.delete(url).then((response) => {
        if (response.data.success) {
          vm.getCoupons();
          $('#delCouponModal').modal('hide');
          vm.$bus.$emit('alert', '刪除完成', 'success');
        } else {
          vm.getCoupons();
          $('#delCouponModal').modal('hide');
          vm.$bus.$emit('alert', '上傳失敗，請稍後在試', 'danger');
        }
      });
    },
  },
  created() {
    this.getCoupons();
  },
  components: {
    Pagination,
  },
};
</script>
