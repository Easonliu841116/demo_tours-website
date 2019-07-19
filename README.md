# 旅遊電商網站

**使用框架：** `Vue.js`

![index](https://i.imgur.com/hufXuVi.png "index")

## Demo

<https://easonliu841116.github.io/demo_tours-website/dist/#/>

## 簡介

本網站為前端練習作品，包含以下功能：

#### 前台

* 展示包含商品圖片、敘述、原價、特價等功能，每個商品都有獨立的詳細資訊，且可選擇購買數量。
* 有搜尋欄位、商品分類，方便用戶搜尋特定國家、洲別、敘述等關鍵字，並提供熱門搜尋，為消費者做推薦。
* 購物車可確認商品資訊、刪除已選商品、套用優惠券等功能，並使用 VeeValidate 做登入表單驗證，防止用戶任意進入結帳頁面。
* 管理者能夠從直接由前台登入後台，且登入時有做基礎的表單驗證。

#### 後台

* 使用 Vue Router 建構 SPA，增加使用者體驗並減少網頁載入負擔。
* 商品列表有上下架、編輯、刪除商品，管理價格、圖片、敘述及是否啟用等功能。
* 訂單列表可以檢視買家資訊、購買項目、付款情形，並可以做排序的行為。
* 優惠券列表可新增、刪除、編輯優惠券，並可自行決定優惠券的名稱、折扣 % 數、到期日及是否啟用。

#### 主要使用技術及 Plugins

 `Vue CLI`  `Vue Router`  `RESTful API 串接`  `RWD`  `Bootstrap 4`  `jQuery`  `Font Awesome`  `ES6`  `SCSS`  `ESLint-Airbnb` `Webpack` `VeeValidate`  `vue-axios`  `vue-loading-overlay`  `Evnet Bus`

## 網頁展示

#### 首頁

使用影片當背景，做一個動態的介紹頁面

![index](https://i.imgur.com/hufXuVi.png "index")

#### 前台

輪播Banner，介紹主打商品

![Banner](https://i.imgur.com/Ql0yoW1.png "Banner")

卡片式商品列表，方便使用者閱讀

![ProductList](https://i.imgur.com/XLSx5m6.png "ProductList")

獨立商品詳細資訊，可放大圖片及選擇購買數量

![SingleProduct](https://i.imgur.com/nIla71p.png "SingleProduct")

購物車頁面，可以刪除已選商品，且可套用優惠券

![Cart](https://i.imgur.com/tuIwDL8.png "Cart")

購物車表單有驗證功能，防止用戶任意送出表單

![CartInfo](https://i.imgur.com/gnBhENN.png "CartInfo")

確認結帳畫面

![CreateOreder](https://i.imgur.com/XUI5xvd.png "CreateOreder")

登入畫面，有表單的驗證功能

![sign](https://i.imgur.com/kGNWUAL.png "sign")

#### 後台

商品管理介面可新增、編輯、刪除、啟用商品

![DashBoard](https://i.imgur.com/uHGUuwB.png "DashBoard")

商品新增、編輯頁面

![EditProduct](https://i.imgur.com/TN3mobz.png "EditProduct")

訂單列表頁面可檢視訂單資訊，並可做排序的動作

![OrderList](https://i.imgur.com/nyk0GDJ.png "OrderList")

優惠券管理列表頁面可新增、編輯、刪除及啟用優惠券

![Coupon](https://i.imgur.com/BHKSpXj.png "Coupon")

優惠券新增、編輯頁面

![EditCoupon](https://i.imgur.com/zTI8coU.png "EditCoupon")
