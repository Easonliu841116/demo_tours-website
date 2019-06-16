<template>
  <div>
    <div
      class="modal fade"
      id="EditProductModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input type="text" class="form-control" id="image"
                  placeholder="請輸入圖片連結" v-model="tempProductData.imageUrl">
                </div>
                <div class="form-group">
                  <label for="customFile">
                    或 上傳圖片
                    <i class="fas fa-spinner fa-spin"></i>
                  </label>
                  <input type="file" id="customFile" class="form-control" ref="files">
                </div>
                <img
                  img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                  class="img-fluid"
                  alt
                >
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input type="text" class="form-control" id="title"
                  placeholder="請輸入標題" v-model="tempProductData.title">
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input type="text" class="form-control" id="category"
                    placeholder="請輸入分類" v-model="tempProductData.category">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input type="unit" class="form-control" id="unit"
                    placeholder="請輸入單位" v-model="tempProductData.unit">
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input type="number" class="form-control" id="origin_price"
                    placeholder="請輸入原價" v-model="tempProductData.origin_price">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input type="number" class="form-control" id="price"
                    placeholder="請輸入售價" v-model="tempProductData.price">
                  </div>
                </div>
                <hr>

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea type="text" class="form-control" id="description"
                   placeholder="請輸入產品描述" v-model="tempProductData.description"></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea type="text" class="form-control" id="content"
                   placeholder="請輸入產品說明內容" v-model="tempProductData.content"></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="is_enabled"
                    v-model="tempProductData.is_enabled" :true-value="1" :false-value="0">
                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click.prevent="updateProduct">確認</button>
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
    isNewData: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  methods: {
    updateProduct() {
      const vm = this;
      let httpMethod = 'post';
      let url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product`;
      // 若是要編輯商品，要改變url的位置(傳入該商品的id)；並將http動作改為put。
      if (!vm.isNewData) {
        url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProductData.id}`;
        httpMethod = 'put';
      }
      vm.$http[httpMethod](url, { data: vm.tempProductData }).then((response) => {
        if (response.data.success) {
          $('#EditProductModal').modal('hide');
          vm.emitGetProducts();
        } else {
          $('#EditProductModal').modal('hide');
          vm.emitGetProducts();
          // eslint-disable-next-line
          console.log('新增失敗');
        }
      });
    },
    emitGetProducts() {
      this.$emit('emitGetProducts');
    },
  },
};
</script>
