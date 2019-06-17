<template>
  <div>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" :class="{'disabled' : !pageData.has_pre}">
          <a class="page-link" href="#" aria-label="Previous"
          @click.prevent="emitGetProduct(pageData.current_page - 1)">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item" v-for="(page,key) in pageData.total_pages" :key="key">
          <a class="page-link" href="#" @click.prevent="emitGetProduct(page)">{{page}}</a>
        </li>
        <li class="page-item" :class="{'disabled' : !pageData.has_next}">
          <a class="page-link" href="#" aria-label="Next"
          @click.prevent="emitGetProduct(pageData.current_page + 1)">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
export default {
  props: {
    pageData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    emitGetProduct(page) {
      this.$emit('emitGetProduct', page);
    },
  },
};
</script>
