<template>
  <div class="message-alert">
    <div
      class="alert alert-dismissible text-dark font-weight-bold"
      :class="'alert-' + item.status"
      v-for="(item, key) in messages"
      :key="key"
    >
      {{ item.message }}
      <button
        type="button"
        class="close"
        @click="removeMessage(key)"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      messages: [],
    };
  },
  methods: {
    updateMessage(message, status) {
      const vm = this;
      const timestamp = Math.floor(new Date() / 1000);
      vm.messages.push({
        message,
        status,
        timestamp,
      });
      vm.removeMessageWithTiming(timestamp);
    },
    // 手動關掉提示
    removeMessage(key) {
      this.messages.splice(key, 1);
    },
    // 3秒後自動關掉提示
    removeMessageWithTiming(timestamp) {
      const vm = this;
      setTimeout(() => {
        vm.messages.forEach((item, i) => {
          if (item.timestamp === timestamp) {
            vm.messages.splice(i, 1);
          }
        });
      }, 5000);
    },
  },
  created() {
    const vm = this;
    vm.$bus.$on('alert', (message, status = 'danger') => {
      vm.updateMessage(message, status);
    });
    // 'alert': 自定義名稱
    // message: 傳入訊息內容(參數)
    // status: 樣式(背景色)，預設值為 bootstrap 的'danger'
  },
};
</script>

<style scope>
.message-alert {
  position: fixed;
  max-width: 50%;
  top: 4vh;
  right: 3vw;
  z-index: 1100;
}
</style>
