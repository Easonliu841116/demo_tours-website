<template>
  <div>
    <div
      class="modal fade"
      id="delProductModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="DelModalLable"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="DelModalLable">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempProductData.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger"
            @click.prevent="removeProduct">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery';

export default {
  props: {
    tempProductData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    removeProduct() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProductData.id}`;
      vm.$http.delete(url).then((response) => {
        if (response.data.success) {
          vm.emitGetProducts();
          $('#delProductModal').modal('hide');
        } else {
          // eslint-disable-next-line
          console.log('刪除失敗')
          vm.emitGetProducts();
          $('#delProductModal').modal('hide');
        }
      });
    },
    emitGetProducts() {
      this.$emit('emitGetProducts');
    },
  },
};
</script>
