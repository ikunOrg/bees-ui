<template>
    <div>
        <Button v-for="n in count" :key="n">{{ n }}</Button>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { Button } from 'ant-design-vue'; // 替换为不同 UI 库的组件

defineProps({ count: Number });
</script>