<script setup>
import { BeesButton } from "@bees-ui/vue";
import { defineProps } from "vue";

defineProps({ count: Number });
</script>

<template>
  <div>
    <BeesButton v-for="n in count" :key="n">
      {{ n }}
    </BeesButton>
  </div>
</template>
