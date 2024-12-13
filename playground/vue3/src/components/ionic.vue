<script setup>
import { IonButton } from "@ionic/vue";
import { defineProps } from "vue";

defineProps({ count: Number });
</script>

<template>
  <div>
    <IonButton v-for="n in count" :key="n">
      {{ n }}
    </IonButton>
  </div>
</template>
