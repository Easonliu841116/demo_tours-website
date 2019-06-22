<template>
  <div>
    <!-- Navbar -->
    <Navbar/>
    <!-- Carosel -->
    <Carosel/>
    <!-- Category -->
    <Category/>
    <!-- ProductList -->
    <router-view/>
    <!-- footer -->
    <footer>
        <p class="text-center text-white m-0 py-3 d-block bg-dark">
            本網站資料所有資料皆來自網路，僅供學術用途。
        </p>
    </footer>
  </div>
</template>

<script>
import Navbar from './Navbar';
import Carosel from './Carosel';
import Category from './Category';

export default {
  components: {
    Navbar,
    Carosel,
    Category,
  },
};
</script>
