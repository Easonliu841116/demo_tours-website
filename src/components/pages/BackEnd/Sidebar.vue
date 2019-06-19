<template>
  <div>
    <nav class="col-md-2 d-none d-md-block bg-light sidebar">
      <div class="sidebar-sticky">
        <ul class="nav flex-column mt-4 ml-4">
          <li class="nav-item mt-1">
            <router-link class="nav-link" to="products">
              <b data-feather="Products" class="font-dark text-hover">
                <i class="fas fa-box-open"></i>
                商品列表
              </b>
            </router-link>
          </li>
          <li class="nav-item mt-1">
            <router-link class="nav-link" to="orderlist">
              <b data-feather="OrderList" class="font-dark text-hover">
                <i class="far fa-list-alt"></i>
                訂單列表
              </b>
            </router-link>
          </li>
          <li class="nav-item mt-1">
            <router-link class="nav-link" to="coupon">
              <b data-feather="Coupon" class="font-dark text-hover">
                <i class="fas fa-ticket-alt"></i>
                優惠券列表
              </b>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>
<style scoped>
  .text-hover:hover{
    color: #007bff;
  }
</style>
