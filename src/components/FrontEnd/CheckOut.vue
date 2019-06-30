<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <Navbar :bgColorJudge="2" />
    <div class="c-wrap-bg">
      <div class="container d-flex flex-column justify-content-center">
        <!-- step -->
        <ul class="list-group list-group-horizontal-lg justify-content-center my-3">
          <li
            class="list-group-item text-center mx-1 py-4 rounded shadow c-step-width"
            :class="{'bg-primary text-white c-mobile-width':step === 1
            ,'d-none d-lg-block':step !== 1}"
          >
            <span class="font-weight-bold h4">step01</span>
            <br />
            <span class="font-weight-bold">確認購物清單</span>
          </li>
          <li
            class="list-group-item text-center mx-1 py-4 rounded shadow c-step-width"
            :class="{'bg-primary text-white c-mobile-width':step === 2
            ,'d-none d-lg-block':step !== 2}"
          >
            <span class="font-weight-bold h4">step02</span>
            <br />
            <span class="font-weight-bold">填寫訂購資料</span>
          </li>
          <li
            class="list-group-item text-center mx-1 py-4 rounded shadow c-step-width"
            :class="{'bg-primary text-white c-mobile-width':step === 3
            ,'d-none d-lg-block':step !== 3}"
          >
            <span class="font-weight-bold h4">step03</span>
            <br />
            <span class="font-weight-bold">付款&完成訂單</span>
          </li>
        </ul>
        <div
          class="container shadow pt-2 pb-3 bg-light rounded"
          :class="{'c-table-width':step === 1, 'c-form-width':step !== 1}"
        >
          <table class="table mt-5 table-responsive-lg c-mobile-text-size" v-if="step === 1">
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
          <!-- customData -->
          <form class="mx-auto" @submit.prevent="createOrder" v-if="step === 2">
            <div class="form-group mt-5">
              <label for="useremail">Email</label>
              <input
                type="email"
                class="form-control"
                :class="{'is-invalid': errors.has('email')}"
                name="email"
                id="useremail"
                v-model="form.user.email"
                placeholder="請輸入 Email"
                v-validate="'required|email'"
              />
              <span class="text-danger" v-if="errors.first('email')">
                {{errors.first('email')}}
              </span>
            </div>

            <div class="form-group">
              <label for="username">收件人姓名</label>
              <input
                type="text"
                class="form-control"
                :class="{'is-invalid': errors.has('name')}"
                name="name"
                id="username"
                v-model="form.user.name"
                placeholder="輸入姓名"
                v-validate="'required'"
              />
              <span class="text-danger" v-if="errors.has('name')">姓名欄位不得留空</span>
            </div>

            <div class="form-group">
              <label for="usertel">收件人電話</label>
              <input
                type="text"
                name="tel"
                class="form-control"
                :class="{'is-invalid': errors.has('tel')}"
                id="usertel"
                v-model="form.user.tel"
                placeholder="請輸入電話"
                v-validate="'required'"
              />
              <span class="text-danger" v-if="errors.has('tel')">電話欄位不得留空</span>
            </div>

            <div class="form-group">
              <label for="useraddress">收件人地址</label>
              <input
                type="text"
                name="address"
                class="form-control"
                :class="{'is-invalid': errors.has('address')}"
                id="useraddress"
                v-model="form.user.address"
                placeholder="請輸入地址"
                v-validate="'required'"
              />
              <span class="text-danger" v-if="errors.has('address')">地址欄位不得留空</span>
            </div>

            <div class="form-group">
              <label for="comment">留言</label>
              <textarea
                name
                id="comment"
                class="form-control"
                cols="30"
                rows="10"
                v-model="form.message"
              ></textarea>
            </div>
            <div class="d-flex justify-content-between">
              <button
                class="btn btn-secondary"
                type="button"
                @click="goPreStep"
                v-if="step === 2"
              >返回上一步</button>
              <button class="btn btn-danger" v-if="step === 2">前往付款&完成訂單</button>
            </div>
          </form>
          <!-- orderlist -->
          <form @submit.prevent="payOrder" v-if="step === 3">
            <table class="table mt-5 table-responsive-lg c-mobile-text-size">
              <thead>
                <th>品名</th>
                <th>數量</th>
                <th>單價</th>
              </thead>
              <tbody>
                <tr v-for="item in order.products" :key="item.id">
                  <td class="align-middle">{{ item.product.title }}</td>
                  <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                  <td class="align-middle text-right">{{ item.final_total | CurrencyFilter }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr class="font-weight-bold">
                  <td colspan="2" class="text-right">總計</td>
                  <td class="text-right">{{ order.total | CurrencyFilter }}</td>
                </tr>
              </tfoot>
            </table>

            <table class="table">
              <tbody>
                <tr>
                  <th>Email</th>
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
                    <span v-if="!order.is_paid" class="text-muted">尚未付款</span>
                    <span v-else class="text-success">付款完成</span>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="text-right" v-if="!order.is_paid">
              <button class="btn btn-danger">確認付款去</button>
            </div>
            <div class="text-right" v-else>
              <button class="btn btn-secondary"
              @click="toTours">繼續選購
              </button>
            </div>
          </form>
          <!-- buttons -->
          <div class="input-group mb-3 input-group-sm" v-if="step === 1">
            <input type="text" class="form-control" placeholder="請輸入優惠碼" v-model="coupon_code" />
            <div class="input-group-append">
              <button class="btn btn-primary" type="button" @click="addCouponCode">套用優惠碼</button>
            </div>
          </div>
          <div class="d-flex justify-content-between">
            <button class="btn btn-secondary" type="button"
            @click="toTours" v-if="step === 1">繼續選購</button>
            <button
              class="btn btn-danger"
              type="button"
              @click="goNextStep"
              v-if="step === 1"
            >下一步，前往結帳</button>
          </div>
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
      form: {
        user: {},
      },
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
      this.$validator.validate().then((valid) => {
        if (valid) {
          vm.$http.post(url, { data: order }).then((response) => {
            if (response.data.success) {
              vm.orderId = response.data.orderId;
              vm.getOrder();
              vm.isLoading = true;
              setTimeout(() => {
                vm.step += 1;
                vm.isLoading = false;
              }, 250);
            }
          });
        } else {
          vm.$bus.$emit('alert', '欄位不完整', 'danger');
          setTimeout(() => {
            vm.isLoading = false;
          }, 250);
        }
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
  },
  components: {
    Navbar,
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/FrontEnd/CheckOut";

</style>
