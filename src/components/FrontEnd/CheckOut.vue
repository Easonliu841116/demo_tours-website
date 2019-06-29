<template>
  <div>
      <loading :active.sync="isLoading"></loading>
      <Navbar :bgColorJudge="2"/>
      <div class="c-wrap-bg">
      <div class="container d-flex flex-column justify-content-center">
        <ul class="list-group list-group-horizontal-lg justify-content-center my-3">
          <li class="list-group-item text-center mx-1 py-4 rounded shadow c-step-width"
          :class="{'bg-primary text-white c-mobile-width':step === 1
            ,'d-none d-lg-block':step !== 1}">
              <span class="font-weight-bold h4">step01</span><br>
              <span class="font-weight-bold">確認購物清單</span></li>
          <li class="list-group-item text-center mx-1 py-4 rounded shadow c-step-width"
          :class="{'bg-primary text-white c-mobile-width':step === 2
            ,'d-none d-lg-block':step !== 2}">
              <span class="font-weight-bold h4">step02</span><br>
              <span class="font-weight-bold">填寫訂購資料</span></li>
          <li class="list-group-item text-center mx-1 py-4 rounded shadow c-step-width"
          :class="{'bg-primary text-white c-mobile-width':step === 3
            ,'d-none d-lg-block':step !== 3}">
              <span class="font-weight-bold h4">step03</span><br>
              <span class="font-weight-bold">付款&完成訂單</span></li>
        </ul>
      <div class="container shadow pt-2 pb-3 bg-light rounded c-table-width">
        <table class="table mt-5 table-responsive-lg c-mobile-text-size">
          <thead>
            <th></th>
            <th>品名</th>
            <th>數量</th>
            <th class="text-center">合計</th>
          </thead>
          <tbody>
            <tr v-for="(item,key) in carts.carts" :key="key">
              <td class="align-middle">
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  @click="removeCartItem(item.id)"
                >
                  <i class="far fa-trash-alt"></i>
                </button>
              </td>
              <td class="align-middle">
                {{ item.product.title }}
                <div class="text-success" v-if="item.coupon">已套用優惠券</div>
              </td>
              <td class="align-middle">{{ item.qty }} / {{ item.product.unit }}</td>
              <td class="align-middle text-right">{{ item.final_total | CurrencyFilter }}</td>
            </tr>
          </tbody>
          <tfoot class="font-weight-bold">
            <tr>
              <td colspan="3" class="text-right">總計</td>
              <td class="text-right">{{ carts.total | CurrencyFilter }}</td>
            </tr>
            <tr v-if="carts.final_total !== carts.total">
              <td colspan="3" class="text-right text-success">折扣價</td>
              <td class="text-right text-success">{{ carts.final_total | CurrencyFilter }}</td>
            </tr>
          </tfoot>
        </table>
        <div class="input-group mb-3 input-group-sm">
          <input type="text" class="form-control"
          placeholder="請輸入優惠碼" v-model="coupon_code" />
          <div class="input-group-append">
            <button class="btn btn-primary"
            type="button" @click="addCouponCode">套用優惠碼</button>
          </div>
        </div>
        <div class="d-flex justify-content-between">
          <button class="btn btn-secondary" type="button" @click="toTours"
          v-if="step === 1">
            繼續選購
          </button>
          <button class="btn btn-secondary" type="button" @click="goPreStep"
          v-if="step === 2">
            返回上一步
          </button>
          <button class="btn btn-danger" type="button" @click="goNextStep"
          v-if="step === 1">
            下一步，前往結帳
          </button>
          <button class="btn btn-danger" type="button" @click="goNextStep"
          v-if="step === 2">
            前往付款&完成訂單
          </button>
        </div>
        <!-- orderlist -->
        <!-- <form @submit.prevent="payOrder" v-if="step === 2">
            <table class="table">
            <thead>
                <th>品名</th>
                <th>數量</th>
                <th>單價</th>
            </thead>
            <tbody>
                <tr v-for="item in order.products" :key="item.id">
                <td class="align-middle">{{ item.product.title }}</td>
                <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                <td class="align-middle text-right">{{ item.final_total }}</td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                <td colspan="2" class="text-right">總計</td>
                <td class="text-right">{{ order.total }}</td>
                </tr>
            </tfoot>
            </table>

            <table class="table">
            <tbody>
                <tr>
                <th width="100">Email</th>
                <td>{{ order.user.email }}</td>
                </tr>
                <tr>
                <th>姓名</th>
                <td>{{ order.user.name }}</td>
                </tr>
                <tr>
                <th>收件人電話</th>
                <td>{{ order.user.tel }}</td>
                </tr>
                <tr>
                <th>收件人地址</th>
                <td>{{ order.user.address }}</td>
                </tr>
                <tr>
                <th>付款狀態</th>
                <td>
                    <span v-if="!order.is_paid">尚未付款</span>
                    <span v-else class="text-success">付款完成</span>
                </td>
                </tr>
            </tbody>
            </table>
            <div class="text-right" v-if="order.is_paid === false">
            <button class="btn btn-danger">確認付款去</button>
            </div>
        </form> -->
      </div>
      </div>
      </div>
  </div>
</template>
<script>
import Navbar from './Navbar';

export default {
  data() {
    return {
      order: {
        user: {},
      },
      orderId: '',
      carts: {},
      coupon_code: '',
      isLoading: '',
      step: 1,
    };
  },
  methods: {
    getCart() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      vm.isLoading = true;
      vm.$http.get(url).then((response) => {
        vm.carts = response.data.data;
        vm.isLoading = false;
        // eslint-disable-next-line
        console.log(vm.carts);
      });
    },
    getOrder() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order/${vm.orderId}`;
      vm.$http.get(url).then((response) => {
        vm.order = response.data.order;
        // eslint-disable-next-line
        console.log(vm.order);
      });
    },
    payOrder() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/pay/${vm.orderId}`;
      vm.$http.post(url).then((response) => {
        // eslint-disable-next-line
        console.log(response);
        if (response.data.success) {
          vm.getOrder();
        }
      });
    },
    removeCartItem(id) {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
      vm.isLoading = true;
      vm.$http.delete(url).then(() => {
        vm.getCart();
        vm.isLoading = false;
        vm.$bus.$emit('alert', '刪除成功', 'danger');
      });
    },
    addCouponCode() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
      const coupon = {
        code: vm.coupon_code,
      };
      vm.isLoading = true;
      vm.$http.post(url, { data: coupon }).then(() => {
        vm.getCart();
        vm.isLoading = false;
      });
    },
    createOrder() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
      const order = vm.form;
      vm.isLoading = true;
      vm.$http.post(url, { data: order }).then((response) => {
        this.$validator.validate().then((valid) => {
          if (valid) {
            if (response.data.success) {
              vm.$router.push(`/customer_checkout/${response.data.orderId}`);
            }
            vm.isLoading = false;
          } else {
            vm.$bus.$emit('alert', '欄位不完整', 'danger');
            vm.isLoading = false;
          }
        });
      });
    },
    toTours() {
      const vm = this;
      vm.isLoading = true;
      setTimeout(() => {
        window.location.href = './#/tours';
        vm.isLoading = false;
      }, 750);
    },
    goPreStep() {
      const vm = this;
      vm.isLoading = true;
      setTimeout(() => {
        this.step -= 1;
        vm.isLoading = false;
      }, 250);
    },
    goNextStep() {
      const vm = this;
      vm.isLoading = true;
      setTimeout(() => {
        this.step += 1;
        vm.isLoading = false;
      }, 250);
    },
  },
  created() {
    this.getCart();
    this.orderId = this.$route.params.orderID;
    this.getOrder();
  },
  components: {
    Navbar,
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/FrontEnd/CheckOut";

</style>
