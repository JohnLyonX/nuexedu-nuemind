<script setup>
import AiChatComponent from '@/components/AiChatComponent.vue';

</script>

<template>
  <div class="user-assistant">
    <h2 class="page-title">学习助手</h2>
  <AiChatComponent />
    
  </div>
</template>

<style scoped>
.user-assistant {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 24px;
  color: #333;
}
</style> 