<template>
    <div>
        <NButton v-for="n in count" :key="n">{{ n }}</NButton>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { NButton } from 'naive-ui'

defineProps({ count: Number });
</script>