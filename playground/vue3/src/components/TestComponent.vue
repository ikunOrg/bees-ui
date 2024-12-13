<template>
    <div>
        <component-to-test v-for="n in count" :key="n">{{ n }}</component-to-test>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { ElButton } from 'element-plus';

defineProps({ count: Number });
</script>