<template>
  <div>
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title h3 font-weight-bolder"
            id="exampleModalLabel">{{ productData.title }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img :src="productData.imageUrl" class="img-fluid c-zoom-image"
            :alt="productData.title">
            <blockquote class="blockquote my-4">
              <p class="h6 mb-3 mx-2">{{ productData.content }}</p>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="ml-2" v-if="productData.price !== productData.origin_price">
                  原價：
                  <span class="h3"
                  :class="{'c-text-through':productData.price, 'c-text-small':productData.price}">
                      {{ productData.origin_price| CurrencyFilter }}
                  </span>
                    元
                  <small class="text-muted">
                    ({{productData.unit}})
                  </small>
              </div>
              <div class="h6 mr-2" v-if="productData.price"
              :class="{'text-danger':productData.price !== productData.origin_price}">
                  售價：
                  <span class="h3">
                      {{ productData.price| CurrencyFilter }}
                  </span>
                  元
                  <span>
                      ({{ productData.unit }})
                  </span>
              </div>
              </div>
            <select name class="form-control mt-3"
            v-model="productData.num">
              <option value="" disabled selected>請選擇數量</option>
              <option
                :value="num"
                v-for="(num, key) in 10"
                :key="key"
              >共 {{num}} {{productData.unit}}</option>
            </select>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary"
              @click="emitAddToCart(productData.id, productData.num)"
            >
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    productData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    emitAddToCart(id, num) {
      this.$emit('emitAddToCart', id, num);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/FrontEnd/SingleProductModal";

</style>
