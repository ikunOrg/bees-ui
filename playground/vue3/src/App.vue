<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import { ConfigProvider, Button } from 'ant-design-vue'
</script>

<template>
  <ConfigProvider>
    <Button>123</Button>
  </ConfigProvider>

</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
